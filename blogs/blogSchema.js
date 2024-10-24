import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required."] },
    email: {
      type: String,
      required: [true, "Email ID is required."],
      unique: true,
    },
    createdAt: { type: String },
  },
  { versionKey: false }
);

const author = mongoose.model("authors", authorSchema);

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId },
    postedAt: { type: String },
  },
  { versionKey: false }
);

const post = mongoose.model("posts", postSchema);

const commentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    post: { type: mongoose.Schema.Types.ObjectId },
    commentedAt: { type: String },
  },
  { versionKey: false }
);

const comment = mongoose.model("comments", commentSchema);

const blogSchema = new mongoose.Schema(
  {
    title: { type: String },
    content: { type: String },
    author: authorSchema, // Object of author
    comments: [commentSchema], // Array of comments
    blogPostedAt: { type: String },
  },
  { versionKey: false }
);

const blog = mongoose.model("blogs", blogSchema);

export default {
  author,
  post,
  comment,
  blog,
};

// db.posts.aggregate([
//   {
//     $lookup: {
//       from: "authors",
//       localField: "author",
//       foreignField: "_id",
//       as: "author-info",
//     },
//   },
//   { $unwind: "$author" },
//   {
//     $lookup: {
//       from: "comments",
//       localField: "_id",
//       foreignField: "post",
//       as: "comments",
//     },
//   },
// ]);

// db.posts.aggregate([
//   {
//     $lookup: {
//       from: "authors",
//       localField: "author",
//       foreignField: "_id",
//       as: "author-info",
//     },
//   },
//   { $unwind: "$author-info" }, // Unwind the author-info array,
//   {
//     $lookup: {
//       from: "comments",
//       localField: "_id",
//       foreignField: "post",
//       as: "comments",
//     },
//   },
//   {
//     $project: {
//       title: 1, // Include the post title
//       content: 1, // Include the post content
//       author: {
//         name: "author-info.name", // Include only the name field from author-info
//         email: "author-info.email", // Include only the email field from author-info
//       },
//       // Add other fields as needed
//       comments: [
//         {
//           name: "comments.name",
//           comment: "comments.comment",
//           commentAt: "comments.commentAt",
//         },
//       ],
//     },
//   },
// ]);
