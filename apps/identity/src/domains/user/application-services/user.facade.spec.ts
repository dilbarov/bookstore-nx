import { CreateUserDto } from '@bookstore-nx/entities';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

import { UserAggregate } from '../domain/user.aggregate';
import { CreateUserCommand } from './commands';
import { GetUserByEmailQuery, GetUserByIdQuery } from './queries';
import { UserFacade } from './user.facade';

describe('UserFacade', () => {
  let userFacade: UserFacade;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  const userId = '4dc7762e-6206-4fca-8a67-7dd4225d4431';
  const email = 'test@example.com';
  const password = 'password';

  const expectedUser = UserAggregate.create({ id: userId, email, password });

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UserFacade,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: EventBus,
          useValue: {
            publish: jest.fn(),
          },
        },
      ],
    }).compile();

    userFacade = moduleRef.get<UserFacade>(UserFacade);
    commandBus = moduleRef.get<CommandBus>(CommandBus);
    queryBus = moduleRef.get<QueryBus>(QueryBus);
  });

  it('should create a user using the command bus', async () => {
    const createUserDto = new CreateUserDto({ email, password });

    jest.spyOn(commandBus, 'execute').mockResolvedValue(expectedUser);

    const result = await userFacade.commands.createUser(createUserDto);

    expect(commandBus.execute).toHaveBeenCalledWith(new CreateUserCommand(createUserDto));
    expect(result).toBe(expectedUser);
  });

  it('should get user by id using the query bus', async () => {
    jest.spyOn(queryBus, 'execute').mockResolvedValue(expectedUser);

    const result = await userFacade.queries.getUserById(userId);

    expect(queryBus.execute).toHaveBeenCalledWith(new GetUserByIdQuery(userId));
    expect(result).toBe(expectedUser);
  });

  it('should get user by email using the query bus', async () => {
    jest.spyOn(queryBus, 'execute').mockResolvedValue(expectedUser);

    const result = await userFacade.queries.getUserByEmail(email);

    expect(queryBus.execute).toHaveBeenCalledWith(new GetUserByEmailQuery(email));
    expect(result).toBe(expectedUser);
  });
});
