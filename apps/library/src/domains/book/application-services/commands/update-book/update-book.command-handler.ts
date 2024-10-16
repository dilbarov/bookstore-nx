import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { BookAggregate } from '../../../domain/book.aggregate';
import { BookRepository } from '../../../providers/book.repository';
import { UpdateBookCommand } from './update-book.command';

@CommandHandler(UpdateBookCommand)
export class UpdateBookCommandHandler implements ICommandHandler<UpdateBookCommand, BookAggregate> {
  public constructor(private readonly bookRepository: BookRepository) {}

  public async execute({ book }: UpdateBookCommand): Promise<BookAggregate> {
    return await this.bookRepository.update(book.id, book);
  }
}
