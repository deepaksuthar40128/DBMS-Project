import express from "express";
import { getPosts, addPost, deletePost, getUserPost } from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", addPost);
router.get('/user/:id', getUserPost);
router.delete("/:id", deletePost);

export default router;
