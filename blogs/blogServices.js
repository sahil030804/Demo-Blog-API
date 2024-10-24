import { mongo, Schema } from "mongoose";
import blogSchema from "./blogSchema.js";

//AUTHORS
//Add Auhtor to authors collection
const postAuthor = async (req, res) => {
  const { name, email } = req.body;

  const author = await blogSchema.author({
    name: name,
    email: email,
    createdAt: new Date().toLocaleString(),
  });

  try {
    const newAuthor = await author.save();
    return newAuthor;
  } catch (error) {
    return { error: error.message };
  }
};

//Get all authors from authors collection
const getAllAuthors = async () => {
  try {
    const allAuthors = await blogSchema.author.find();
    return allAuthors;
  } catch (error) {
    return { error: error.message };
  }
};

//POSTS
//Add Auhtor to authors collection
const addPost = async (req, res) => {
  const { title, content, author } = req.body;

  const postObj = await blogSchema.post({
    title: title,
    content: content,
    author: author,
    postedAt: new Date().toLocaleString(),
  });

  try {
    const newPost = await postObj.save();
    return newPost;
  } catch (error) {
    return { error: error.message };
  }
};

//Get all authors from authors collection
const getAllPosts = async () => {
  try {
    const allPosts = await blogSchema.post.find();
    return allPosts;
  } catch (error) {
    return { error: error.message };
  }
};

//COMMENTS
//Add Author to authors collection
const addComment = async (req, res) => {
  const { name, comment, post } = req.body;

  const commentObj = await blogSchema.comment({
    name: name,
    comment: comment,
    post: post,
    commentedAt: new Date().toLocaleString(),
  });

  try {
    const newComment = await commentObj.save();
    return newComment;
  } catch (error) {
    return { error: error.message };
  }
};

//Get all authors from authors collection
const getAllComments = async () => {
  try {
    const allComments = await blogSchema.comment.find();
    return allComments;
  } catch (error) {
    return { error: error.message };
  }
};

const getBlogInfo = async (req, res) => {
  try {
    const joinCollection = await blogSchema.post.aggregate([
      {
        $lookup: {
          from: "authors",
          localField: "author",
          foreignField: "_id",
          as: "authorInfo",
        },
      },
      { $unwind: "$authorInfo" }, // Unwind the author-info array,
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "post",
          as: "comments",
        },
      },
      {
        $project: {
          title: 1,
          content: 1,
          author: {
            name: "$authorInfo.name",
            email: "$authorInfo.email",
          },
          comments: {
            $map: {
              input: "$comments",
              as: "comment",
              in: {
                name: "$$comment.name",
                comment: "$$comment.comment",
                commentAt: "$$comment.commentedAt",
              },
            },
          },
        },
      },
    ]);

    res.status(200).json(joinCollection);
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

export default {
  postAuthor,
  getAllAuthors,
  addPost,
  getAllPosts,
  addComment,
  getAllComments,
  getBlogInfo,
};
