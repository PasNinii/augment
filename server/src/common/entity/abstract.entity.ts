import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: '() => NOW()' })
  ctime: Date;

  @Column({ type: 'timestamp', default: '() => NOW()' })
  mtime: Date;
}
