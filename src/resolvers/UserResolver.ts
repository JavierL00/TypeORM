import {
  Resolver,
  Mutation,
  Arg,
  Int,
  Query,
  InputType,
  Field
} from "type-graphql";
import { User } from "../entity/User";

@InputType()
class UserInput {
  @Field()
  name!: string;

  @Field()
  surname!: string;

  @Field()
  gender!: string;

  @Field(() => Int)
  age!: number;
}

@InputType()
class UserUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  surname?: string;

  @Field(() => String, { nullable: true })
  gender?: string;

  @Field(() => Int, { nullable: true })
  age?: number;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async createUser(
    @Arg("variables", () => UserInput) variables: UserInput
  ) {
    const newUser = User.create(variables);
    return await newUser.save();
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id", () => Int) id: number) {
    await User.delete(id);
    return true;
  }

  @Mutation(() => Boolean)
  async updateUser(
    @Arg("id", () => Int) id: number,
    @Arg("fields", () => UserUpdateInput) fields: UserUpdateInput
  ) {
    await User.update({ id }, fields);
    return true;
  }

  @Query(() => [User])
  users() {
    return User.find();
  }
}
