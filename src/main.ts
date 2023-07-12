import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PoolService } from './pool/pool.service';
import { IPoolResponse } from './interfaces/pool.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const poolService = app.get(PoolService);

  poolService.fetch().pipe().subscribe(async response => { 
    const pool: IPoolResponse = response.data;

    try {
      await poolService.createPool({
        pool: pool.data.pool.id,
        token0: pool.data.pool.token0.id,
        token1: pool.data.pool.token1.id,
      })
    } catch(e) {
      console.log(e)
    }
  });
}
bootstrap();
