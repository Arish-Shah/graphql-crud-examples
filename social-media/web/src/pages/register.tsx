import { FormEventHandler, Fragment, useState } from "react";
import { useHistory } from "react-router";

import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";

const Register = () => {
  const [register] = useRegisterMutation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useHistory();

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    const response = await register({
      variables: {
        input: {
          email,
          username,
          password,
        },
      },
      update(cache, { data }) {
        if (data?.register.user) {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              __typename: "Query",
              me: data?.register.user,
            },
          });
        }
      },
    });

    if (response.data?.register.errors?.length) {
      console.log(response.data.register.errors);
    }
    if (response.data?.register.user) {
      router.push("/");
    }
  };

  return (
    <Fragment>
      <h1>Register Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
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
        <button type="submit">register</button>
      </form>
    </Fragment>
  );
};

export default Register;
