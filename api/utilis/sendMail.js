import nodemailer from "nodemailer";
import createError from "./createError.js";

/**
 * Send Account activation code
 */
export const sentOTPCode = async (data) => {
  // create transport
  let transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS,
    },
  });

  // send activation mail
  try {
    switch (data.type) {
      case "accountActivation":
        return await transport.sendMail({
          from: `Blog <${process.env.MAIL_ID}>`,
          subject: "Account Activation",
          to: data.to,
          text: `${data.code}`,
        });

      case "resendCode":
        return await transport.sendMail({
          from: `Facebook Pro <${process.env.MAIL_ID}>`,
          subject: "New OTP Code",
          to: to,
          text: data.code,
        });

      case "passwordReset":
        return await transport.sendMail({
          from: `Facebook Pro <${process.env.MAIL_ID}>`,
          subject: "Password reset",
          to: to,
          text: data.code,
        });

      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Send password reset link
 */
export const sendPasswordForgotLink = async (to, data) => {
  // create transport
  let transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS,
    },
  });

  // send activation mail
  try {
    await transport.sendMail({
      from: `Facebook Pro <${process.env.MAIL_ID}>`,
      subject: "Password reset",
      to: to,
      html: ` 
      <div style=" background-color: bisque;
      padding: 20px;">
    <div>
    <h2>Dear ${data.name}</h2>
    <h2>Code ${data.code}</h2>
        <a href="${data.link}">Change password</a>
    </div>
</div>


      
      `,
    });
  } catch (error) {
    console.log(error);
  }
};
