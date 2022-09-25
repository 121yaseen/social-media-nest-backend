import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from './model/user.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: MongoRepository<User>
    ) {}

    async findOne(userName: string) {
        //await this.userRepository.save({ userName });
        console.log(userName);
        let user = await this.userRepository.findOneBy({ userName: userName });
        if (!user) {
            throw new NotFoundException()
        }

        return user;
    }
}
