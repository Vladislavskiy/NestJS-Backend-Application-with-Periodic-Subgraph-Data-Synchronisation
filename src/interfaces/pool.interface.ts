import { type Prisma } from '@prisma/client'

export interface IPoolResponse {
  id: string
  token0: {
    id: string
  }
  token1: {
    id: string
  }
};

export type IPool = Prisma.PoolCreateInput
