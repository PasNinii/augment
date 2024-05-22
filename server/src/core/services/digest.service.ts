import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateDigestDto, UpdateDigestDto } from '../dto/crud-digest.dto';
import { DigestHistory } from '../entities/digest-history.entity';
import { Digest } from '../entities/digest.entity';
import { DimensionService } from './dimension.service';

@Injectable()
export class DigestService {
  constructor(
    private readonly dimensionService: DimensionService,
    @InjectRepository(Digest) private readonly digestRepository: Repository<Digest>,
    @InjectRepository(DigestHistory) private readonly digestHistoryRepository: Repository<DigestHistory>
  ) {}

  async insertOne(digestDto: CreateDigestDto) {
    const dimensions = digestDto.dimensions;

    const digestInstance = this.digestRepository.create({
      type: digestDto.type,
      userId: digestDto.userId,
    });

    const digestId = (await this.digestRepository.insert(digestInstance)).identifiers[0]['id'];

    for await (const dimension of dimensions) {
      await this.dimensionService.insertOne(digestId, dimension);
    }

    return this.findOneWithRelations({
      id: digestId,
      userId: digestInstance.userId,
    });
  }

  async findOneWithRelations(options: { id: number; userId: string }) {
    return this.digestRepository.findOne({
      where: options,
      relations: {
        dimensions: true,
      },
    });
  }

  async findWithRelations(options: { userId: string }) {
    return this.digestRepository.find({
      where: options,
      relations: {
        dimensions: true,
      },
    });
  }

  async findDailyDigest(options: { userId: string }): Promise<Digest[]> {
    /**
     * Write a raw sql query to get list from digest
     *
     * Based on digest_history table that has vtime column consiting of last
     * try of validation for a given digest, and a boolean is_validated, that
     * store the result of the validation.
     *
     * We want to fetch all digests based on a rule that is:
     * - if no validation is found in digest_history, then fetch the digest_history
     * - else if last validation is found we want to fetch digest based on rules
     *   - if 1 validation it has to be validated last week
     *   - if 2 validation it has to be validated two weeks ago
     *   - if 3 validation it has to be validated four weeks ago
     *   - if 4 validation it has to be validated eight weeks ago
     *   - ...
     */
    const query = `
      SELECT
        d.id
      FROM
        digest d
      LEFT JOIN
        digest_history dh
      ON
        d.id = dh.digest_id
        AND dh.is_validated = true
      WHERE
        ("d"."user_id" = $1)
      GROUP BY
        d.id
      HAVING
        COUNT(dh.id) = 0
      OR
        MAX(dh.vtime) < NOW() - INTERVAL '1 DAY' * COUNT(dh.id)
      ORDER BY
        d.id DESC
    `;

    const digests = await this.digestRepository.manager.query(query.toString(), [options.userId]);
    return digests.map((digest: Partial<Digest>) => digest.id);
  }

  async updateOne(options: { id: number; userId: string }, digestDto: UpdateDigestDto) {
    const dimensions = digestDto.dimensions;
    const currentInstace = await this.digestRepository.findOne({ where: options });

    await this.digestRepository.update(options.id, {
      ...currentInstace,
      type: digestDto.type,
      userId: digestDto.userId,
    });

    for await (const dimension of dimensions) {
      const currentDimension = await this.dimensionService.dimensionRepository.findOne({
        where: {
          digestId: currentInstace.id,
          type: dimension.type,
        },
      });
      await this.dimensionService.dimensionRepository.update(currentDimension.id, {
        ...currentDimension,
        ...dimension,
      });
    }

    return this.findOneWithRelations({
      id: currentInstace.id,
      userId: currentInstace.userId,
    });
  }

  async validateOne(options: { id: number; userId: string; isValidated: boolean }): Promise<void> {
    const instance = this.digestRepository.find({
      where: {
        id: options.id,
        userId: options.userId,
      },
    });

    if (!instance) {
      throw new Error('Digest not found');
    }

    const newEntry = this.digestHistoryRepository.create({
      digestId: options.id,
      isValidated: options.isValidated,
      vtime: new Date(),
    });

    await this.digestHistoryRepository.insert(newEntry);
  }

  async findHistory(options: { id: number; userId: string }): Promise<DigestHistory[]> {
    return this.digestHistoryRepository.find({
      where: {
        digestId: options.id,
      },
    });
  }

  async deleteOne(id: number): Promise<DeleteResult> {
    return this.digestRepository.delete(id);
  }
}
