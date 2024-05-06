import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../database/database.config';
import { DigestController } from './controller/digest.controller';
import { PingController } from './controller/ping.controller';
import { ENTITIES } from './entities';
import { DigestService } from './services/digest.service';
import { DimensionService } from './services/dimension.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      inject: [TypeOrmConfigService],
    }),
    TypeOrmModule.forFeature(ENTITIES),
  ],
  controllers: [DigestController, PingController],
  providers: [DigestService, DimensionService],
})
export class CoreModule {}
