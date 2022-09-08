import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthenticationService {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService) { }
    getStatus() {
        return "Running";
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);

        if (user && user.password === password) {
            const { password, ...rest } = user;
            return rest;
        }

        return null;
    }

    async login(user: any) {
        const payload = { name: user.name, sub: user.id, username: user.username };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
