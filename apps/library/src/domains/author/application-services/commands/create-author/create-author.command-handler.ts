import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AuthorAggregate } from '../../../domain/author.aggregate';
import { AuthorRepository } from '../../../providers/author.repository';
import { CreateAuthorCommand } from './create-author.command';

@CommandHandler(CreateAuthorCommand)
export class CreateAuthorCommandHandler implements ICommandHandler<CreateAuthorCommand, AuthorAggregate> {
  public constructor(private readonly authorRepository: AuthorRepository) {}

  public async execute({ author }: CreateAuthorCommand): Promise<AuthorAggregate> {
    const _author = AuthorAggregate.create(author);
    return await this.authorRepository.create(_author);
  }
}
