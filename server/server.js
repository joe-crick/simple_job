import express from "express";
import serverRenderer from "./renderer";
import path from "path";
import morgan from "morgan";

const app = express();
const router = express.Router();
const PORT = 3000;

// root (/) should always serve our server rendered page
const matchIndex = "^/$";
router.use(matchIndex, serverRenderer);
// router.use("*", serverRenderer);

router.use(express.static(path.resolve(__dirname, "..", "build")));

app.use(router);
app.use(morgan("combined"));

app.listen(PORT, error => {
  if (error) {
    return console.log("An error has occurred:", error);
  }

  console.log(`listening on port ${PORT}...`);
});
