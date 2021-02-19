import { Context } from "../Context";
import { TodoResolvers, User } from "../generated/graphql";

export const Todo: TodoResolvers = {
  creator: async (parent, _: any, { User }: Context): Promise<User> => {
    const userId = parent.creator._id;
    return (await User.findById(userId)) as User;
  }
};
