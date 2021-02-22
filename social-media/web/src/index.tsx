import React from "react";
import ReactDOM from "react-dom";
import {
  createHttpLink,
  InMemoryCache,
  ApolloClient,
  ApolloProvider,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
