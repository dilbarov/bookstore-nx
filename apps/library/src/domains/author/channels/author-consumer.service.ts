import { Injectable } from '@nestjs/common';
import { AuthorFacade } from '../application-services';
import { CreateAuthorContract, execute, GetAuthorByIdContract, GetAuthorsContract } from '@bookstore-nx/microservices';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class AuthorConsumerService {
  public constructor(private readonly authorFacade: AuthorFacade) {}

  @RabbitRPC({
    exchange: CreateAuthorContract.queue.exchange.name,
    routingKey: CreateAuthorContract.queue.routingKey,
    queue: CreateAuthorContract.queue.queue,
  })
  public async createAuthor(request: CreateAuthorContract.request): Promise<CreateAuthorContract.response> {
    return await execute<CreateAuthorContract.request, CreateAuthorContract.response>(
      request,
      async payload => await this.authorFacade.commands.createAuthor(payload),
    );
  }

  @RabbitRPC({
    exchange: GetAuthorByIdContract.queue.exchange.name,
    routingKey: GetAuthorByIdContract.queue.routingKey,
    queue: GetAuthorByIdContract.queue.queue,
  })
  public async getAuthorById(request: GetAuthorByIdContract.request): Promise<GetAuthorByIdContract.response> {
    return await execute<GetAuthorByIdContract.request, GetAuthorByIdContract.response>(
      request,
      async id => await this.authorFacade.queries.getAuthorById(id),
    );
  }

  @RabbitRPC({
    exchange: GetAuthorsContract.queue.exchange.name,
    routingKey: GetAuthorsContract.queue.routingKey,
    queue: GetAuthorsContract.queue.queue,
  })
  public async getAuthors(request: GetAuthorsContract.request): Promise<GetAuthorsContract.response> {
    return await execute<GetAuthorsContract.request, GetAuthorsContract.response>(
      request,
      async query => await this.authorFacade.queries.getAuthors(query),
    );
  }
}
