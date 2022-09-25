import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity } from "typeorm";

@Entity()
@ObjectType()
export class User {
  @Field(() => String)
  @Column()
  userName: string;

}