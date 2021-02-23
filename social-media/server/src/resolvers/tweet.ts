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
import { Reply } from "../entities/Reply";

import { Tweet } from "../entities/Tweet";
import { User } from "../entities/User";
import { isAuth } from "../middleware/isAuth";
import { Context } from "./types/context";

@Resolver(Tweet)
export class TweetResolver {
  @FieldResolver(() => User)
  creator(
    @Root() parent: Tweet,
    @Ctx() { userLoader }: Context
  ): Promise<User> {
    return userLoader.load(parent.creatorId);
  }

  @FieldResolver(() => [Reply])
  replies(@Root() parent: Tweet) {
    return Reply.find({
      where: { parentId: parent.id },
    });
  }

  @Query(() => [Tweet])
  tweets(): Promise<Tweet[]> {
    return Tweet.find({ order: { createdAt: "DESC" } });
  }

  @Query(() => Tweet, { nullable: true })
  getTweet(@Arg("id", () => ID) id: string) {
    return Tweet.findOne(id);
  }

  @Mutation(() => Tweet)
  @UseMiddleware(isAuth)
  tweet(@Arg("text") text: string, @Ctx() { req }: Context): Promise<Tweet> {
    // @ts-ignore
    const { userId } = req.session;
    return Tweet.create({
      creatorId: userId,
      text,
    }).save();
  }

  @Mutation(() => Reply)
  @UseMiddleware(isAuth)
  reply(
    @Arg("tweetId", () => ID) tweetId: string,
    @Arg("text") text: string,
    @Ctx() { req }: Context
  ): Promise<Reply> {
    // @ts-ignore
    const { userId } = req.session;
    return Reply.create({
      parentId: tweetId,
      creatorId: userId,
      text,
    }).save();
  }
}
