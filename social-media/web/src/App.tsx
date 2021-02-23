import { Redirect, Route, Switch } from "react-router-dom";
import { Fragment } from "react";

import Register from "./pages/register";
import Login from "./pages/login";
import Feed from "./pages/feed";
import Navbar from "./components/Navbar";
import User from "./pages/user";
import Tweet from "./pages/tweet";

const App = () => {
  const routes = (
    <Switch>
      <Route path="/register" component={Register} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/feed" component={Feed} exact />
      <Route path="/tweet/:id" component={Tweet} exact />
      <Route path="/:username" component={User} exact />
      <Redirect to="/feed" />
    </Switch>
  );

  return (
    <Fragment>
      <Navbar />
      <main>{routes}</main>
    </Fragment>
  );
};

export default App;
