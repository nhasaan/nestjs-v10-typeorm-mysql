import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

const configService = new ConfigService();

export const typeormDBProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
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
      });

      return dataSource.initialize();
    },
  },
];
