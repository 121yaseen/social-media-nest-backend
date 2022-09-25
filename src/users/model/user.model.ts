import { Field, ObjectType } from "@nestjs/graphql";
import { Entity, PrimaryColumn } from "typeorm";

@Entity("user")
@ObjectType()
export class User {
  @Field(() => String)
  @PrimaryColumn()
  userName: string;

}