import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { PoolModule } from './pool/pool.module'

@Module({
  imports: [PoolModule, ConfigModule.forRoot(), ScheduleModule.forRoot()],
  controllers: [],
  providers: []
})
export class AppModule {}
