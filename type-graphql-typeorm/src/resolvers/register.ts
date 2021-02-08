import { Resolver, Query, Mutation, Arg } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../entities/User";
import { RegisterInput } from "./RegisterInput";

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  hello(): string {
    return "Hello World";
  }

  @Mutation(() => User)
  async register(
    @Arg("data") { email, password, firstName, lastName }: RegisterInput
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      firstName,
      lastName,
      password: hashedPassword
    }).save();

    return user;
  }
}
