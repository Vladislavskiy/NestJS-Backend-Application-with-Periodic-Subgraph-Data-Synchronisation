import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { PoolModule } from './pool/pool.module';

@Module({
  imports: [PoolModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
