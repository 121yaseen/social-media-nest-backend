import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/model/user.model';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/login-user.input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User)
  async signup(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return await this.authService.signup(
      loginUserInput.userName,
      loginUserInput.password,
      loginUserInput.email,
    );
  }
}
