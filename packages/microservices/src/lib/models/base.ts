import { IBase } from '@bookstore-nx/entities';
import { IsDate, IsUUID } from 'class-validator';
import { v4 } from 'uuid';
import { Transform } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';

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
