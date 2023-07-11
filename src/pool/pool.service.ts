import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, map, catchError } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Pool } from 'src/interfaces/pool.interface';

@Injectable()
export class PoolService {
    constructor(private readonly httpService: HttpService) {}

    fetch(): Observable<AxiosResponse<Pool>> {
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
        }).pipe(
            map(response => response.data),
            catchError((e) => { throw e })
        );
    }
}
