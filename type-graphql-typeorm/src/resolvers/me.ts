import { Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class MeResolver {
  @Query()
  async me() {}
}
