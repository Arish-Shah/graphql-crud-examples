import { FormEventHandler, Fragment, useState } from "react";

import Tweet from "../components/Tweet";
import {
  TweetsDocument,
  TweetsQuery,
  useMeQuery,
  useTweetMutation,
  useTweetsQuery,
} from "../generated/graphql";

const NewTweet = () => {
  const [text, setText] = useState("");

  const [tweet] = useTweetMutation();

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    tweet({
      variables: { text },
      update: (cache, { data }) => {
        if (data?.tweet) {
          const cachedTweets = cache.readQuery<TweetsQuery>({
            query: TweetsDocument,
          });
          cache.writeQuery<TweetsQuery>({
            query: TweetsDocument,
            data: {
              tweets: [
                { ...data.tweet, repliesCount: 0 },
                ...(cachedTweets?.tweets || []),
              ],
            },
          });
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Tweet..."
        maxLength={140}
      />
      <button>Tweet</button>
      <span>{140 - text.length}</span>
    </form>
  );
};

const Feed = () => {
  const { data } = useTweetsQuery();
  const { data: meData } = useMeQuery();

  const tweets =
    data?.tweets &&
    data.tweets.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />);

  return (
    <Fragment>
      <h1>Feed Page</h1>
      {meData?.me?.id && <NewTweet />}
      {tweets}
    </Fragment>
  );
};

export default Feed;
