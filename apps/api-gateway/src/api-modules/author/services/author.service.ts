import { Injectable } from '@nestjs/common';
import {
  AmqpService,
  CreateAuthorContract,
  GetAuthorByIdContract,
  GetAuthorsContract,
} from '@bookstore-nx/microservices';
import { AuthorModel, AuthorQueryInput, AuthorsResponse, CreateAuthorDto } from '@bookstore-nx/entities';

@Injectable()
export class AuthorService {
  public constructor(private readonly amqpService: AmqpService) {}

  public async getAuthorById(id: string): Promise<AuthorModel> {
    return await this.amqpService.request<GetAuthorByIdContract.request, GetAuthorByIdContract.response>(
      GetAuthorByIdContract.queue,
      id,
    );
  }

  public async getAuthors(query: AuthorQueryInput): Promise<AuthorsResponse> {
    const [items, count] = await this.amqpService.request<GetAuthorsContract.request, GetAuthorsContract.response>(
      GetAuthorsContract.queue,
      query,
    );

    return { items, count };
  }

  public async createAuthor(author: CreateAuthorDto): Promise<AuthorModel> {
    return await this.amqpService.request<CreateAuthorContract.request, CreateAuthorContract.response>(
      CreateAuthorContract.queue,
      author,
    );
  }
}
