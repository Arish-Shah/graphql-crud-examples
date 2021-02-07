import { Switch, Route } from "react-router-dom";

import LinkList from "./components/LinkList";
import CreateLink from "./components/CreateLink";
import Header from "./components/Header";
import Login from "./components/Login";
import Search from "./components/Search";

function App() {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route path="/" component={LinkList} exact />
          <Route path="/create" component={CreateLink} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/search" component={Search} exact />
        </Switch>
      </div>
    </div>
  );
}

export default App;
