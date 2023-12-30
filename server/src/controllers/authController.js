import authModal from "../modules/authModal.js";
import bcrypt from "bcrypt";
import { sendByEmail } from "../services/emailServices.js";

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
      email: req.body.email,
      password: hashPassword,
      full_name: req.body.full_name,
    });
    if (!user) {
      return res.json({
        status: false,
        message: "user created failed",
      });
    }
    const url_msg = {
      email: user.email,
      token: user.token,
    };
    const info = await sendByEmail(req.body.email, url_msg);
    return res.json({
      status: true,
      message: "User created successfully",
    });
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

const auth = {
  create_user,
  login,
};

export default auth;
