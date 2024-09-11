import { CreateUserDto } from '@bookstore-nx/entities';
import { Test } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

import { UserAggregate } from '../../../domain/user.aggregate';
import { UserRepository } from '../../../providers/user.repository';
import { CreateUserCommand } from './create-user.command';
import { CreateUserCommandHandler } from './create-user.command-handler';

jest.mock('bcrypt');

describe('CreateUserCommandHandler', () => {
  let commandHandler: CreateUserCommandHandler;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateUserCommandHandler,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    commandHandler = moduleRef.get<CreateUserCommandHandler>(CreateUserCommandHandler);
    userRepository = moduleRef.get<UserRepository>(UserRepository);
  });

  it('should hash the password and call userRepository.create', async () => {
    const userDto = new CreateUserDto({ email: 'test@example.com', password: 'password' });
    const command = new CreateUserCommand(userDto);

    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
    jest.spyOn(userRepository, 'create').mockResolvedValue(UserAggregate.create(userDto));

    await commandHandler.execute(command);

    expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);
    expect(userRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        password: 'hashedPassword',
      }),
    );
  });
});
