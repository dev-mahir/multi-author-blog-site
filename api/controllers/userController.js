import User from "../models/User.js";
import createError from "../utility/createError.js";
import { hash, passwordVarify } from "../utility/hash.js";
import { getRandom } from "../utility/math.js";
import {
  sendActivationLink,
  sendPasswordForgotLink,
} from "../utility/sendMail.js";
import { sendOTP } from "../utility/sendSMS.js";
import { createToken, tokenVerify } from "../utility/token.js";
import { isEmail, isPhone } from "../utility/validate.js";
import multer from "multer";

/**
 * @access public
 * @route /api/user/register
 * @method POST
 */
export const register = async (req, res, next) => {
  try {
    // get form data
    const { first_name, sur_name, auth, password, gender } = req.body;

    // validation
    if (!first_name || !sur_name || !auth || !password || !gender) {
      next(createError(400, "All fields are required"));
    }

    // initial auth value
    let mobileData = null;
    let emailData = null;

    if (isEmail(auth)) {
      emailData = auth;
      // email check
      const emailCheck = await User.findOne({ email: auth });
      if (emailCheck) {
        next(createError(400, "Email already exists"));
        return;
      }
    } else if (isPhone(auth)) {
      mobileData = auth;
      // email check
      const mobileCheck = await User.findOne({ mobile: auth });
      if (mobileCheck) {
        next(createError(400, "Mobile already exists"));
        return;
      }
    } else {
      next(createError(400, "Invalid phone or email"));
      return;
    }

    // create access token
    const activation_code = getRandom();

    // create user
    const user = await User.create({
      ...req.body,
      password: hash(password),
      mobile: mobileData,
      email: emailData,
      access_token: activation_code,
    });

    if (user) {
      if (emailData) {
        // create activation token
        const activationToken = createToken({ id: user._id }, "30d");

        // send activation link
        sendActivationLink(user.email, {
          name: user.first_name + " " + user.sur_name,
          subject: "Account Activation",
          type: "accountActivation",
          auth: user.email,
          code: activation_code,
          link: `${
            process.env.APP_URL + ":" + process.env.PORT
          }/api/v1/user/activate/${activationToken}`,
        });
        res
          .status(200)
          .cookie("otp", user.email, {
            expires: new Date(Date.now() + 1000 * 60 * 15),
          })
          .json({
            message: "User created successfull",
            user,
          });
      }

      if (mobileData) {
        // send activation otp
        sendOTP(
          user.mobile,
          `Hi ${user.first_name} ${user.sur_name}, Your account activation code is ${activation_code} `
        );
        res
          .status(200)
          .cookie("otp", user.mobile, {
            expires: new Date(Date.now() + 1000 * 60 * 15),
          })
          .json({
            message: "User created successfull",
            user,
          });
      }
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Resend account activation code
 * @access public
 * @route /api/user/resend-activate
 * @method POST
 */

export const resendActivation = async (req, res, next) => {
  try {
    const { auth } = req.body;

    // initial auth value
    let mobileData = null;
    let emailData = null;
    let emailCheck;
    let mobileCheck;

    if (isEmail(auth)) {
      emailData = auth;
      // email check
      emailCheck = await User.findOne({ email: auth });

      if (!emailCheck) {
        next(createError(404, "Email User Account not found"));
        return;
      }
      if (emailCheck.isActivate) {
        next(createError(400, "Email user already activate"));
      }
    } else if (isPhone(auth)) {
      mobileData = auth;
      // mobile check
      mobileCheck = await User.findOne({ mobile: auth });
      if (!mobileCheck) {
        next(createError(404, "Mobile User Account not found"));
        return;
      }
      if (mobileCheck.isActivate) {
        next(createError(400, "Mobile user already activate"));
      }
    } else {
      next(createError(400, "Invalid phone or email"));
      return;
    }

    // code generate
    const activation_code = getRandom();

    if (mobileData) {
      // send activation otp
      sendOTP(
        mobileCheck.mobile,
        `Hi ${mobileCheck.first_name} ${mobileCheck.sur_name}, Your account activation code is ${activation_code} `
      );

      // upadate code
      await User.findByIdAndUpdate(
        { _id: mobileCheck._id },
        {
          access_token: activation_code,
        }
      );
      res
        .status(200)
        .cookie("otp", mobileCheck.mobile, {
          expires: new Date(Date.now() + 1000 * 60 * 15),
        })
        .json({
          message: "New OTP code send successfull",
        });
    }

    if (emailData) {
      // create activation token
      const activationToken = createToken({ id: emailCheck._id }, "30d");

      // upadate code
      await User.findByIdAndUpdate(
        { _id: emailCheck._id },
        {
          access_token: activation_code,
        }
      );

      // send activation link
      sendActivationLink(emailCheck.email, {
        name: emailCheck.first_name + " " + emailCheck.sur_name,
        type: "resendCode",
        auth: emailCheck.email,
        link: `${
          process.env.APP_URL + ":" + process.env.PORT
        }/api/v1/user/activate/${activationToken}`,
        code: activation_code,
      });

      res
        .status(200)
        .cookie("otp", emailCheck.email, {
          expires: new Date(Date.now() + 1000 * 60 * 15),
        })
        .json({
          message: "New opt code send ",
        });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @access public
 * @route /api/user/login
 * @method POST
 */

export const login = async (req, res, next) => {
  try {
    const { auth, password } = req.body;
    if (!auth || !password) {
      return next(createError(400, "All fields are required"));
    }

    if (isEmail(auth)) {
      const userCheck = await User.findOne({ email: auth });
      if (!userCheck) {
        return next(createError(400, "Invalid email"));
      }
      if (userCheck) {
        if (!passwordVarify(password, userCheck.password)) {
          return next(createError(400, "Invalid password"));
        }
        if (passwordVarify(password, userCheck.password)) {
          // create token
          const token = createToken({ id: userCheck._id }, "365d");
          res.status(200).cookie("authToken", token).json({
            message: "User Login successfull",
            user: userCheck,
          });
        }
      }
    } else if (isPhone(auth)) {
      const userCheck = await User.findOne({ mobile: auth });
      if (!userCheck) {
        return next(createError(400, "Invalid phone"));
      }
      if (userCheck) {
        if (!passwordVarify(password, userCheck.password)) {
          return next(createError(400, "Invalid password"));
        }
        if (passwordVarify(password, userCheck.password)) {
          // create token
          const token = createToken({ id: userCheck._id }, "365d");
          res.status(200).cookie("authToken", token).json({
            message: "User Login successfull",
            user: userCheck,
          });
        }
      }
    } else {
      next(createError(400, "Invalid phone or email"));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @access public
 * @route /api/user/me
 * @method GET
 */

export const loggedInUser = async (req, res, next) => {
  try {
    const auth_token = req.headers.authorization;
    if (!auth_token) {
      next(createError(400, "Token not found"));
    }
    if (auth_token) {
      const token = auth_token.split(" ")[1];
      const user = tokenVerify(token);

      if (!user) {
        next(createError(400, "Invalid token"));
      }
      if (user) {
        const logged_in_user = await User.findById(user.id);
        if (!logged_in_user) {
          next(createError(400, "User data not match"));
        } else {
          res.status(200).json({
            message: "User data stable",
            user: logged_in_user,
          });
        }
      }
      res.status(200).json({
        token,
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @access public
 * @route /api/user/profile-update/:id
 * @method PUT
 */

export const userProfileUpdate = async (req, res, next) => {
  try {
    const data = req.body;
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, data, { new: true });
    if (user) {
      res.status(200).json({
        message: "Profile updated successfull",
        user,
      });
    }
    if (!user) {
      return next(createError(400, "Profile update failed"));
    }
  } catch (error) {
    next(next);
  }
};

/**
 * @access public
 * @route /api/user/activate/:token
 * @method GET
 */
export const activateAccountByLink = async (req, res, next) => {
  try {
    // get token
    const token = req.params.token;

    if (!token) {
      next(createError(400, "Invalid activation url"));
    } else {
      // verify token
      const tokenData = tokenVerify(token);

      // check token
      if (!tokenData) {
        next(createError(400, "Invalid token"));
      }

      // now activate account
      if (tokenData) {
        const account = await User.findById(tokenData.id);

        if (account.isActivate === true) {
          next(createError(400, "Account already activate"));
        } else {
          await User.findByIdAndUpdate(tokenData.id, {
            isActivate: true,
            access_token: "",
          });
          res.status(200).json({
            message: "Account activation successfull",
          });
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

/**
 *  Activate account by code
 *
 * @access public
 * @route /api/user/code-activation
 * @method GET
 */

export const activateAccountByCode = async (req, res, next) => {
  try {
    const { code, auth } = req.body;

    const user = await User.findOne().or([{ email: auth }, { mobile: auth }]); // match  phone or email

    if (!user) {
      next(createError(404, "Activation user not found"));
    } else {
      if (user.isActivate === true) {
        next(createError(400, "User accounr already activate"));
      } else {
        if (user.access_token !== code) {
          next(createError(400, " OTP code not match"));
        } else {
          await User.findByIdAndUpdate(user._id, {
            isActivate: true,
            access_token: "",
          });
          res.status(200).json({
            message: "Account activate successfully",
          });
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Forgot password
 * @route /api/user/forgot-password
 * @method POST
 */

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      next(createError(404, "User not found"));
    }

    if (user) {
      const activation_code = getRandom();

      // creat activation Token
      const passwordResetToken = createToken({ id: user._id }, "10m");

      // send activation link
      sendPasswordForgotLink(user.email, {
        subject: "Reset Password",
        name: user.first_name + " " + user.sur_name,
        link: `${
          process.env.APP_URL + ":" + process.env.PORT
        }/api/v1/user/forgot-password/${passwordResetToken}`,
      });

      await User.findByIdAndUpdate(user._id, {
        access_token: activation_code,
      });

      res.status(200).json({
        message: "Password reset link send to your email",
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 *
 * Password reset action
 * @access public
 * @route /api/user/
 * @method GET
 */

export const passwordResetAction = async (req, res, next) => {
  try {
    // get token
    const { token } = req.params;
    const { password } = req.body;

    if (!token) {
      next(createError(400, "Invalid passrord reset url"));
    } else {
      // verify token
      const tokenData = tokenVerify(token);

      // check token
      if (!tokenData) {
        next(createError(400, "Invalid token"));
      }

      // now activate account
      if (tokenData) {
        const user = await User.findById(tokenData.id);

        if (!user) {
          next(createError(400, "Invalid user id"));
        }
        if (user) {
          await User.findByIdAndUpdate(user._id, {
            password: hash(password),
            access_token: "",
          });
        }
        res.status(200).json({
          message: "Password reset successfull",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

/**
 *find user account for password reset
 * @access public
 * @route /api/user/find-account
 * @method POST
 */

export const findUserAccount = async (req, res, next) => {
  try {
    const { auth } = req.body;

    // initial auth value
    let mobileData = null;
    let emailData = null;

    if (isEmail(auth)) {
      emailData = auth;
      // email check
      const emailCheck = await User.findOne({ email: auth });
      if (!emailCheck) {
        next(createError(400, "Email User doesn't exists"));
        return;
      } else {
        res
          .status(200)
          .cookie(
            "findUser",
            JSON.stringify({
              name: emailCheck.first_name + " " + emailCheck.sur_name,
              photo: emailCheck.profile_photo,
              email: emailCheck.email,
            }),
            {
              expires: new Date(Date.now() + 1000 * 60 * 15),
            }
          )
          .json({
            user: emailCheck,
          });
      }
    } else if (isPhone(auth)) {
      mobileData = auth;
      // email check
      const mobileCheck = await User.findOne({ mobile: auth });
      if (!mobileCheck) {
        next(createError(400, "Mobile User doesn't exists"));
        return;
      } else {
        res
          .status(200)
          .cookie(
            "findUser",
            JSON.stringify({
              name: mobileCheck.first_name + " " + mobileCheck.sur_name,
              photo: mobileCheck.profile_photo,
              mobile: mobileCheck.mobile,
            }),
            {
              expires: new Date(Date.now() + 1000 * 60 * 15),
            }
          )
          .json({
            user: mobileCheck,
          });
      }
    } else {
      next(createError(400, "Invalid phone or email"));
      return;
    }
  } catch (error) {
    next(error);
  }
};

/**
 *
 * Send password reset otp
 * @access public
 * @route /api/user/send-password-reset-otp
 * @method GET
 */

export const sendPasswordResetOTP = async (req, res, next) => {
  try {
    const { auth } = req.body;

    // initial auth value
    let mobileData = null;
    let emailData = null;
    let emailCheck;
    let mobileCheck;

    if (isEmail(auth)) {
      emailData = auth;
      // email check
      emailCheck = await User.findOne({ email: auth });
    } else if (isPhone(auth)) {
      mobileData = auth;
      mobileCheck = await User.findOne({ mobile: auth });
    } else {
      next(createError(400, "Invalid phone or email"));
      return;
    }

    // code generate
    const activation_code = getRandom();

    if (mobileData) {
      // send activation otp
      sendOTP(
        mobileCheck.mobile,
        `Hi ${mobileCheck.first_name} ${mobileCheck.sur_name}, Your password reset code is:  ${activation_code} `
      );

      // upadate code
      await User.findByIdAndUpdate(
        { _id: mobileCheck._id },
        {
          access_token: activation_code,
        }
      );
      res
        .status(200)
        .cookie("otp", mobileCheck.mobile, {
          expires: new Date(Date.now() + 1000 * 60 * 15),
        })
        .json({
          message: "New OTP code send successfull",
        });
    }

    if (emailData) {
      // create activation token
      const activationToken = createToken({ id: emailCheck._id }, "30d");

      // upadate code
      await User.findByIdAndUpdate(
        { _id: emailCheck._id },
        {
          access_token: activation_code,
        }
      );

      // send activation link
      sendActivationLink(emailCheck.email, {
        name: emailCheck.first_name + " " + emailCheck.sur_name,
        type: "passwordReset",
        auth: emailCheck.email,
        link: `${
          process.env.APP_URL + ":" + process.env.PORT
        }/api/v1/user/activate/${activationToken}`,
        code: activation_code,
      });

      res
        .status(200)
        .cookie("otp", emailCheck.email, {
          expires: new Date(Date.now() + 1000 * 60 * 15),
        })
        .json({
          message: "New opt code send ",
        });
    }
  } catch (error) {
    next(error);
  }
};

/**
 *
 * New OTP Code
 * @access public
 * @route /api/user/new-otp-code
 * @method GET
 */

export const newOTPCode = async (req, res, next) => {
  try {
    const { auth } = req.body;

    if (isEmail(auth)) {
      const emailCheck = await User.findOne({ email: auth });
      // code generate
      const activation_code = getRandom();

      // upadate code
      await User.findByIdAndUpdate(
        { _id: emailCheck._id },
        {
          access_token: activation_code,
        }
      );
      // send activation link
      sendActivationLink(emailCheck.email, {
        type: "resendCode",
        auth: emailCheck.email,
        name: emailCheck.first_name + " " + emailCheck.sur_name,
        code: activation_code,
      });

      res.status(200).json({
        message: "New OTP code send successfull",
      });
    } else if (isPhone(auth)) {
      const mobileCheck = await User.findOne({ mobile: auth });
      // code generate
      const activation_code = getRandom();

      // send activation otp
      sendOTP(
        mobileCheck.mobile,
        `Hi ${mobileCheck.first_name} ${mobileCheck.sur_name}, Your new OTP code is ${activation_code} `
      );

      // upadate code
      await User.findByIdAndUpdate(
        { _id: mobileCheck._id },
        {
          access_token: activation_code,
        }
      );

      res
        .status(200)
        .cookie("otp", mobileCheck.mobile, {
          expires: new Date(Date.now() + 1000 * 60 * 15),
        })
        .json({
          message: "New OTP code send successfull",
        });
    } else {
      next(createError(400, "Invalid phone or email"));
      return;
    }
  } catch (error) {
    next(error);
  }
};

/**
 *
 * check password reset otp
 * @access public
 * @route /api/user/check-password-reset-otp
 * @method POST
 */

export const checkPasswordResetOtp = async (req, res, next) => {
  try {
    const { code, auth } = req.body;

    if (isEmail(auth)) {
      const userData = await User.findOne().where("email").equals(auth);
      if (!userData) {
        return next(createError(400, "Invalid user request"));
      }
      if (userData) {
        if (userData.access_token != code) {
          return next(createError(400, "Invalid OTP code"));
        }
        if (userData.access_token == code) {
          return res
            .status(200)
            .cookie("cpId", userData._id.toString(), {
              expires: new Date(Date.now() + 1000 * 60 * 15),
            })
            .cookie("code", code, {
              expires: new Date(Date.now() + 1000 * 60 * 15),
            })
            .json({
              message: "You can change your password",
            });
        }
      }
    } else if (isPhone(auth)) {
      const userData = await User.findOne().where("mobile").equals(auth);
      if (!userData) {
        return next(createError(400, "Invalid user request"));
      }
      if (userData) {
        if (userData.access_token != code) {
          return next(createError(400, "Invalid OTP code"));
        }
        if (userData.access_token == code) {
          return res
            .status(200)
            .cookie("cpId", userData._id.toString(), {
              expires: new Date(Date.now() + 1000 * 60 * 15),
            })
            .cookie("code", code, {
              expires: new Date(Date.now() + 1000 * 60 * 15),
            })
            .json({
              message: "You can change your password",
            });
        }
      }
    } else {
      next(createError(400, "Invalid phone or email"));
      return;
    }
  } catch (error) {
    next(error);
  }
};

/**
 *
 * Password Reset
 * @access public
 * @route /api/user/password-reset
 * @method POST
 */

export const passwordReset = async (req, res, next) => {
  try {
    const { password, id, code } = req.body;

    const userData = await User.findOne().and([
      { _id: id },
      { access_token: code },
    ]);
    if (!userData) {
      return next(createError(400, "Password change request failed"));
    }
    if (userData) {
      await User.findByIdAndUpdate(id, {
        password: hash(password),
      });
      return res
        .clearCookie("code")
        .clearCookie("cpId")
        .status(200)
        .json({ message: "User password change successfully" });
    }
  } catch (error) {
    next(error);
  }
};

/**
 *
 * Add Feature slider photo
 * @access public
 * @route /api/user/featured-slider/:id
 * @method put
 */

export const addFeaturedSlider = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    let slider = [];
    req.files.forEach((element) => {
      slider.push(element.filename);
    });

    const { featured } = await User.findById(id);

    const userData = await User.findByIdAndUpdate(
      id,
      {
        featured: [...featured, { name, slider }],
      },
      { new: true }
    );

    if (userData) {
      return res.status(200).json({
        message: "User featured added  successfully",
        user: userData,
      });
    }
  } catch (error) {
    next(error);
  }
};
