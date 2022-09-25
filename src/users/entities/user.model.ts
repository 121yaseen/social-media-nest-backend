import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

@Entity()
@ObjectType()
export class User {
  @Field(() => ID)
  @Column()
  @PrimaryColumn()
  @ObjectIdColumn()
  _id: string;

  @Field(() => String)
  @Column()
  @IsString()
  @IsNotEmpty()
  @Optional()
  username: string;

  @Field(() => String)
  @Column()
  @IsString()
  @IsNotEmpty()
  @Optional()
  password: string;
}
