export class GetFavoriteQuery {
  public constructor(
    public readonly userId: string,
    public readonly entityId: string,
  ) {}
}
