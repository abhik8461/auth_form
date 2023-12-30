import express from "express";
import "../config/db.js";
import cors from "cors";
import router from "./routes/routes.js";
const app = express();
app.use(express.json());

const port = process.env.PORT || 3002;

app.use("/", router);

app.use(cors());

app.set("view engine", "ejs");

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
