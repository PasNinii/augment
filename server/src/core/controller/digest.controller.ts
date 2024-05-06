import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '../../security/permission.guard';
import { AugmentRequest } from '../../shared/interface/augment-request.interface';
import { CreateDigestDto, UpdateDigestDto } from '../dto/crud-digest.dto';
import { DigestService } from '../services/digest.service';

@Controller('digest')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class DigestController {
  constructor(private readonly digestService: DigestService) {}

  @Post('entity')
  async insertOne(@Req() req: AugmentRequest, @Body() digest: CreateDigestDto) {
    if (!req.user || !req.user.sub) {
      throw new HttpException('Invalid request', HttpStatus.FORBIDDEN);
    }

    digest.userId = req.user.sub;
    return await this.digestService.insertOne(digest);
  }

  @Get('entity-list')
  async findWithRelations(@Req() req: AugmentRequest) {
    if (!req.user || !req.user.sub) {
      throw new HttpException('Invalid request', HttpStatus.FORBIDDEN);
    }

    return await this.digestService.findWithRelations({ userId: req.user.sub });
  }

  @Get('daily-digest')
  async findDailyDigest(@Req() req: AugmentRequest) {
    if (!req.user || !req.user.sub) {
      throw new HttpException('Invalid request', HttpStatus.FORBIDDEN);
    }

    return await this.digestService.findDailyDigest({ userId: req.user.sub });
  }

  @Get('history/:id')
  async findHistory(@Req() req: AugmentRequest, @Param('id') id: number) {
    if (!req.user || !req.user.sub) {
      throw new HttpException('Invalid request', HttpStatus.FORBIDDEN);
    }

    return await this.digestService.findHistory({ id, userId: req.user.sub });
  }

  @Put('entity/:id')
  async updateOne(@Req() req: AugmentRequest, @Param('id') id: number, @Body() digest: UpdateDigestDto) {
    if (!req.user || !req.user.sub) {
      throw new HttpException('Invalid request', HttpStatus.FORBIDDEN);
    }

    digest.userId = req.user.sub;
    return await this.digestService.updateOne({ id, userId: req.user.sub }, digest);
  }

  @Put('validation/:id')
  async validate(@Req() req: AugmentRequest, @Param('id') id: number, @Body() body: { isValidated: boolean }) {
    if (!req.user || !req.user.sub) {
      throw new HttpException('Invalid request', HttpStatus.FORBIDDEN);
    }

    return await this.digestService.validateOne({ id, userId: req.user.sub, isValidated: body.isValidated });
  }

  @Delete('entity/:id')
  async deleteOne(@Param('id') id: number): Promise<void> {
    this.digestService.deleteOne(id);
  }
}
