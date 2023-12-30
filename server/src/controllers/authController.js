import authModal from "../modules/authModal.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import ejs from "ejs";
import { registerByEmail, forgotByEmail } from "../services/emailServices.js";

const generateToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const ttl = 1000 * 60 * 10; // 10 min
const expires = Date.now() + ttl;

const create_user = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.json({
      status: false,
      message: "Please enter your Field",
    });
  }
  try {
    const exist = await authModal.findOne({ email: req.body.email });
    if (exist) {
      return res.json({
        status: false,
        message: "user already exists",
      });
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = await authModal.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
      expire_time: expires,
      token: generateToken(),
    });
    if (!user) {
      return res.json({
        status: false,
        message: "user created failed",
      });
    }
    const info = await registerByEmail(user);
    if (info.messageId) {
      return res.json({
        status: true,
        message: "User created successfully",
        info: info.response,
      });
    }
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.json({
      status: false,
      message: "Please enter your Field",
    });
  }
  try {
    const user = await authModal.findOne({ email: req.body.email });
    if (!user) {
      return res.json({
        status: false,
        message: "email not found",
      });
    }
    const isMatch = await bcrypt.compare(user.password, req.body.password);
    if (!isMatch) {
      return res.json({
        status: false,
        message: "password not found",
      });
    }
  } catch (error) {
    return next(error);
  }
};

const resetPassword = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const forgotPassword = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const changePassword = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const reVerification = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const verifyEmail = async (req, res) => {
  try {
    const token = req.query.token;
    const email = req.query.key;

    const user = await authModal.findOne({ email: email });
    const name = `${user.first_name} ${user.last_name}`;

    if (Date.now() < user.expire_time && user.token !== null) {
      await authModal.updateOne(
        { _id: user._id },
        {
          $set: { is_verify: true, token: null },
        }
      );

      ejs.renderFile(
        "src/views/verify.ejs",
        {
          name,
        },
        function (err, data) {
          res.send(data);
        }
      );
    } else {
      res.send("Time is expire");
    }
  } catch (error) {
    console.log(error);
  }
};

const auth = {
  create_user,
  login,
  resetPassword,
  forgotPassword,
  changePassword,
  reVerification,
  verifyEmail,
};

export default auth;
