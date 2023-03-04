import validator from "validator";
import Admin from "../models/Admin.js";
import User from "../models/User.js";
import createError from "../utilis/createError.js";
import { createSlug } from "../utilis/createSlug.js";
import { hash, passwordVarify } from "../utilis/hash.js";
import { generateOTP } from "../utilis/math.js";
import { sentOTPCode } from "../utilis/sendMail.js";
import { createToken, tokenVerify } from "../utilis/token.js";

export const user_login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createError(404, "All fields are required"));
    }
    if (!validator.isEmail(email)) {
      return next(createError(404, { email: "Invalid email" }));
    }

    const emailCheck = await User.findOne({ email: email });

    if (emailCheck) {
      const passwordCheck = passwordVarify(password, emailCheck.password);
      if (!passwordCheck) {
        return next(createError(404, { password: "Invalid password" }));
      } else {
        const token = createToken(
          {
            email: emailCheck.email,
            _id: emailCheck._id,
            name: emailCheck.name,
            access_status: emailCheck.access_status,
            role: emailCheck.role,
            image: emailCheck.image,
            loginMethod: emailCheck.loginMethod,
          },
          "7d"
        );
        const { password, access_token, ...newData } = emailCheck._doc;
        res
          .status(200)
          .cookie("authToken", token, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
            // httpOnly: true,
            // sameSite: "none",
            // secure: true,
          })
          .json({
            message: "Login success",
            user: newData,
          });
      }
    } else {
      next(createError(404, "User not found"));
    }
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};

export const userRegister = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return next(createError(404, "All fields are required"));
    }
    if (!validator.isEmail(email)) {
      return next(createError(404, "Invalid email"));
    } else {
      const checkUser = await User.findOne({ email });
      if (checkUser) {
        next(createError(400, "Email already in use"));
      } else {
        const otp = generateOTP();
        const user = await User.create({
          name,
          email,
          image: req?.file?.filename || "",
          username: createSlug(name),
          password: hash(password),
          access_token: otp,
        });
        if (user) {
          sentOTPCode({
            to: email,
            name: name,
            code: otp,
            type: "accountActivation",
          });

          const emailVerifyToken = createToken(
            {
              email,
              name,
              password,
              otp,
              image: req?.file?.filename || "",
            },
            "7d"
          );

          const option = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
          };

          res
            .status(201)
            .cookie("emailVerifyToken", emailVerifyToken, option)
            .json({
              message: "Registration successfull",
              user,
            });
        } else {
          next(createError(400, "Registration failed"));
        }
      }
    }
  } catch (error) {
    next(createError(500, "Internal server error. Try again"));
    console.log(error);
  }
};

export const user_email_verify = async (req, res, next) => {
  try {
    const { otp } = req.body;
    const { emailVerifyToken } = req.cookies;

    if (!otp) {
      return next(createError(404, "Please provide your OTP"));
    }
    if (!emailVerifyToken) {
      return next(createError(404, "There is a cookie error"));
    } else {
      const { email } = tokenVerify(emailVerifyToken);
      const checkUser = await User.findOne({ email });
      if (!checkUser) {
        return next(createError(404, "Please register first "));
      } else {
        const otpCheck = await User.findOne({ access_token: otp });
        if (!otpCheck) {
          return next(createError(404, "Invalid OTP code"));
        } else {
          const user = await User.findByIdAndUpdate(
            otpCheck._id,
            {
              ...req.body,
              access_token: "",
              loginMethod: "mannually",
            },
            { new: true }
          );
          const token = createToken(
            {
              id: user._id,
              name: user.name,
              username: user.username,
              image: user.image,
              access_status: user.access_status,
              loginMethod: user.loginMethod,
              role: user.role,
            },
            "3d"
          );
          const option = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          };

          const { password, ...new_data } = user._doc;

          res
            .status(200)
            .clearCookie("emailVerifyToken")
            .cookie("authToken", token, option)
            .json({
              message: "Email verify successfull",
              user: new_data,
            });
        }
      }
    }
  } catch (error) {
    next(createError(500, "Internal server error. Try again"));
    console.log(error);
  }
};

export const get_user = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json({
      message: "Success",
      user
    });
  } catch (error) {
    next(createError(500, "Internal server error. Try again"));
  }
};
