import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PoolService } from './pool/pool.service';
import { IPool } from './interfaces/pool.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const poolService = app.get(PoolService);

  poolService.fetch().pipe().subscribe({
    next: async (pools: IPool[]) => {
      try {
        await Promise.all(
          pools.map(async (pool) => {
            await poolService.upsertPool(pool)
          })
        );
      } catch(err) {
        console.log(err)
      }
    }, 
    error: err => console.log(err)
  });
}
bootstrap();
