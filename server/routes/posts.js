import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  createComment,
  getPost,
  deletePost
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
//READ
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/:postId", verifyToken, getPost);
router.delete("/delete/:id",verifyToken,deletePost);

//post
router.post("/:postId/comment", verifyToken, createComment);

//update
router.patch("/:id/like", verifyToken, likePost);
export default router;
