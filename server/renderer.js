import React from "react";
import { renderToString } from "react-dom/server";
import Main from "../src/index";
import { jobData } from "../src/data/job-test-data";
import StaticRouter from "react-router-dom/StaticRouter";
import { Provider } from "react-redux";
import fs from "fs";
import path from "path";
import rootStore from "../src/stores/store";
import appConfig from "../src/app.config";
import defaultState from "../src/state/state";

const context = {};
const filePath = path.resolve(__dirname, "..", "build", "index.html");
const template = fs.readFileSync(filePath, "utf8");

export default (req, res) => {
  defaultState.jobsList = jobData(appConfig.defaultCount);
  const appHtml = renderToString(
    <Provider store={rootStore(defaultState)}>
      <StaticRouter location={req.url} context={context}>
        <Main />
      </StaticRouter>
    </Provider>
  );

  return context.url
    ? res.redirect(301, context.url)
    : res.send(
        template
          .replace("{{SSR}}", appHtml)
          .replace("{{json}}", JSON.stringify(defaultState.jobsList))
      );
};
