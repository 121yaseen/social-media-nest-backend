import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: '5p1d3rM4N15P3t3RP4rK3r', // Move to env variable
    signOptions: { expiresIn: '600s' }
  })],
  exports: [AuthenticationService]
})
export class AuthenticationModule { }
