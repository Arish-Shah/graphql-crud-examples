import { FormEventHandler, Fragment, useState } from "react";
import { useHistory } from "react-router-dom";

import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useLoginMutation();

  const history = useHistory();

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    const response = await login({
      variables: { username, password },
      update(cache, { data }) {
        if (data?.login.user) {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              __typename: "Query",
              me: data?.login.user,
            },
          });
        }
      },
    });
    if (response.data?.login.errors?.length) {
      console.log(response.data.login.errors);
    }
    if (response.data?.login.user) {
      history.push("/");
    }
  };

  return (
    <Fragment>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button type="submit">login</button>
      </form>
    </Fragment>
  );
};

export default Login;
