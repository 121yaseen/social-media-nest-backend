import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/users/entity/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const { email, password } = ctx.req.body.variables;
    const user: User = await this.authService.validateUser(email, password);

    if (user) {
      ctx.user = user;
      return true;
    } else {
      throw new HttpException('Unauthorized', 401);
    }
  }
}
