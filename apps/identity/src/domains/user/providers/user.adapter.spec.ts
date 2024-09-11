import { Any } from '@bookstore-nx/common';
import { IUserQuery } from '@bookstore-nx/entities';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserAggregate } from '../domain/user.aggregate';
import { UserEntity } from '../entities/user.entity';
import { UserAdapter } from './user.adapter';

describe('UserAdapter', () => {
  let userAdapter: UserAdapter;
  let userRepository: Repository<UserEntity>;

  const userId = '4dc7762e-6206-4fca-8a67-7dd4225d4431';
  const email = 'test@example.com';
  const password = 'password';

  const user = UserAggregate.create({ id: userId, email, password });

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UserAdapter,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    userAdapter = moduleRef.get<UserAdapter>(UserAdapter);
    userRepository = moduleRef.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  describe('findAll', () => {
    it('should find all users based on query', async () => {
      const query: IUserQuery = { search: 'test', skip: 0, take: 10, orderDirection: 'asc', orderBy: 'email' };
      const users: UserEntity[] = [{ ...user, password }];
      const total = 1;

      jest.spyOn(userRepository, 'findAndCount').mockResolvedValue([users, total]);

      const [result, count] = await userAdapter.findAll(query);

      expect(userRepository.findAndCount).toHaveBeenCalledWith({
        where: { email: '%test%' },
        skip: query.skip,
        take: query.take,
        order: { email: 'asc' },
      });
      expect(result).toEqual(users.map(UserAggregate.create));
      expect(count).toBe(total);
    });
  });

  describe('findById', () => {
    it('should find user by ID', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue({ ...user, password });

      const result = await userAdapter.findById(userId);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: userId } });
      expect(result).toEqual(user);
    });

    it('should return null if user is not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      const result = await userAdapter.findById(userId);

      expect(result).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('should find user by email', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue({ ...user, password });

      const result = await userAdapter.findByEmail('test@example.com');

      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
      expect(result).toEqual(user);
    });

    it('should return null if user is not found by email', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      const result = await userAdapter.findByEmail('test@example.com');

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new user and return it', async () => {
      jest.spyOn(userRepository, 'save').mockResolvedValue({ ...user, password: 'hashedPassword' });
      jest.spyOn(userAdapter, 'findById').mockResolvedValue(user);

      const result = await userAdapter.create({ ...user, password: 'hashedPassword' });

      expect(userRepository.save).toHaveBeenCalledWith({ ...user, password: 'hashedPassword' });
      expect(result).toEqual(user);
    });
  });

  describe('save', () => {
    it('should save a user and return it', async () => {
      jest.spyOn(userRepository, 'save').mockResolvedValue({ ...user, password });
      jest.spyOn(userAdapter, 'findById').mockResolvedValue(user);

      const result = await userAdapter.save(user);

      expect(userRepository.save).toHaveBeenCalledWith(user);
      expect(result).toEqual(user);
    });
  });

  describe('update', () => {
    it('should update a user and return the updated user', async () => {
      const updatedUser = UserAggregate.create({ ...user, email: 'updated@example.com' });
      jest.spyOn(userRepository, 'update').mockResolvedValue({} as Any);
      jest.spyOn(userAdapter, 'findById').mockResolvedValue(updatedUser);

      const result = await userAdapter.update(userId, { email: 'updated@example.com' });
      expect(userRepository.update).toHaveBeenCalledWith(userId, {
        email: 'updated@example.com',
        updatedAt: expect.any(Date),
      });
      expect(result).toEqual(updatedUser);
    });
  });
});
