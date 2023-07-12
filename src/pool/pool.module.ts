import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PoolService } from './pool.service';
import { PoolController } from './pool.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [HttpModule],
  controllers: [PoolController],
  providers: [PoolService, PrismaService],
})
export class PoolModule {}
