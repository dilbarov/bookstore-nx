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
import {
  AmqpService,
  CreateBookContract,
  GetBookByIdContract,
  GetBooksContract,
  UpdateBookContract,
} from '@bookstore-nx/microservices';
import { Public } from '../../shared/decorators/public.decorator';

@Resolver(() => BookModel)
export class BookResolver {
  public constructor(private readonly amqpService: AmqpService) {}

  @Public()
  @Query(() => BookModel)
  public async getBookById(@Args('id', { type: () => String }) id: string): Promise<IBook> {
    return await this.amqpService.request<GetBookByIdContract.request, GetBookByIdContract.response>(
      GetBookByIdContract.queue,
      id,
    );
  }

  @Public()
  @Query(() => BooksResponse)
  public async getBooks(
    @Args('query', { type: () => BookQueryInput }) query: BookQueryInput,
  ): Promise<IBaseResponse<IBook>> {
    const [items, count] = await this.amqpService.request<GetBooksContract.request, GetBooksContract.response>(
      GetBooksContract.queue,
      query,
    );

    return { items, count };
  }

  // TODO: Remove
  @Public()
  @Mutation(() => BookModel)
  public async createBook(@Args('book', { type: () => CreateBookDto }) book: CreateBookDto): Promise<IBook> {
    return await this.amqpService.request<CreateBookContract.request, CreateBookContract.response>(
      CreateBookContract.queue,
      book,
    );
  }

  @Mutation(() => BookModel)
  public async updateBook(@Args('book', { type: () => UpdateBookDto }) book: UpdateBookDto): Promise<IBook> {
    return await this.amqpService.request<UpdateBookContract.request, UpdateBookContract.response>(
      UpdateBookContract.queue,
      book,
    );
  }
}
