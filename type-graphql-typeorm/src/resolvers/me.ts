import { User } from "../entities/User";
import { Ctx, Query } from "type-graphql";
import { MyContext } from "../types";

export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
    const userId = (ctx.req.session as any).userId;

    if (!userId) {
      return undefined;
    }
    return User.findOne(userId);
  }
}
