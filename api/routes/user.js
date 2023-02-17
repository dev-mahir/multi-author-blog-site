import express from 'express';
import {
  loggedInUser,
  login,
  activateAccountByCode,
  resendActivation,
  forgotPassword,
  register,
  activateAccountByLink,
  passwordResetAction,
  findUserAccount,
  sendPasswordResetOTP,
  checkPasswordResetOtp,
  passwordReset,
  newOTPCode,
  userProfileUpdate,
  addFeaturedSlider,
} from "../controllers/userController.js";

// init router 
const router = express.Router();

import path, { resolve } from "path";
import multer from 'multer';
// multer for slider

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(resolve(), "api/public/slider"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});


const sliderFeatured = multer({ storage }).array('slider', 6);


// user auth route 
router.post('/login', login)
router.post('/register', register)
router.get('/me', loggedInUser)

router.put('/profile-update/:id', userProfileUpdate)
router.put("/featured-slider/:id", sliderFeatured, addFeaturedSlider);

router.get('/activate/:token', activateAccountByLink)

router.post('/code-activation', activateAccountByCode)
router.post('/resend-activate', resendActivation)

router.post('/forgot-password', forgotPassword)
router.post('/forgot-password/:token', passwordResetAction)

router.post('/find-account', findUserAccount)
router.post("/send-password-reset-otp", sendPasswordResetOTP);
router.post("/check-password-reset-otp", checkPasswordResetOtp);

router.post("/user-password-reset", passwordReset);

router.post("/new-otp-code", newOTPCode);



// export  router 
 export default router 