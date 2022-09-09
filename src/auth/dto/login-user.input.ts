import { Field, InputType } from "@nestjs/graphql";

@InputType() // we use this since this an input for our login query
export class LoginUserInput {
    @Field()
    username: string;

    @Field()
    password: string;
}