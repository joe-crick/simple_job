import React from "react";

const Html = props => {
  return (
    <html>
      <head>
        <title>Hey Jobs React Task</title>
        <link href={props.styles} rel="stylesheet"/>
      </head>
      <body>
        <div id="app">{props.children}</div>
        <script
          id="initial-data"
          type="text/plain"
          data-json={props.initialData}
        />
        <script src={props.js} />
      </body>
    </html>
  );
};

export default Html;
