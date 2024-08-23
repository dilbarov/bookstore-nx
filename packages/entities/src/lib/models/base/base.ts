import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsDate, IsUUID } from 'class-validator';
import { v4 } from 'uuid';

import { IBase } from '../../interfaces';

@ObjectType()
export class BaseModel implements IBase {
  @Field()
  @IsUUID()
  public id: string = v4();

  @Field()
  @IsDate()
  @Transform(({ value }) => (value ? new Date(value) : value), { toClassOnly: true })
  public createdAt: Date = new Date();

  @Field()
  @IsDate()
  @Transform(({ value }) => (value ? new Date(value) : value), { toClassOnly: true })
  public updatedAt: Date = new Date();

  public constructor() {}
}
