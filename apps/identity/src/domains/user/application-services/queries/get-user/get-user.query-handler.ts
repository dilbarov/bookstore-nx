import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserAggregate } from '../../../domain/user.aggregate';
import { UserRepository } from '../../../providers/user.repository';
import { GetUserQuery } from './get-user.query';

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler
  implements IQueryHandler<GetUserQuery, UserAggregate>
{
  public constructor(private readonly userRepository: UserRepository) {}

  public async execute({ userId }: GetUserQuery): Promise<UserAggregate> {
    return await this.userRepository.findById(userId);
  }
}
