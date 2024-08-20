import { IBase } from '@bookstore-nx/entities';
import { IsDate, IsUUID } from 'class-validator';
import { v4 } from 'uuid';
import { Transform } from 'class-transformer';

export class BaseModel implements IBase {
  @IsUUID()
  public id: string = v4()

  @IsDate()
  @Transform(({ value }) => (value ? new Date(value) : value), { toClassOnly: true })
  public createdAt: Date = new Date()

  @IsDate()
  @Transform(({ value }) => (value ? new Date(value) : value), { toClassOnly: true })
  public updatedAt: Date = new Date()

  public constructor() {}
}
