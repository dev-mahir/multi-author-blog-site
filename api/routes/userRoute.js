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



router.put("/user/role/:id", change_user_role);
router.put("/user/block/:id", block_unblock_user);


router.post("/user/login", user_login);


router.get("/user", get_user);

router.post("/user/register", upload.single('image'), userRegister);

router.post("/user/email-verify",  user_email_verify);





export default router;