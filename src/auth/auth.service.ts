import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UsersService } from 'src/users/users.service';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(userName: string, password: string, email: string) {
    const users = await this.userService.find(userName);
    if (users.length) {
      throw new BadRequestException('Username already exists');
    }

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    const user = await this.userService.create(email, userName, result);

    return user;
  }
}
