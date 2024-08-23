import { Global, Module } from '@nestjs/common';

import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';

@Global()
@Module({
  imports: [AuthorModule, BookModule],
  providers: [],
})
export class DomainsModule {}
