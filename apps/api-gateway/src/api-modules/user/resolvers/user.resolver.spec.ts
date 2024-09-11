import { UserModel } from '@bookstore-nx/entities';
import { Test, TestingModule } from '@nestjs/testing';

import { UserService } from '../services/user.service';
import { UserResolver } from './user.resolver';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let userService: UserService;

  const userId = '4dc7762e-6206-4fca-8a67-7dd4225d4431';
  const email = 'test@example.com';

  const user = new UserModel();
  user.id = userId;
  user.email = email;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: {
            getUserById: jest.fn(),
            getUserByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    userService = module.get<UserService>(UserService);
  });

  describe('getCurrentUser', () => {
    it('should return current user by ID', async () => {
      jest.spyOn(userService, 'getUserById').mockResolvedValue(user);

      const result = await resolver.getCurrentUser(userId);

      expect(userService.getUserById).toHaveBeenCalledWith(userId);
      expect(result).toBe(user);
    });
  });

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      jest.spyOn(userService, 'getUserById').mockResolvedValue(user);

      const result = await resolver.getUserById(userId);

      expect(userService.getUserById).toHaveBeenCalledWith(userId);
      expect(result).toBe(user);
    });
  });

  describe('getUserByEmail', () => {
    it('should return a user by email', async () => {
      jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(user);

      const result = await resolver.getUserByEmail(email);

      expect(userService.getUserByEmail).toHaveBeenCalledWith(email);
      expect(result).toBe(user);
    });
  });
});
