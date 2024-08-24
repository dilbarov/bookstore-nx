import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  BookModel,
  BookQueryInput,
  BooksResponse,
  CreateBookDto,
  IBaseResponse,
  IBook,
  UpdateBookDto,
} from '@bookstore-nx/entities';

import { Public } from '../../../shared/decorators/public.decorator';
import { BookService } from '../services/book.service';

@Resolver(() => BookModel)
export class BookResolver {
  public constructor(private readonly bookService: BookService) {}

  @Public()
  @Query(() => BookModel)
  public async getBookById(@Args('id', { type: () => String }) id: string): Promise<IBook> {
    return await this.bookService.getBookById(id);
  }

  @Public()
  @Query(() => BooksResponse)
  public async getBooks(
    @Args('query', { type: () => BookQueryInput }) query: BookQueryInput,
  ): Promise<IBaseResponse<IBook>> {
    return await this.bookService.getBooks(query);
  }

  // TODO: Remove
  @Public()
  @Mutation(() => BookModel)
  public async createBook(@Args('book', { type: () => CreateBookDto }) book: CreateBookDto): Promise<IBook> {
    return await this.bookService.createBook(book);
  }

  @Mutation(() => BookModel)
  public async updateBook(@Args('book', { type: () => UpdateBookDto }) book: UpdateBookDto): Promise<IBook> {
    return await this.bookService.updateBook(book);
  }
}
