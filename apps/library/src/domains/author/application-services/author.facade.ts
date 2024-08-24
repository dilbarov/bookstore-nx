import { CreateAuthorDto, IAuthorQuery } from '@bookstore-nx/entities';
import { IBaseFacade } from '@bookstore-nx/microservices';
import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';

import { AuthorAggregate } from '../domain/author.aggregate';
import { CreateAuthorCommand } from './commands';
import { GetAuthorByIdQuery, GetAuthorsQuery } from './queries';

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
    return await this.commandBus.execute(new CreateAuthorCommand(dto));
  }

  private async getAuthorById(id: string): Promise<AuthorAggregate> {
    return await this.queryBus.execute(new GetAuthorByIdQuery(id));
  }

  private async getAuthors(query: IAuthorQuery): Promise<[AuthorAggregate[], number]> {
    return await this.queryBus.execute(new GetAuthorsQuery(query));
  }
}
