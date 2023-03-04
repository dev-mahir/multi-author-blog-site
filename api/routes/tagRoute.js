import { Router } from "express";
import {
  add_tag,
  delete_tag,
  get_tag,
  get_single_tag,
  update_tag
} from "../controllers/tagController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, add_tag);
router.get("/get",  get_tag);
router.delete("/:id", authMiddleware, delete_tag);
router.get("/:id", get_single_tag);
router.patch("/:id", authMiddleware, update_tag);

export default router;
