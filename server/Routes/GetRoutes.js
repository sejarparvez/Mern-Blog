const express = require("express");
const Post = require("../Model/Post");
const User = require("../Model/User");

const jwt = require("jsonwebtoken");
const Comment = require('../Model/Comment')

const secret =
  "*wAkhx`}_XsiK/[|_9m_L[#^BhI&Z:^9yws6D[o|;o7Np.G@G*:1$e!/tt;VTm6y";

const getrouter = express.Router();

getrouter.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const PostDoc = await Post.findById(id).populate("author", ["name"]);
  res.json(PostDoc);
});

getrouter.get("/profile/:id", async (req, res) => {
  const ObjectId = require("mongodb").ObjectId;
  const myId = ObjectId(req.params.id);

  const myData = await User.findOne({ _id: myId });

  res.json(myData);
});

getrouter.get("/post", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  const count = await Post.countDocuments();
  const totalPages = Math.ceil(count / pageSize);

  const posts = await Post.find()
    .populate("author", ["name"])
    .sort({ createdAt: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  res.json({
    posts,
    totalPages,
    currentPage: page,
    pageSize,
  });
});

getrouter.get("/userpost/:id", async (req, res) => {
  const id = req.params.id;

  const posts = await Post.find({ author: id })
    .populate("author", ["name"])
    .sort({ createdAt: -1 })
    .limit(20);

  res.json(posts);
});

getrouter.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) {
      throw err;
    } else {
      res.json(info);
    }
  });
});

// Route for getting all comments for a particular post
getrouter.get("/posts/:postId/comments", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = getrouter;
