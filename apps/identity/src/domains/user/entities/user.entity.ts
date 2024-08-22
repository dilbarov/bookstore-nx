import { IUser } from '@bookstore-nx/entities';
import { BaseTypeormEntity } from '@bookstore-nx/microservices';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseTypeormEntity implements IUser {
  @Column({
    length: 100,
    type: 'character varying',
  })
  public email: string;

  @Column({ type: 'character varying', nullable: true })
  public password: string;
}
