import { config } from "dotenv";
config();

import jwt from "jsonwebtoken";

export function sign(
  payload,
  expiry = "2m",
  secret = process.env.ACCESS_TOKEN
) {
  return jwt.sign(payload, secret, { expiresIn: expiry });
}

export function verity(token, secret = process.env.ACCESS_TOKEN) {
  return jwt.verify(token, secret);
}
