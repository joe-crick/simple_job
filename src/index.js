import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { hydrate } from "react-dom";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { Provider } from "react-redux";
import rootStore from "./stores/store";
import "./index.css";
import App from "./App";

const Main = () => (
  <Provider store={rootStore}>
    <div>
      <ErrorBoundary>
        <div>
          <Switch>
            <Route path={"/"} component={App} />
          </Switch>
        </div>
      </ErrorBoundary>
    </div>
  </Provider>
);

export default Main;

if (typeof window !== "undefined") {
  const initialData = JSON.parse(
    document.getElementById("initial-data").getAttribute("data-json")
  );

  hydrate(
    <BrowserRouter>
      <Main {...initialData} />
    </BrowserRouter>,
    document.getElementById("app")
  );
}
