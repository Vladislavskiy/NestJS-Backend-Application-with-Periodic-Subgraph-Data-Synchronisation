import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PoolService } from './pool.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [PoolService, PrismaService],
})
export class PoolModule {}
