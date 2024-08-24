import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { BookModel } from './book.model';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { filterFields } from '@bookstore-nx/microservices';

@ObjectType()
export class CreateBookDto extends PickType(BookModel, ['title', 'description', 'language', 'publicationDate']) {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  public authorId: string;

  public constructor(partial: Partial<CreateBookDto> = {}) {
    super();
    Object.assign(
      this,
      filterFields<CreateBookDto>(partial, ['title', 'description', 'language', 'publicationDate', 'authorId']),
    );
  }
}
