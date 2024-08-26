import {
  AuthorModel,
  AuthorQueryInput,
  AuthorsResponse,
  CreateAuthorDto,
  IAuthor,
  IBaseResponse,
} from '@bookstore-nx/entities';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Public } from '../../../shared/decorators/public.decorator';
import { AuthorService } from '../services/author.service';

@Resolver(() => AuthorModel)
export class AuthorResolver {
  public constructor(private readonly authorService: AuthorService) {}

  @Query(() => AuthorModel)
  public async getAuthorById(@Args('id', { type: () => String }) id: string): Promise<AuthorModel> {
    return await this.authorService.getAuthorById(id);
  }

  @Public()
  @Query(() => AuthorsResponse)
  public async getAuthors(
    @Args('query', { type: () => AuthorQueryInput }) query: AuthorQueryInput,
  ): Promise<IBaseResponse<IAuthor>> {
    return await this.authorService.getAuthors(query);
  }

  @Mutation(() => AuthorModel)
  public async createAuthor(
    @Args('author', { type: () => CreateAuthorDto }) author: CreateAuthorDto,
  ): Promise<IAuthor> {
    return await this.authorService.createAuthor(author);
  }
}
