import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Pool, Prisma } from '@prisma/client';
import { Observable, map } from 'rxjs';
import { AxiosResponse } from 'axios';
import { IPoolResponse } from 'src/interfaces/pool.interface';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PoolService {
    constructor(private readonly httpService: HttpService, private prisma: PrismaService) {}

    fetch(): Observable<Prisma.PoolCreateInput[]> {
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
            `,
        }).pipe(map((response: AxiosResponse<{ data:  { pools: IPoolResponse[] }}>) => {
          return response.data.data.pools.map(pool => {
            return {
              pool: pool.id,
              token0: pool.token0.id,
              token1: pool.token1.id,
            }
          });
        }));
    }

    async upsertPool(pool: Prisma.PoolCreateInput): Promise<any> {
        return this.prisma.pool.upsert({
          where: { pool: pool.pool },
          update: pool,
          create: pool,
        });
      }
}
