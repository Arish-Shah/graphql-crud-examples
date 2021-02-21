import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";

import { Reply } from "../entities/Reply";
import { User } from "../entities/User";
import { Context } from "./types/context";

@Resolver(Reply)
export class ReplyResolver {
  @FieldResolver(() => User)
  creator(
    @Root() parent: Reply,
    @Ctx() { userLoader }: Context
  ): Promise<User> {
    return userLoader.load(parent.creatorId);
  }
}
