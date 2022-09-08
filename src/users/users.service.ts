import { Injectable } from '@nestjs/common';

export type User = {
    id: number;
    name: string;
    username: string;
    password: string;
}

@Injectable()
export class UsersService {

    private readonly users: User[] = [
        {
            id: 1,
            name: 'Yaseen',
            username: '121yaseen',
            password: 'password'
        },
        {
            id: 2,
            name: 'muhsin',
            username: 'mmuhsin',
            password: 'password'
        },
        {
            id: 3,
            name: 'fahis',
            username: 'fahis',
            password: 'password'
        },
        {
            id: 4,
            name: 'test',
            username: 'test',
            password: 'test'
        }
    ]

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }

}
