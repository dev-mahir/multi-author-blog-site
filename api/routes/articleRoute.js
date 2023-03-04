import { Router } from "express";
import {
  add_article,
  get_article,
  get_single_article,
  get_users_article,
  update_article,
  get_old_article,
  get_category_article,
  get_all_article,
  get_tag_article,
  add_like_dislike,
  add_comment,
  delete_article,
  search_article,
  get_comment,
  add_reply,
} from "../controllers/articleController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import upload from "../utilis/multer.js";


const router = Router();
router.get("/users-article", authMiddleware, get_users_article);
router.post("/", authMiddleware, upload.single("image"), add_article);
router.get("/", get_article);
router.get("/old-article", get_old_article);
router.get("/get/all", get_all_article);


router.post("/add-comment", add_comment);
router.post("/single-article/:type/:articleId", add_like_dislike);

router.delete("/delete/:id", delete_article);
router.get("/search/:value", search_article );
router.get("/category/:slug", get_category_article);
router.get("/tag/:slug", get_tag_article);
router.patch("/update/:id", upload.single('image'), update_article);

router.get("/:slug", get_single_article);

router.get("/comment/:id", get_comment);
router.patch("/reply-comment/:id", add_reply);





export default router;
