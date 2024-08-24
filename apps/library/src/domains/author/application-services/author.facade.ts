import { CreateAuthorDto, IAuthorQuery } from '@bookstore-nx/entities';
import { IBaseFacade } from '@bookstore-nx/microservices';
import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';

import { AuthorAggregate } from '../domain/author.aggregate';
import { CreateAuthorCommand, CreateAuthorCommandHandler } from './commands';
import { GetAuthorQuery, GetAuthorQueryHandler, GetAuthorsQuery, GetAuthorsQueryHandler } from './queries';

@Injectable()
export class AuthorFacade implements IBaseFacade {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  public commands = {
    createAuthor: (author: CreateAuthorDto) => this.createAuthor(author),
  };

  public queries = {
    getAuthorById: (id: string) => this.getAuthorById(id),
    getAuthors: (query: IAuthorQuery) => this.getAuthors(query),
  };

  public events = {};

  private async createAuthor(author: CreateAuthorDto): Promise<AuthorAggregate> {
    const dto = new CreateAuthorDto(author);
    return await this.commandBus.execute<
      CreateAuthorCommand,
      Awaited<ReturnType<CreateAuthorCommandHandler['execute']>>
    >(new CreateAuthorCommand(dto));
  }

  private async getAuthorById(id: string): Promise<AuthorAggregate> {
    return await this.queryBus.execute<GetAuthorQuery, Awaited<ReturnType<GetAuthorQueryHandler['execute']>>>(
      new GetAuthorQuery(id),
    );
  }

  private async getAuthors(query: IAuthorQuery): Promise<[AuthorAggregate[], number]> {
    return await this.queryBus.execute<GetAuthorsQuery, Awaited<ReturnType<GetAuthorsQueryHandler['execute']>>>(
      new GetAuthorsQuery(query),
    );
  }
}
