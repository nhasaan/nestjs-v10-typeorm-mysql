import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ClientAppModule } from './client/client-app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_CONN],
      queue: process.env.RMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen();
}
bootstrap();

async function bootstrapClientApp() {
  const clientApp = await NestFactory.create<NestFastifyApplication>(ClientAppModule, new FastifyAdapter());
  clientApp.setGlobalPrefix('api');

  clientApp.enableCors({
    origin: process.env.HOST || 'http://localhost:5000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });

  clientApp.useGlobalPipes(new ValidationPipe());

  await clientApp.listen(Number(process.env.PORT) || 5000, process.env.HOST || '0.0.0.0');
  Logger.log(`Application is running at ${await clientApp.getUrl()}.`);
}
bootstrapClientApp();
