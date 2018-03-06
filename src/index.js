import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { Provider } from "react-redux";
import rootStore from "./stores/store";
import App from "./App";
import "./App.css";

const Main = () => (
  <div>
    <ErrorBoundary>
      <div>
        <Switch>
          <Route path={"/"} component={App} />
        </Switch>
      </div>
    </ErrorBoundary>
  </div>
);

if (typeof window !== "undefined") {
  const initialData = JSON.parse(document.getElementById("initial-data").getAttribute("data-json"));

  hydrate(
    <Provider store={rootStore(initialData)}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
}

export default Main;
