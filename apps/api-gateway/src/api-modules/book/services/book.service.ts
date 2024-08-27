import {
  BookModel,
  BookQueryInput,
  BookResponse,
  BooksResponse,
  CreateBookDto,
  FavoriteBookCategory,
  UpdateBookDto,
} from '@bookstore-nx/entities';
import {
  AmqpService,
  CreateBookContract,
  GetBookByIdContract,
  GetBooksContract,
  UpdateBookContract,
} from '@bookstore-nx/microservices';
import { Injectable } from '@nestjs/common';

import { FavoriteService } from '../../favorite/services/favorite.service';

@Injectable()
export class BookService {
  public constructor(
    private readonly amqpService: AmqpService,
    private readonly favoriteService: FavoriteService,
  ) {}

  public async getBookById(id: string, userId?: string): Promise<BookResponse> {
    let favorite = null;
    if (userId) {
      favorite = await this.favoriteService.getFavorite(userId, id);
    }

    const book = await this.amqpService.request<GetBookByIdContract.request, GetBookByIdContract.response>(
      GetBookByIdContract.queue,
      id,
    );

    return {
      ...book,
      favoriteCategory: favorite ? favorite.category : null,
    };
  }

  public async getBooks(
    { categories, isFavorite = false, ...query }: BookQueryInput,
    userId?: string,
  ): Promise<BooksResponse> {
    const booksInFavorites = [];
    const favoritesMap = new Map<string, FavoriteBookCategory>();

    if (userId) {
      const favorites = await this.favoriteService.getFavorites({ userId, entityType: 'book', categories });
      favorites.forEach(favorite => {
        favoritesMap.set(favorite.entityId, FavoriteBookCategory[favorite.category]);
        booksInFavorites.push(favorite.entityId);
      });
    }

    const [items, count] = await this.amqpService.request<GetBooksContract.request, GetBooksContract.response>(
      GetBooksContract.queue,
      { ...query, books: categories && categories.length > 0 ? booksInFavorites : undefined },
    );

    return { items: items.map(item => ({ ...item, favoriteCategory: favoritesMap.get(item.id) })), count };
  }

  public async createBook(book: CreateBookDto): Promise<BookModel> {
    return await this.amqpService.request<CreateBookContract.request, CreateBookContract.response>(
      CreateBookContract.queue,
      book,
    );
  }

  public async updateBook(book: UpdateBookDto): Promise<BookModel> {
    return await this.amqpService.request<UpdateBookContract.request, UpdateBookContract.response>(
      UpdateBookContract.queue,
      book,
    );
  }
}
