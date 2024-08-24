import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  AuthorModel,
  AuthorQueryInput,
  AuthorsResponse,
  CreateAuthorDto,
  IAuthor,
  IBaseResponse,
} from '@bookstore-nx/entities';
import {
  AmqpService,
  CreateAuthorContract,
  GetAuthorByIdContract,
  GetAuthorsContract,
} from '@bookstore-nx/microservices';
import { Public } from '../../shared/decorators/public.decorator';

@Resolver(() => AuthorModel)
export class AuthorResolver {
  public constructor(private readonly amqpService: AmqpService) {}

  @Query(() => AuthorModel)
  public async getAuthorById(@Args('id', { type: () => String }) id: string): Promise<IAuthor> {
    return await this.amqpService.request<GetAuthorByIdContract.request, GetAuthorByIdContract.response>(
      GetAuthorByIdContract.queue,
      id,
    );
  }

  @Public()
  @Query(() => AuthorsResponse)
  public async getAuthors(
    @Args('query', { type: () => AuthorQueryInput }) query: AuthorQueryInput,
  ): Promise<IBaseResponse<IAuthor>> {
    const [items, count] = await this.amqpService.request<GetAuthorsContract.request, GetAuthorsContract.response>(
      GetAuthorsContract.queue,
      query,
    );

    return { items, count };
  }

  @Mutation(() => AuthorModel)
  public async createAuthor(
    @Args('author', { type: () => CreateAuthorDto }) author: CreateAuthorDto,
  ): Promise<IAuthor> {
    return await this.amqpService.request<CreateAuthorContract.request, CreateAuthorContract.response>(
      CreateAuthorContract.queue,
      author,
    );
  }
}
