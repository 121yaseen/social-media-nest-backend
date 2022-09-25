import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.model';
import * as uuid from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) { }

  private readonly users = [
    {
      id: 1,
      username: 'manu',
      password: '12345',
    },
    {
      id: 2,
      username: 'nikhil',
      password: '12345',
    },
  ];

  async create(createUserInput: CreateUserInput) {
    const username: string = createUserInput.username;
    const password: string = createUserInput.password;
    return await this.userRepository.save({ username, password });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(username: string) {
    return await this.userRepository.findOneBy({ username: username });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
