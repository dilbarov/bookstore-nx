import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserAggregate } from '../../../domain/user.aggregate';
import { UserRepository } from '../../../providers/user.repository';
import { GetUserByIdQuery } from './get-user-by-id.query';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler implements IQueryHandler<GetUserByIdQuery, UserAggregate> {
  public constructor(private readonly userRepository: UserRepository) {}

  public async execute({ userId }: GetUserByIdQuery): Promise<UserAggregate> {
    return await this.userRepository.findById(userId);
  }
}
