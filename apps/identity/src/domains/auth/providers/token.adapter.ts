import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import * as Redis from 'ioredis';

import { TokenRepository } from './token.repository';

@Injectable()
export class TokenAdapter implements TokenRepository {
  public constructor(@InjectRedis() private readonly redis: Redis.Redis) {}

  private async delete(key: string): Promise<void> {
    await this.redis.del(key);
  }

  private get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  private set(key: string, value: string, expireTime: number): Promise<void> {
    return void Promise.resolve(this.redis.set(key, value, 'EX', expireTime));
  }

  public async deleteAccessToken(userId: string, fingerprint: string): Promise<void> {
    return await this.delete(`access_token:${userId}:${fingerprint}`);
  }

  public async deleteRefreshToken(userId: string, fingerprint: string): Promise<void> {
    return await this.delete(`refresh_token:${userId}:${fingerprint}`);
  }

  public async getAccessToken(userId: string, fingerprint: string): Promise<string | null> {
    return await this.get(`access_token:${userId}:${fingerprint}`);
  }

  public async getRefreshToken(userId: string, fingerprint: string): Promise<string | null> {
    return await this.get(`refresh_token:${userId}:${fingerprint}`);
  }

  public async saveAccessToken(userId: string, token: string, fingerprint: string, expireTime: number): Promise<void> {
    return await this.set(`access_token:${userId}:${fingerprint}`, token, expireTime);
  }

  public async saveRefreshToken(userId: string, token: string, fingerprint: string, expireTime: number): Promise<void> {
    return await this.set(`refresh_token:${userId}:${fingerprint}`, token, expireTime);
  }
}
