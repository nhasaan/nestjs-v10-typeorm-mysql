import { Module } from '@nestjs/common';
import { typeormDBProviders } from './typeormdb.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // Use useFactory, useClass, or useExisting
      // to configure the DataSourceOptions.
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST') || 'localhost',
        port: parseInt(configService.get('DB_PORT')) || 3306,
        username: configService.get('DB_USER') || 'root',
        password: configService.get('DB_PASS') || '1qazZAQ!',
        database: configService.get('DB_NAME') || 'banglalink_db',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
        migrationsRun: true,
        synchronize: process.env.NODE_ENV === 'production' ? false : true,
      }),
      // dataSource receives the configured DataSourceOptions
      // and returns a Promise<DataSource>.
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
  ],
  providers: [...typeormDBProviders],
  exports: [...typeormDBProviders],
})
export class DatabaseModule {}
