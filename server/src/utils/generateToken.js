import { sign } from "../services/jwtServices.js";

const generateToken = async (user) => {
  try {
    const payload = { id: user.id, email: user.email };
    const accessToken = sign(payload, "1d");
    return Promise.resolve(accessToken);
  } catch (error) {
    console.log(error);
  }
};

export default generateToken;
