import React from "react";
import { renderToString } from "react-dom/server";
import Main from "../src/index";
import { jobData } from "../src/data/job-test-data";
import StaticRouter from "react-router-dom/StaticRouter";
import { Provider } from "react-redux";
import fs from "fs";
import path from "path";
import { JSDOM as jsdom } from "jsdom";
import rootStore from "../src/stores/store";
import appConfig from "../src/app.config";
import defaultState from "../src/state/state";

const context = {};
const filePath = path.resolve(__dirname, "..", "build", "index.html");
const dom = new jsdom(fs.readFileSync(filePath, "utf8"));
const doc = dom.window.document;
const dataIsland = doc.createElement("script");
dataIsland.id = "initial-data";
dataIsland.setAttribute("type", "text/plain");

export default (req, res) => {
  defaultState.jobsList = jobData(appConfig.defaultCount);
  dataIsland.setAttribute("data-json", JSON.stringify(initialData));
  doc.body.appendChild(dataIsland);
  doc.querySelector("title").textContent = "Hey Jobs: You're running real now, buddy.";

  doc.querySelector("#root").innerHTML = renderToString(
    <Provider store={rootStore(defaultState)}>
      <StaticRouter location={req.url} context={context}>
        <Main />
      </StaticRouter>
    </Provider>
  );

  return res.send(dom.serialize());
};
