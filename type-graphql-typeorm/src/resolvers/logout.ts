import { Ctx, Mutation, Resolver } from "type-graphql";
import { MyContext } from "../types";

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<boolean> {
    return new Promise((resolve, reject) => {
      ctx.req.session.destroy(error => {
        if (error) {
          reject(false);
        }
        ctx.res.clearCookie("qid");
        resolve(true);
      });
    });
  }
}
