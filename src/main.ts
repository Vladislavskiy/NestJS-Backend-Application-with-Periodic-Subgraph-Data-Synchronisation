import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PoolService } from './pool/pool.service';
import { IPool } from './interfaces/pool.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const poolService = app.get(PoolService);

  poolService.fetch().pipe().subscribe(async (pools: IPool[]) => {
    try {
      await poolService.createPools(pools);
    } catch(e) {
      console.log(e)
    }
  });
}
bootstrap();
