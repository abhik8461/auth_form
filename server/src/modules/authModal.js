import { Schema, model } from "mongoose";

const authSchema = new Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
  is_verify: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
  },
  expire_time: {
    type: String,
  },
  profile: {
    type: String,
  },
});

export default model("auth", authSchema);
