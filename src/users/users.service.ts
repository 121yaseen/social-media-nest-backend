import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from './model/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  async findOne(userName: string) {
    if (!userName) {
      return null;
    }

    const user = await this.userRepository.findOneBy({ userName: userName });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findOneById(id: string) {
    if (!id) {
      return null;
    }

    const user = await this.userRepository.findOneBy({ _id: id });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async create(email: string, userName: string, password: string) {
    const user = new User();
    user.email = email;
    user.userName = userName;
    user.password = password;

    const createdUser = await this.userRepository.save(user);
    return createdUser;
  }

  async find(username: string) {
    return await this.userRepository.find({
      where: {
        userName: username,
      },
    });
  }
}
