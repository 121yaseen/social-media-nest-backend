import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from 'src/auth/dto/create-user-input';
import { MongoRepository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  async findOne(email: string) {
    if (!email) {
      return null;
    }

    const user: User = await this.userRepository.findOneBy({ email: email });
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

  async create(request: CreateUserInput) {
    const user = new User();
    user.email = request.email;
    user.password = request.password;
    user.firstName = request.firstName;
    user.lastName = request.lastName;
    user.role = 'NORMAL_USER';

    const createdUser = await this.userRepository.save(user);
    console.log('User created: ', createdUser);
    return user;
  }

  async find(email: string) {
    return await this.userRepository.find({
      where: {
        email: email,
      },
    });
  }
}
