import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PoolService } from './pool.service';
import { PoolController } from './pool.controller';

@Module({
  imports: [HttpModule],
  controllers: [PoolController],
  providers: [PoolService],
})
export class PoolModule {}
