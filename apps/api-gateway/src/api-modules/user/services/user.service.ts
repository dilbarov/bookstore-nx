import { Injectable } from '@nestjs/common';
import { AmqpService, GetUserByEmailContract, GetUserByIdContract } from '@bookstore-nx/microservices';
import { UserModel } from '@bookstore-nx/entities';

@Injectable()
export class UserService {
  public constructor(private readonly amqpService: AmqpService) {}

  public async getUserById(id: string): Promise<UserModel> {
    return await this.amqpService.request<GetUserByIdContract.request, GetUserByIdContract.response>(
      GetUserByIdContract.queue,
      id,
    );
  }

  public async getUserByEmail(email: string): Promise<UserModel> {
    return await this.amqpService.request<GetUserByEmailContract.request, GetUserByEmailContract.response>(
      GetUserByEmailContract.queue,
      email,
    );
  }
}
