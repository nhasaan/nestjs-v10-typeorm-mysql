import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { RouteModule } from '../route/route.module';
import { AllExceptionsFilter } from '@/common/filters';
import { APP_FILTER } from '@nestjs/core';
import { CoreModule } from '../modules/core/core.module';
import { ClientAppController } from './client-app.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CoreModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 5, // seconds
      max: 10, // maximum number of items in cache
    }),
    RouteModule,
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
    {
      provide: 'CLIENT_APP_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('BOOKSTORE_SERVICE_HOST'),
            port: configService.get('BOOKSTORE_SERVICE_PORT'),
          },
        });
      },
    },
  ],
})
export class ClientAppModule {}
