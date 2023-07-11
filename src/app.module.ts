import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PoolModule } from './pool/pool.module';

@Module({
  imports: [PoolModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
