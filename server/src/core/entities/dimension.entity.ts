import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../common/entity/abstract.entity';
import { DimensionType } from '../../shared/enum/dimension-type';
import { Digest } from './digest.entity';

@Entity({ name: 'dimension' })
export class Dimension extends AbstractEntity {
  @Column({ type: 'enum', enum: DimensionType, nullable: false })
  type: DimensionType;

  @Column({ type: 'varchar', length: '1024', nullable: false })
  content: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'int', nullable: false, default: 0 })
  order: number;

  @ManyToOne(() => Digest, (digest) => digest.dimensions, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'digest_id' })
  digest: Digest;

  @Column({ name: 'digest_id', type: 'number' })
  digestId: number;
}

export type Dimensions = Dimension[];
