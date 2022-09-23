import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './model/user.model';

@Injectable()
export class UsersService {
    constructor() {}
    private readonly userList: User[] = [
        {
            userName: 'Nikhil'
        },
        {
            userName: 'Yaseen'
        }
    ];

    findOne(userName: string) {
        let user = this.userList.find((user) => user.userName === userName);
        if (!user) {
            throw new NotFoundException()
        }

        return user;
    }
}
