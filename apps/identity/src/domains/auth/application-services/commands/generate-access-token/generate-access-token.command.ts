export class GenerateAccessTokenCommand {
  public constructor(
    public readonly userId: string,
    public readonly email: string,
  ) {}
}
