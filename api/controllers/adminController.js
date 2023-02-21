import validator from "validator";
import Admin from "../models/Admin.js";
import createError from "../utilis/createError.js";
import { hash, passwordVarify } from "../utilis/hash.js";
import { createToken } from "../utilis/token.js";

export const adminRegister = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createError(404, "All fields are required"));
    }

    if (!validator.isEmail(email)) {
      return next(createError(404, "Invalid email"));
    } else {
      const admin = await Admin.create({
        ...req.body,
        password: hash(password),
      });
      res.status(200).json({
        admin,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createError(404, "All fields are required"));
    }
    if (!validator.isEmail(email)) {
      return next(createError(404, { email: "Invalid email" }));
    }

    const emailCheck = await Admin.findOne({ email });

    if (emailCheck) {
      const passwordCheck = passwordVarify(password, emailCheck.password);
      if (!passwordCheck) {
        return next(createError(404, { password: "Invalid password" }));
      } else {
        const token = createToken({ id: emailCheck._id }, "7d");

        res
          .status(200)
          .cookie("authToken", token, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
          })
          .json({
            message: "Login success",
            admin: emailCheck,
            token,
          });
      }
    } else {
      next(createError(404, "User not found"))
    }
  } catch (error) {
    next(createError("500", "Internal server error"))
  }
};
