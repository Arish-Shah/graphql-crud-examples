import { Fragment } from "react";
import { Link } from "react-router-dom";

import { useTweetsQuery } from "../generated/graphql";

const Feed = () => {
  const { data } = useTweetsQuery();

  const tweets =
    data?.tweets &&
    data.tweets.map((tweet) => (
      <div key={tweet.id}>
        <Link to={`/${tweet.creator.username}`}>@{tweet.creator.username}</Link>
        <Link to={`/tweet/${tweet.id}`}>
          <div>{tweet.text}</div>
        </Link>
      </div>
    ));

  return (
    <Fragment>
      <h1>Feed Page</h1>
      {tweets}
    </Fragment>
  );
};

export default Feed;
