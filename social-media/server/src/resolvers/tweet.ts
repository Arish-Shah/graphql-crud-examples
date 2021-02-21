import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
  ID,
  FieldResolver,
  Root,
} from "type-graphql";

import { Tweet } from "../entities/Tweet";
import { User } from "../entities/User";
import { isAuth } from "../middleware/isAuth";
import { Context } from "./types/context";

@Resolver(Tweet)
export class TweetResolver {
  @FieldResolver(() => User)
  creator(@Root() parent: Tweet): Promise<User> {
    return User.findOne(parent.creatorId);
  }

  @Mutation(() => Tweet)
  @UseMiddleware(isAuth)
  async tweet(
    @Arg("text") text: string,
    @Ctx() { req }: Context
  ): Promise<Tweet> {
    // @ts-ignore
    const { userId } = req.session;
    return await Tweet.create({
      creatorId: userId,
      text,
    }).save();
  }
}
