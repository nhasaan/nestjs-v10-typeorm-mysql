import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: process.env.HOST || 'http://localhost:5000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(
    Number(process.env.PORT) || 5000,
    process.env.HOST || '0.0.0.0',
  );
  Logger.log(`Application is running at ${await app.getUrl()}.`);
}
bootstrap();
