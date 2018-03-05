import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import { Provider } from "react-redux";
import rootStore from "./stores/store";
import "./index.css";
import App from "./App";

export const Main = () => (
  <BrowserRouter>
    <Provider store={rootStore}>
      <div>
        <ErrorBoundary>
          <div>
            <Switch>
              <Route path={"/"} component={App} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </ErrorBoundary>
      </div>
    </Provider>
  </BrowserRouter>
);

render(<Main />, document.getElementById("root"));
