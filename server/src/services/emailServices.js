import nodemailer from "nodemailer";
import ejs from "ejs";

function messageFind(type, url_msg) {
  let message;

  if (type === "forgot") {
    message = {
      sub: "Thanks for Forgot Password",
      heading: "Password Reset Request",
      title: "Please click the button below to reset your password",
      btn: "Reset Password",
      url: `http://localhost:3002/reset_password?email=${url_msg.email}&token=${url_msg.token}&password=${url_msg.password}`,
    };
  } else {
    message = {
      sub: "Thanks for signing in",
      heading: "This is your registration link",
      title: "Please click the button below to activate your grocery account",
      btn: "Activate your grocery account",
      url: `http://localhost:3002/verfiy_email?email=${url_msg.email}&token=${url_msg.token}`,
    };
  }

  return message;
}

export const sendByEmail = async ({ email, type, url_msg }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "",
        pass: "",
      },
    });
    const { message } = messageFind(type, url_msg);
    return new Promise((resolve, reject) => {
      ejs.renderFile(
        `src/views/welcome.ejs`,
        {
          message,
        },
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            const mailOptions = {
              from: "",
              to: email,
              subject: message.sub,
              html: data,
            };
            transporter.sendMail(mailOptions, (error, data) => {
              if (err) {
                reject(error);
              } else {
                resolve(data);
              }
            });
          }
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
};
