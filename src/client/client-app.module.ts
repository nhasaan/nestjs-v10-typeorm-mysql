import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { RouteModule } from '../route/route.module';
import { AllExceptionsFilter } from '@/common/filters';
import { APP_FILTER } from '@nestjs/core';
import { CoreModule } from '../modules/core/core.module';
import { ClientAppController } from './client-app.controller';
import { Transport, ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    CoreModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 5, // seconds
      max: 10, // maximum number of items in cache
    }),
    RouteModule,
    ClientsModule.register([
      {
        name: 'CLIENT_APP_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_CONN],
          queue: process.env.RMQ_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [ClientAppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class ClientAppModule {}
