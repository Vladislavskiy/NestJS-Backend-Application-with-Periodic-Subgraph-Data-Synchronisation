import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PoolService } from './pool/pool.service';
import { IPool } from './interfaces/pool.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.init()
}

bootstrap();
