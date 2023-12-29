import { Router } from "express";
import catchAll from "./catch-all";
import { loginUser, signUpUser } from "../../controllers/user";
import verifyToken from "../../middleware/verify";
import {deletePost, getPost, getPosts, storePost, updatePost } from "../../controllers/blog";

const router = Router();

router.get("/getAllBlogs", getPosts);
router
  .route("/post/:id?")
  .get(getPost)
  .put(verifyToken,updatePost)
  .post(verifyToken, storePost)
  .delete(verifyToken, deletePost);
router.post("/login", loginUser);
router.post("/signup", signUpUser);
router.use(catchAll);

export default router;