import { connect } from "mongoose";

connect("mongodb://127.0.0.1:27017/Schools")
  .then((res) => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log("error connecting");
  });
