import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { User } from './model/user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Query(() => User, { name: 'user' })
  async user(@Args('userName') userName: string) {
    return await this.userService.findOne(userName);
  }
}
