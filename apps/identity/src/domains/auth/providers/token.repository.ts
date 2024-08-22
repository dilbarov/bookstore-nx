export abstract class TokenRepository {
  public abstract saveAccessToken(
    userId: string,
    token: string,
    fingerprint: string,
    expireTime: number,
  ): Promise<void>;

  public abstract saveRefreshToken(
    userId: string,
    token: string,
    fingerprint: string,
    expireTime: number,
  ): Promise<void>;

  public abstract getAccessToken(userId: string, fingerprint: string): Promise<string | null>;

  public abstract getRefreshToken(userId: string, fingerprint: string): Promise<string | null>;

  public abstract deleteAccessToken(userId: string, fingerprint: string): Promise<void>;

  public abstract deleteRefreshToken(userId: string, fingerprint: string): Promise<void>;
}
