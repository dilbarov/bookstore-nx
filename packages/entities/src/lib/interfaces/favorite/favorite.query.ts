export interface IFavoriteQuery {
  userId: string;
  entityType: string;
  entityIds?: string[];
  categories?: string[];
}
