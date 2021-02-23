import { Link } from "react-router-dom";

interface TweetProps {
  tweet: any;
  username?: string;
}

const Tweet = ({ tweet, username }: TweetProps) => {
  return (
    <div key={tweet.id} style={{ marginTop: "1.5rem" }}>
      <Link to={`/${username || tweet.creator.username}`}>
        @{username || tweet.creator.username}
      </Link>
      <Link to={`/tweet/${tweet.id}`}>
        <h3 style={{ margin: 0 }}>{tweet.text}</h3>
      </Link>
    </div>
  );
};

export default Tweet;
