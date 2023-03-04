import { Router } from "express";
import {
  userRegister,
  user_email_verify,
  user_login,
  get_user,
} from "../controllers/userController.js";
import upload from '../utilis/multer.js'

const router = Router();


router.post("/user/login", user_login);
router.get("/user", get_user);
router.post("/user/register",upload.single('image'), userRegister);
router.post("/user/email-verify",  user_email_verify);





export default router;