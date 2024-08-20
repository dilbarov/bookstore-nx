import { IBase } from '@bookstore-nx/entities';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';

export class BaseEntity implements IBase {
  @PrimaryGeneratedColumn('uuid')
  public id: string = v4()

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date = new Date()

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  public updatedAt: Date = new Date()
}
