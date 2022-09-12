import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as uuid from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>) { }

  private readonly users = [
    {
      id: 1,
      username: 'manu',
      password: '12345'
    },
    {
      id: 2,
      username: 'nikhil',
      password: '12345'
    },
  ]

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user: Partial<User> = {
      ...createUserInput,
      // id: uuid.v4()
    }
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
