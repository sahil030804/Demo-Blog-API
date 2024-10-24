import blogServices from "./blogServices.js";

//AUTHORS
const postAuthor = async (req, res) => {
  const newAuthor = await blogServices.postAuthor(req, res);
  res.status(200).json(newAuthor);
};

const getAllAuthors = async (req, res) => {
  const allAuthors = await blogServices.getAllAuthors();
  res.status(200).json(allAuthors);
};

//POSTS
const addPost = async (req, res) => {
  const newPost = await blogServices.addPost(req, res);
  res.status(200).json(newPost);
};

const getAllPosts = async (req, res) => {
  const allPosts = await blogServices.getAllPosts();
  res.status(200).json(allPosts);
};

//COMMENTS
const addComment = async (req, res) => {
  const newComment = await blogServices.addComment(req, res);
  res.status(200).json(newComment);
};

const getAllComments = async (req, res) => {
  const allComments = await blogServices.getAllComments();
  res.status(200).json(allComments);
};

const getBlogs = async (req, res) => {
  const blogs = await blogServices.getBlogInfo(req, res);
  res.status(200).json(blogs);
};

export default {
  postAuthor,
  getAllAuthors,
  addPost,
  getAllPosts,
  addComment,
  getAllComments,
  getBlogs,
};
