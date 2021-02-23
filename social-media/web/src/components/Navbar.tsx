import { Fragment } from "react";
import { Link } from "react-router-dom";

import {
  MeDocument,
  MeQuery,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";

const Navbar = () => {
  const { data, loading } = useMeQuery();
  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    logout({
      update(cache, { data }) {
        if (data?.logout) {
          console.log("logging out");
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              __typename: "Query",
              me: null,
            },
          });
        }
      },
    });
  };

  if (loading) return <div>Loading...</div>;

  if (data) {
    if (data.me) {
      return (
        <div className="nav">
          <Link to="/">Hello {data.me.username}!</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      );
    } else {
      return (
        <Fragment>
          <Link to="/login">login</Link>&emsp;
          <Link to="/register">register</Link>
        </Fragment>
      );
    }
  }
  return null;
};

export default Navbar;
