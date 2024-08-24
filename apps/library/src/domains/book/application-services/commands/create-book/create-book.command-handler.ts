import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { BookAggregate } from '../../../domain/book.aggregate';
import { BookRepository } from '../../../providers/book.repository';
import { CreateBookCommand } from './create-book.command';

@CommandHandler(CreateBookCommand)
export class CreateBookCommandHandler implements ICommandHandler<CreateBookCommand, BookAggregate> {
  public constructor(private readonly bookRepository: BookRepository) {}

  public async execute({ book }: CreateBookCommand): Promise<BookAggregate> {
    return await this.bookRepository.create(book);
  }
}
