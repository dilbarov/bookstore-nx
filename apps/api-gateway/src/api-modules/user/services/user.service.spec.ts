import { UserModel } from '@bookstore-nx/entities';
import { AmqpService, GetUserByEmailContract, GetUserByIdContract } from '@bookstore-nx/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let amqpService: AmqpService;

  const userId = '4dc7762e-6206-4fca-8a67-7dd4225d4431';
  const email = 'test@example.com';

  const user = new UserModel();
  user.id = userId;
  user.email = email;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: AmqpService,
          useValue: {
            request: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    amqpService = module.get<AmqpService>(AmqpService);
  });

  describe('getUserById', () => {
    it('should get a user by ID using AMQP service', async () => {
      jest.spyOn(amqpService, 'request').mockResolvedValue(user);

      const result = await userService.getUserById(userId);

      expect(amqpService.request).toHaveBeenCalledWith(GetUserByIdContract.queue, userId);
      expect(result).toBe(user);
    });
  });

  describe('getUserByEmail', () => {
    it('should get a user by email using AMQP service', async () => {
      jest.spyOn(amqpService, 'request').mockResolvedValue(user);

      const result = await userService.getUserByEmail(email);

      expect(amqpService.request).toHaveBeenCalledWith(GetUserByEmailContract.queue, email);
      expect(result).toBe(user);
    });
  });
});
