import { CreateUserDto } from '@bookstore-nx/entities';
import { CreateUserContract, GetUserByEmailContract, GetUserByIdContract } from '@bookstore-nx/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { UserFacade } from '../application-services';
import { UserAggregate } from '../domain/user.aggregate';
import { UserConsumerService } from './user-consumer.service';

describe('UserConsumerService', () => {
  let userConsumerService: UserConsumerService;
  let userFacade: UserFacade;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UserConsumerService,
        {
          provide: UserFacade,
          useValue: {
            commands: {
              createUser: jest.fn(),
            },
            queries: {
              getUserById: jest.fn(),
              getUserByEmail: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    userConsumerService = moduleRef.get<UserConsumerService>(UserConsumerService);
    userFacade = moduleRef.get<UserFacade>(UserFacade);
  });

  describe('createUser', () => {
    it('should create a user via UserFacade', async () => {
      const request: CreateUserContract.request = {
        requestId: 'request_1',
        timestamp: new Date().getDate().toString(),
        type: '',
        payload: { email: 'test@example.com', password: 'password' },
      };
      const expectedResponse: CreateUserContract.response = {
        requestId: 'request_1',
        timestamp: new Date().getDate().toString(),
        type: '',
        payload: {
          id: '4dc7762e-6206-4fca-8a67-7dd4225d4431',
          email: 'test@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };

      jest.spyOn(userFacade.commands, 'createUser').mockResolvedValue(UserAggregate.create(expectedResponse.payload));

      const result = await userConsumerService.createUser(request);

      expect(userFacade.commands.createUser).toHaveBeenCalledWith(new CreateUserDto(request.payload));
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('getUserById', () => {
    it('should return a user by ID via UserFacade', async () => {
      const request: GetUserByIdContract.request = {
        requestId: 'request_1',
        timestamp: new Date().getDate().toString(),
        type: '',
        payload: '4dc7762e-6206-4fca-8a67-7dd4225d4431',
      };
      const expectedResponse: GetUserByIdContract.response = {
        requestId: 'request_1',
        timestamp: new Date().getDate().toString(),
        type: '',
        payload: {
          id: '4dc7762e-6206-4fca-8a67-7dd4225d4431',
          email: 'test@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };

      jest.spyOn(userFacade.queries, 'getUserById').mockResolvedValue(UserAggregate.create(expectedResponse.payload));

      const result = await userConsumerService.getUserById(request);

      expect(userFacade.queries.getUserById).toHaveBeenCalledWith(request.payload);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('getUserByEmail', () => {
    it('should return a user by email via UserFacade', async () => {
      const request: GetUserByEmailContract.request = {
        requestId: 'request_1',
        timestamp: new Date().getDate().toString(),
        type: '',
        payload: 'test@example.com',
      };
      const expectedResponse: GetUserByEmailContract.response = {
        requestId: 'request_1',
        timestamp: new Date().getDate().toString(),
        type: '',
        payload: {
          id: '4dc7762e-6206-4fca-8a67-7dd4225d4431',
          email: 'test@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };

      jest
        .spyOn(userFacade.queries, 'getUserByEmail')
        .mockResolvedValue(UserAggregate.create(expectedResponse.payload));

      const result = await userConsumerService.getUserByEmail(request);

      expect(userFacade.queries.getUserByEmail).toHaveBeenCalledWith(request.payload);
      expect(result).toEqual(expectedResponse);
    });
  });
});
