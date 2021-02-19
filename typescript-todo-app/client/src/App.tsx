import { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router";

import useToken from "./hooks/useToken";
import AuthPage from "./pages/auth";
import TodosPage from "./pages/todos";

function App() {
  const { token, setToken } = useToken();

  const routes = token ? (
    <Fragment>
      <Route
        path="/todos"
        component={() => <TodosPage setToken={setToken} />}
      />
      <Redirect to="/todos" />
    </Fragment>
  ) : (
    <Fragment>
      <Route path="/auth" component={() => <AuthPage setToken={setToken} />} />
      <Redirect to="/auth" />
    </Fragment>
  );

  return (
    <main>
      <Switch>{routes}</Switch>
    </main>
  );
}

export default App;
