import { Router } from "express";
import {
  add_category,
  delete_category,
  get_category,
  get_single_category,
  update_category,
} from "../controllers/catController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/add", authMiddleware, add_category);
router.get("/get",  get_category);
router.delete("/:id", authMiddleware, delete_category);
router.get("/:id", get_single_category);
router.patch("/:id", authMiddleware, update_category);

export default router;
