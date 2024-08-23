import { EXCHANGE_AUTHOR } from './author.exchange';
import { EXCHANGE_BOOK } from './book.exchange';

export * from './author.exchange';
export * from './book.exchange';

export const LIBRARY_EXCHANGES = [EXCHANGE_AUTHOR, EXCHANGE_BOOK];
