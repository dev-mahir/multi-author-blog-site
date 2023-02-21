import { Router } from "express";
import { add_category } from "../controllers/catController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();


router.post("/add",authMiddleware, add_category);




export default router;