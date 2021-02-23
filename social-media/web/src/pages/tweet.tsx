import { FormEventHandler, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  GetTweetDocument,
  GetTweetQuery,
  useGetTweetQuery,
  useReplyMutation,
} from "../generated/graphql";

const NewReply = ({ tweetId }: { tweetId: string }) => {
  const [text, setText] = useState("");

  const [reply] = useReplyMutation();

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    reply({
      variables: { tweetId, text },
      update: (cache, { data }) => {
        if (data?.reply) {
          const cachedTweet = cache.readQuery<GetTweetQuery>({
            query: GetTweetDocument,
            variables: {
              id: tweetId,
            },
          });
          const replies = cachedTweet?.getTweet?.replies || [];
          cache.writeQuery<GetTweetQuery>({
            query: GetTweetDocument,
            variables: {
              id: tweetId,
            },
            data: {
              __typename: "Query",
              getTweet: {
                __typename: "Tweet",
                creator: cachedTweet!.getTweet!.creator,
                text: cachedTweet!.getTweet!.text,
                replies: [data.reply, ...replies],
              },
            },
          });
        }
      },
    });
  };

  return (
    <form style={{ marginTop: "1rem" }} onSubmit={handleSubmit}>
      <textarea
        rows={2}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="reply..."
      />
      <button type="submit">reply</button>
    </form>
  );
};

const Tweet = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useGetTweetQuery({
    variables: {
      id,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loading && data?.getTweet) {
    return (
      <div style={{ marginTop: "2rem" }}>
        <Link to={`/${data.getTweet.creator.username}`}>
          @{data.getTweet.creator.username}
        </Link>
        <h1 style={{ margin: 0 }}>{data.getTweet.text}</h1>
        <div>
          <NewReply tweetId={id} />
          {data.getTweet.replies.map((reply) => (
            <div key={reply.id} style={{ marginTop: "0.5rem" }}>
              <Link to={`/${reply.creator.username}`}>
                @{reply.creator.username}
              </Link>
              <span> "{reply.text}"</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default Tweet;
