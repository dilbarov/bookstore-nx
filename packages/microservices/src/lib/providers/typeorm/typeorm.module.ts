import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, EntitySchema, MixedList } from 'typeorm';

import { ConnectionType, typeormConfig } from './typeorm.config';

@Module({})
export class TypeormModule {
  public static forRoot(
    type: ConnectionType,
    connectionUrl: string,
    entities: MixedList<string | Function | EntitySchema>
  ): DynamicModule {
    return {
      module: TypeormModule,
      imports: [
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: () => {
            const appDataSource = new DataSource(typeormConfig(connectionUrl, type, entities));
            return appDataSource.options;
          }
        })
      ]
    };
  }
}
