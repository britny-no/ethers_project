import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlockEntity } from '@App/module/block/entity/block.entity';
import { TransactionEntity } from '@App/module/transaction/entity/transaction.entity';
import { LogEntity } from '@App/module/log/entity/log.entity';

export const EnvConfig = ConfigModule.forRoot({
  cache: true,
  isGlobal: true,
});

export const DbConfig = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DB'),
    entities: [BlockEntity, TransactionEntity, LogEntity],
    synchronize: true,
    migrationsRun: false,
  }),
});
