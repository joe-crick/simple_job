import express from "express";
import morgan from "morgan";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import template from "lodash/template";
import fs from "fs";
import { Main } from "../src/index";
import path from "path";
import compression from "compression";

const PORT = 8080;
const baseTemplate = fs.readFileSync(
  path.join(__dirname, "../public/index.html")
);
const siteTemplate = template(baseTemplate);

const server = express();

server.use(compression());
server.use(morgan("combined"));

server.use("/public", express.static(path.join(__dirname, "public")));

server.use((req, res) => {
  console.log("url:", req.url);
  const context = {};
  const body = ReactDOMServer.renderToString(
    React.createElement(
      StaticRouter,
      { location: req.url, context },
      React.createElement(Main)
    )
  );
  if (context.url) {
    res.redirect(context.url);
  }

  res.write(siteTemplate({ body }));
  res.end();
});

console.log("Listening on Port:", PORT);
server.listen(PORT);
