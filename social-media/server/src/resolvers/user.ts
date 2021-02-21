import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import bcrypt from "bcryptjs";

import { User } from "../entities/User";
import { RegisterInput } from "./types/register-input";
import { validateRegister } from "../util/validators";
import { FieldError } from "./types/field-error";
import { Context } from "./types/context";
import { Tweet } from "../entities/Tweet";

@ObjectType()
class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: Context): Promise<User | null> {
    // @ts-ignore
    const { userId } = req.session;
    if (!userId) {
      return null;
    }
    return User.findOne(userId);
  }

  @FieldResolver(() => [Tweet])
  tweets(@Root() parent: User): Promise<Tweet[]> {
    return Tweet.find({
      where: { creatorId: parent.id },
      order: { createdAt: "DESC" },
    });
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return {
        errors: [
          {
            username: "not found",
          },
        ],
      };
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return {
        errors: [
          {
            password: "incorrect",
          },
        ],
      };
    }
    // @ts-ignore
    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("input") input: RegisterInput,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    const errors = validateRegister(input);
    if (errors) {
      return {
        errors,
      };
    }

    try {
      const user = await User.create({ ...input }).save();
      // @ts-ignore
      req.session.userId = user.id;
      return { user };
    } catch (err) {
      const detail = err.detail as string;
      if (detail.includes("already exists")) {
        const key = detail.substring(
          detail.indexOf("(") + 1,
          detail.indexOf(")")
        );
        return {
          errors: [
            {
              [key]: "already exists",
            },
          ],
        };
      }
    }
  }
}
