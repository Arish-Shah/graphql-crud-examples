import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Movie } from "../entities/Movie";

@InputType()
class MovieInput {
  @Field()
  title: string;

  @Field(() => Int)
  minutes: number;
}

@InputType()
class MovieUpdateInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  minutes?: number;
}

@Resolver()
export class MovieResolver {
  @Mutation(() => Movie)
  async createMovie(@Arg("input") movieInput: MovieInput): Promise<Movie> {
    const movie = await Movie.create(movieInput).save();
    return movie;
  }

  @Query(() => [Movie])
  movies() {
    return Movie.find({});
  }

  @Mutation(() => Boolean)
  async updateMovie(
    @Arg("id", () => Int) id: number,
    @Arg("input") input: MovieUpdateInput
  ) {
    await Movie.update({ id }, input);
    return true;
  }

  @Mutation(() => Int)
  deleteMovie(@Arg("id", () => Int) id: number) {
    Movie.delete({ id });
    return true;
  }
}
