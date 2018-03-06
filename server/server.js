import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import fs from "fs";
import path from "path";
import { JSDOM as jsdom } from "jsdom";

import Html from "../src/html";
import Main from "../src/index";
import { jobData } from "../src/data/job-test-data";
import StaticRouter from "react-router-dom/StaticRouter";

const app = express();
const context = {};
const dirPrefix = "/dist";

app.use(dirPrefix, express.static(path.join(__dirname, "..", "build")));

const filePath = path.resolve(__dirname, "..", "build", "index.html");

const dom = new jsdom(fs.readFileSync(filePath, "utf8"));
const script = dom.window.document.querySelector("script").getAttribute("src");
const styles = dom.window.document
  .querySelector('[rel="stylesheet"]')
  .getAttribute("href");

function prefix(path) {
  return `${dirPrefix}${path}`;
}

app.get("/", (req, res) => {
  const initialData = jobData(50);

  ReactDOMServer.renderToNodeStream(
    <Html initialData={JSON.stringify(initialData)} styles={prefix(styles)} js={prefix(script)}>
      <StaticRouter location={req.ulr} context={context}>
        <Main jobsList={initialData} />
      </StaticRouter>
    </Html>
  ).pipe(res);
});

app.listen(3000, () => {
  console.log("listening on port 3000...");
});
