import express from "express";
import "../config/db.js";
import cors from "cors";
const app = express();
app.use(express.json());

const port = process.env.PORT || 3002;

app.use(cors());

app.set("view engine", "ejs");

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
