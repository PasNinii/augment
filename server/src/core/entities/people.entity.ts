import { Column, Entity } from 'typeorm';
import { PeopleTypeEnum } from '../../shared/enum/people-type.enum';
import { AbstractEntity } from '../../common/entity/abstract.entity';

@Entity('people')
export class People extends AbstractEntity {
  @Column({ type: 'varchar', length: 64, nullable: false })
  lname: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  fname: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  pseudo: string;

  @Column({
    type: 'enum',
    enum: PeopleTypeEnum,
    array: true,
    nullable: true,
    default: null,
  })
  type: PeopleTypeEnum[];
}
