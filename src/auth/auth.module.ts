import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthGuard } from './guard/auth.guard';
import { JwtGuard } from './guard/jwt.guard';

@Module({
  providers: [AuthService, AuthResolver, JwtGuard, AuthGuard],
  imports: [UsersModule],
  exports: [AuthService],
})
export class AuthModule {}
