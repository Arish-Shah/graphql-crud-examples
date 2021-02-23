import { Link } from "react-router-dom";

import { Tweet, RegularTweetFragment } from "../generated/graphql";

interface TweetProps {
  tweet: { __typename?: "Tweet" } & Pick<Tweet, "repliesCount"> &
    RegularTweetFragment;
  username?: string;
}

const TweetComponent = ({ tweet, username }: TweetProps) => {
  return (
    <div key={tweet.id} style={{ marginTop: "1.5rem" }}>
      <Link to={`/${username || tweet.creator.username}`}>
        @{username || tweet.creator.username}
      </Link>
      <Link to={`/tweet/${tweet.id}`}>
        <h3 style={{ margin: 0 }}>{tweet.text}</h3>
      </Link>
      <span>{tweet.repliesCount} replies</span>
    </div>
  );
};

export default TweetComponent;
