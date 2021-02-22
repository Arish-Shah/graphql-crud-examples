import { Fragment } from "react";
import { useParams } from "react-router-dom";
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
    </Fragment>
  ) : null;
};

export default User;
