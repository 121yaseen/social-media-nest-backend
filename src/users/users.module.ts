import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';

@Module({
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
