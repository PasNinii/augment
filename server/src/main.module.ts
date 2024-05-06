import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from './core/core.module';
import { TypeOrmConfigService } from './database/database.config';
import { SecurityModule } from './security/security.module';

@Module({
  imports: [
    SecurityModule,
    ConfigModule.forRoot({ cache: true, isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      inject: [TypeOrmConfigService],
    }),
    CoreModule,
  ],
})
export class MainModule {}
