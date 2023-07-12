import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { type Prisma } from '@prisma/client'
import { Cron, CronExpression } from '@nestjs/schedule'
import { type Observable, map } from 'rxjs'
import { type AxiosResponse } from 'axios'
import { type IPoolResponse } from 'src/interfaces/pool.interface'
import { PrismaService } from 'src/prisma.service'
import { type IPool } from '../interfaces/pool.interface'

@Injectable()
export class PoolService {
  constructor (private readonly httpService: HttpService, private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron (): Promise<void> {
    this.fetch().subscribe({
      next: async (pools: IPool[]) => {
        try {
          await Promise.all(
            pools.map(async (pool) => {
              await this.upsertPool(pool)
            })
          )
        } catch (err) {
          console.log(err)
        }
      },
      error: err => { console.log(err) }
    })
  }

  fetch (): Observable<Prisma.PoolCreateInput[]> {
    return this.httpService.post('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3', {
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
      return response.data.data.pools.map(pool => {
        return {
          pool: pool.id,
          token0: pool.token0.id,
          token1: pool.token1.id
        }
      })
    }))
  }

  async upsertPool (pool: Prisma.PoolCreateInput): Promise<any> {
    return await this.prisma.pool.upsert({
      where: { pool: pool.pool },
      update: pool,
      create: pool
    })
  }
}
