import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  const origin = process.env.CORS || '*';

  app.enableCors({ origin });

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT || 3000);

  Logger.log(`App Running at port ${await app.getUrl()}`);
}
bootstrap();
