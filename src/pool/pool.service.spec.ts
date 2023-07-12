import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { type AxiosResponse } from 'axios'
import { of } from 'rxjs';
import { PoolService } from './pool.service';
import { PrismaService } from 'src/prisma.service';
import { type IPoolResponse } from 'src/interfaces/pool.interface'

describe('PoolService', () => {
  let service: PoolService;
  let httpService: HttpService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PoolService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            pool: {
              upsert: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<PoolService>(PoolService);
    httpService = module.get<HttpService>(HttpService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fetch', () => {
    it('should fetch data', (done) => {
      const response = {
        data: {
          data: {
            pools: [
              {
                id: '1',
                token0: {
                  id: 'token0-1',
                },
                token1: {
                  id: 'token1-1',
                },
              },
            ],
          },
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as AxiosResponse<{ data: { pools: IPoolResponse[] } }>
      jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(response));
      service.fetch().toPromise().then(data => {
        
        if (data) {
          expect(data[0]).toEqual({
            pool: '1',
            token0: 'token0-1',
            token1: 'token1-1',
          });
        } else {
          fail("Data is undefined");
        }
        done();
      });
    });
  });

  describe('upsertPool', () => {
    it('should upsert data', async () => {
      const pool = {
        pool: '1',
        token0: 'token0-1',
        token1: 'token1-1',
      };
      jest.spyOn(prismaService.pool, 'upsert').mockResolvedValue(pool);
      const result = await service.upsertPool(pool);
      expect(result).toEqual(pool);
    });
  });
});