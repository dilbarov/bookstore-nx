import { registerEnumType } from '@nestjs/graphql';

export interface IFavorite {
  userId: string;
  entityId: string;
  entityType: string;
  category: string;
}

export enum FavoriteBookCategory {
  WantToRead = 'WantToRead',
  ReadingNow = 'ReadingNow',
  Read = 'Read',
  DidNotFinish = 'DidNotFinish',
}

registerEnumType(FavoriteBookCategory, {
  name: 'FavoriteBookCategory',
  description: 'The category of favorite items',
});
