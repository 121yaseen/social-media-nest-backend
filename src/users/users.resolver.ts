import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Query(() => User, { name: 'user' })
  async user(@Args('email') email: string) {
    return await this.userService.findOne(email);
  }
}
