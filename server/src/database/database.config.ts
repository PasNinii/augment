import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  private environment: string;

  private readonly configEnum = {
    DEV: this.devConfig(),
    PROD: this.prodConfig(),
  };

  private readonly logger: Logger = new Logger(TypeOrmConfigService.name);

  constructor(private configService: ConfigService) {
    this.environment = this.configService.get('ENVIRONMENT');
    this.logger.log(this.environment);
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return this.configEnum[this.environment];
  }

  private devConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: this.configService.get('DATABASE_URL'),
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    };
  }

  private prodConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: this.configService.get('DATABASE_URL'),
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
      ssl: {
        rejectUnauthorized: false,
      },
    };
  }
}
