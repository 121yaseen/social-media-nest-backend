import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @Field(() => String)
  @Column()
  email: string;

  @Field(() => ID)
  @Column()
  @PrimaryColumn()
  @ObjectIdColumn()
  _id: string;

  @Field(() => String)
  @Column()
  userName: string;

  @Field(() => String)
  @Column()
  password: string;
}
