import { Fragment } from "react";
import { useParams } from "react-router-dom";
import Tweet from "../components/Tweet";
import { useUserQuery } from "../generated/graphql";

const User = () => {
  const { username } = useParams<{ username: string }>();
  const { data } = useUserQuery({
    variables: {
      username,
    },
  });

  return data?.user ? (
    <Fragment>
      <h1>@{data.user.username}</h1>
      <div>
        {data.user.tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} username={data.user?.username} />
        ))}
      </div>
    </Fragment>
  ) : null;
};

export default User;
