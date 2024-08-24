import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { BookModel } from './book.model';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { filterFields } from '@bookstore-nx/microservices';

@ObjectType()
export class UpdateBookDto extends PickType(BookModel, ['id', 'title', 'description', 'language', 'publicationDate']) {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  public authorId: string;

  public constructor(partial: Partial<UpdateBookDto> = {}) {
    super();
    Object.assign(
      this,
      filterFields<UpdateBookDto>(partial, ['id', 'title', 'description', 'language', 'publicationDate', 'authorId']),
    );
  }
}
