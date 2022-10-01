import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UsersService } from 'src/users/users.service';
import { promisify } from 'util';
import { CreateUserInput } from './dto/create-user-input';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/users/entity/user.entity';
import { environment } from 'src/constants';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(request: CreateUserInput) {
    const users = await this.userService.find(request.email);
    if (users.length) {
      throw new BadRequestException('Username already exists');
    }

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(request.password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    request.password = result;

    const user = await this.userService.create(request);

    return user;
  }

  async validateUser(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new BadRequestException('Invalid username or password');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Invalid username or password');
    }

    return user;
  }

  async generateToken(user: User) {
    const payload = {
      email: user.email,
      sub: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return jwt.sign(payload, environment.jwtSecret, {
      expiresIn: environment.jwtExpirationTime,
    });
  }
}
