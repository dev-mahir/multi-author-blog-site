import { Router } from "express";
import { adminLogin, adminRegister } from "../controllers/adminController.js";

const router = Router();


router.post("/login", adminLogin);
router.post("/register", adminRegister);



export default router;