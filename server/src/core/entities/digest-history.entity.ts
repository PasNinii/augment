import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Digest } from './digest.entity';

@Entity({ name: 'digest_history' })
export class DigestHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Digest, (digest) => digest.digestHistory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'digest_id' })
  digest: Digest;

  @Column({ type: 'timestamp', default: '() => NOW()' })
  vtime: Date;

  @Column({ name: 'is_validated', type: 'boolean', nullable: false })
  isValidated: boolean;

  @Column({ name: 'digest_id', type: 'number' })
  digestId: number;
}
