import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PoolService } from './pool/pool.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const poolService = app.get(PoolService);
  try {
    const res = await poolService.fetch().toPromise();
    console.log(res);
  } catch (e) {
    console.log(e.message)
  }
  // await app.listen(3000);
}
bootstrap();
