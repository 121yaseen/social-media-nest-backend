import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { Roles } from 'src/constants';
import { User } from 'src/users/entity/user.entity';
import { AuthService } from './auth.service';
import { CreateUserInput } from './dto/create-user-input';
import { AuthGuard } from './guard/auth.guard';
import { JwtGuard } from './guard/jwt.guard';
import { RoleGuard } from './guard/role.guard';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User)
  async signup(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.authService.signup(createUserInput);
  }

  @Query(() => String)
  @UseGuards(AuthGuard)
  async login(
    @Args({ name: 'email', type: () => String }) email: string,
    @Args({ name: 'password', type: () => String }) password: string,
    @Context('user') user: User,
  ) {
    console.log('User Logged In', user.email);
    return this.authService.generateToken(user);
  }

  @Query(() => String)
  @UseGuards(JwtGuard)
  protectedRoute(@Context('user') user: any) {
    return user.email;
  }

  @Query(() => String)
  @UseGuards(JwtGuard, new RoleGuard(Roles.ADMIN))
  protectedAdminRoute(@Context('user') user: any) {
    return user.email;
  }
}
