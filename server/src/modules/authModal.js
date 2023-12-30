import { Schema, model } from "mongoose";

const authSchema = new Schema({
  full_name: {
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
  profile: {
    type: String,
  },
});

export default model("auth", authSchema);
