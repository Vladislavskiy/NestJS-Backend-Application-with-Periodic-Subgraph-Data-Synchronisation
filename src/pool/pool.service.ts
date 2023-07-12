import { Injectable, Logger } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { type Prisma } from '@prisma/client'
import { Cron, CronExpression } from '@nestjs/schedule'
import { type Observable, map } from 'rxjs'
import { type AxiosResponse } from 'axios'
import { type IPoolResponse } from 'src/interfaces/pool.interface'
import { PrismaService } from 'src/prisma.service'
import { type IPool } from 'src/interfaces/pool.interface'
import { UNISWAP_V3_URL } from 'src/constants'

@Injectable()
export class PoolService {
  private readonly logger = new Logger(PoolService.name)

  constructor (private readonly httpService: HttpService, private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron (): Promise<void> {
    this.fetch().subscribe({
      next: async (pools: IPool[]) => {
        this.logger.log('Pools fetched successfully')

        try {
          await Promise.all(
            pools.map(async (pool) => {
              await this.upsertPool(pool)
            })
          )

          this.logger.log('Pools upserted successfully')
        } catch (err) {
          this.logger.error(`Failed to upsert: ${err.message}`)
        }
      },
      error: err => { this.logger.error(`Failed to fetch: ${err.message}`) }
    })
  }

  fetch (): Observable<Prisma.PoolCreateInput[]> {
    return this.httpService.post(UNISWAP_V3_URL, {
      query: `
              {
                pools(first:10){
                  id
                  token0 {
                    id
                  }
                  token1 {
                    id
                  }
                }
              }
            `
    }).pipe(map((response: AxiosResponse<{ data: { pools: IPoolResponse[] } }>) => {
      return response.data.data.pools.map(this.mapPool)
    }))
  }

  async upsertPool (pool: IPool): Promise<IPool> {
    return await this.prisma.pool.upsert({
      where: { pool: pool.pool },
      update: pool,
      create: pool
    })
  }

  mapPool (pool: IPoolResponse): IPool {
    return {
      pool: pool.id,
      token0: pool.token0.id,
      token1: pool.token1.id
    }
  }
}
