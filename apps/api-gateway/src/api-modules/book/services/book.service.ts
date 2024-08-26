import { BookModel, BooksResponse, CreateBookDto, IBookQuery, UpdateBookDto } from '@bookstore-nx/entities';
import {
  AmqpService,
  CreateBookContract,
  GetBookByIdContract,
  GetBooksContract,
  UpdateBookContract,
} from '@bookstore-nx/microservices';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookService {
  public constructor(private readonly amqpService: AmqpService) {}

  public async getBookById(id: string): Promise<BookModel> {
    return await this.amqpService.request<GetBookByIdContract.request, GetBookByIdContract.response>(
      GetBookByIdContract.queue,
      id,
    );
  }

  public async getBooks(query: IBookQuery): Promise<BooksResponse> {
    const [items, count] = await this.amqpService.request<GetBooksContract.request, GetBooksContract.response>(
      GetBooksContract.queue,
      query,
    );

    return { items, count };
  }

  public async createBook(book: CreateBookDto): Promise<BookModel> {
    return await this.amqpService.request<CreateBookContract.request, CreateBookContract.response>(
      CreateBookContract.queue,
      book,
    );
  }

  public async updateBook(book: UpdateBookDto): Promise<BookModel> {
    return await this.amqpService.request<UpdateBookContract.request, UpdateBookContract.response>(
      UpdateBookContract.queue,
      book,
    );
  }
}
