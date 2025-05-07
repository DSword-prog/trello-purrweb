import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Gender } from '../../common/enums/gender.enum';
import { ColumnEntity } from '../../columns/entities/columns.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  email: string;

  @Column('text', { nullable: false })
  password_hash: string;

  @Column('text', { nullable: false })
  name: string;

  @Column('text', { nullable: false })
  surname: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.NONE,
  })
  gender: Gender;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @OneToMany(() => ColumnEntity, (column) => column.user)
  columns: ColumnEntity[];
}
