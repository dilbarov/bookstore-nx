import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsDate, IsUUID } from 'class-validator';
import { v4 } from 'uuid';

import { IBase } from '../../interfaces';

@ObjectType()
export class BaseModel implements IBase {
  @Field(() => ID)
  @IsUUID()
  public id: string = v4();

  @Field(() => String)
  @IsDate()
  public createdAt: Date = new Date();

  @Field(() => String)
  @IsDate()
  public updatedAt: Date = new Date();
}
