import React from "react";
import { hydrate } from "react-dom";
import Main from "./index";
import { BrowserRouter } from "react-router-dom";

const initialData = JSON.parse(
  document.getElementById("initial-data").getAttribute("data-json")
);

hydrate(
  <BrowserRoute>
    <Main {...initialData} />
  </BrowserRoute>,
  document.getElementById("app")
);
