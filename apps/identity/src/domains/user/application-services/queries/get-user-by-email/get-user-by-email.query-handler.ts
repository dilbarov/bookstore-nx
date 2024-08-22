import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserAggregate } from '../../../domain/user.aggregate';
import { UserRepository } from '../../../providers/user.repository';
import { GetUserByEmailQuery } from './get-user-by-email.query';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailQueryHandler implements IQueryHandler<GetUserByEmailQuery, UserAggregate> {
  public constructor(private readonly userRepository: UserRepository) {}

  public async execute({ email }: GetUserByEmailQuery): Promise<UserAggregate> {
    return await this.userRepository.findByEmail(email);
  }
}
