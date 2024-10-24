import express from "express";
import blogController from "./blogController.js";

const router = express.Router();

router.post("/add-author", blogController.postAuthor);
router.get("/all-authors", blogController.getAllAuthors);
router.post("/add-post", blogController.addPost);
router.get("/all-posts", blogController.getAllPosts);
router.post("/add-comment", blogController.addComment);
router.get("/all-comments", blogController.getAllComments);
router.get("/blogs", blogController.getBlogs);

export default router;
