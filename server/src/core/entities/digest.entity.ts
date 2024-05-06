import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../../common/entity/abstract.entity';
import { DigestType } from '../../shared/enum/digest-type.enum';
import { DigestHistory } from './digest-history.entity';
import { Dimension, Dimensions } from './dimension.entity';

@Entity({ name: 'digest' })
export class Digest extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: '() => NOW()' })
  ctime: Date;

  @Column({ type: 'timestamp', default: '() => NOW()' })
  mtime: Date;

  @OneToMany(() => DigestHistory, (digestHistory) => digestHistory.digest)
  digestHistory: DigestHistory;

  @Column({ type: 'enum', enum: DigestType, nullable: false })
  type: DigestType;

  @OneToMany(() => Dimension, (dimension) => dimension.digest)
  dimensions: Dimensions;

  @Column({ name: 'user_id', nullable: true })
  userId: string;
}
