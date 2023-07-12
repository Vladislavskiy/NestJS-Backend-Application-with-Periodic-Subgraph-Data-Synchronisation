import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Pool, Prisma } from '@prisma/client';
import { Observable, map, catchError } from 'rxjs';
import { AxiosResponse } from 'axios';
import { IPoolResponse } from 'src/interfaces/pool.interface';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PoolService {
    constructor(private readonly httpService: HttpService, private prisma: PrismaService) {}

    fetch(): Observable<AxiosResponse<IPoolResponse>> {
        return this.httpService.post('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3', {
            query: `
                {
                    pool(id: "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8") {
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
        })
    }

    async createPool(data: Prisma.PoolCreateInput): Promise<Pool> {
        return this.prisma.pool.create({
          data,
        });
      }
}
