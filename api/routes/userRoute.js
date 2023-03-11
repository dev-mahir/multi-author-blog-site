import { Router } from "express";
import {
  userRegister,
  user_email_verify,
  user_login,
  get_user,
  block_unblock_user,
  change_user_role,
} from "../controllers/userController.js";
import upload from '../utilis/multer.js'

const router = Router();



router.put("/role/:id", change_user_role);

router.put("/block/:id", block_unblock_user);

router.post("/login", user_login);

router.get("/", get_user);

router.post("/register", upload.single("profilephoto"), userRegister);

router.post("/email-verify",  user_email_verify);





export default router;