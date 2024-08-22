import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions, EntitySchema, MixedList } from 'typeorm';
import { ConfigService } from '@nestjs/config';

interface Options {
  entities: MixedList<string | Function | EntitySchema>;
  getConfig: (configService: ConfigService) => DataSourceOptions;
}

@Module({})
export class TypeormModule {
  public static forRoot(options: Options): DynamicModule {
    return {
      module: TypeormModule,
      imports: [
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            const connectionOptions = options.getConfig(configService);
            const appDataSource = new DataSource({ ...connectionOptions, entities: options.entities });
            return appDataSource.options;
          },
        }),
      ],
    };
  }
}
