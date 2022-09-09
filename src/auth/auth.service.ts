import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { LoginUserInput } from './dto/login-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService  
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username);

        const validPassword = await bcrypt.compare(password, user?.password);
        if (user && validPassword) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: User) {
        return {
            access_token: this.jwtService.sign({
                username: user.username, 
                sub: user.id
            }),
            user
        }
    }

    async signup(loginUserInput: LoginUserInput) {
        const user = await this.userService.findOne(loginUserInput.username);
        
        if(user) {
            throw new Error('User Already Exist');
        }

        const password = await bcrypt.hash(loginUserInput.password, 10);

        return this.userService.create({
            ...loginUserInput,
            password
        })
    }
}
