import { Injectable } from '@nestjs/common';
import { BookFacade } from '../application-services';
import {
  CreateBookContract,
  execute,
  GetBookByIdContract,
  GetBooksContract,
  UpdateBookContract,
} from '@bookstore-nx/microservices';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class BookConsumerService {
  public constructor(private readonly bookFacade: BookFacade) {}

  @RabbitRPC({
    exchange: CreateBookContract.queue.exchange.name,
    routingKey: CreateBookContract.queue.routingKey,
    queue: CreateBookContract.queue.queue,
  })
  public async createBook(request: CreateBookContract.request): Promise<CreateBookContract.response> {
    return await execute<CreateBookContract.request, CreateBookContract.response>(
      request,
      async book => await this.bookFacade.commands.createBook(book),
    );
  }

  @RabbitRPC({
    exchange: UpdateBookContract.queue.exchange.name,
    routingKey: UpdateBookContract.queue.routingKey,
    queue: UpdateBookContract.queue.queue,
  })
  public async updateBook(request: UpdateBookContract.request): Promise<UpdateBookContract.response> {
    return await execute<UpdateBookContract.request, UpdateBookContract.response>(
      request,
      async book => await this.bookFacade.commands.updateBook(book),
    );
  }

  @RabbitRPC({
    exchange: GetBookByIdContract.queue.exchange.name,
    routingKey: GetBookByIdContract.queue.routingKey,
    queue: GetBookByIdContract.queue.queue,
  })
  public async getBookById(request: GetBookByIdContract.request): Promise<GetBookByIdContract.response> {
    return await execute<GetBookByIdContract.request, GetBookByIdContract.response>(
      request,
      async id => await this.bookFacade.queries.getBookById(id),
    );
  }

  @RabbitRPC({
    exchange: GetBooksContract.queue.exchange.name,
    routingKey: GetBooksContract.queue.routingKey,
    queue: GetBooksContract.queue.queue,
  })
  public async getBooks(request: GetBooksContract.request): Promise<GetBooksContract.response> {
    return await execute<GetBooksContract.request, GetBooksContract.response>(
      request,
      async query => await this.bookFacade.queries.getBooks(query),
    );
  }
}
