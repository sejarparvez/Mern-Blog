const express = require("express");
const postrouter = express.Router();
const bcrypt = require("bcrypt");
const multer = require("multer");
const uplode = multer({ dest: "uplodes" });
const User = require("../Model/User");
const Post = require("../Model/Post");
const Comment = require("../Model/Comment");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const secret =
  "*wAkhx`}_XsiK/[|_9m_L[#^BhI&Z:^9yws6D[o|;o7Np.G@G*:1$e!/tt;VTm6y";

// Define a route for creating a new user
postrouter.post("/users", async (req, res) => {
  const saltRounds = 10; // Define the number of salt rounds to use

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Create a new user with the hashed password
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // Return a success message to the client
    res
      .status(200)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to create user" });
  }
});

// login page
postrouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate the user's input
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // Find the user with the given email
  const user = await User.findOne({ email });

  // Check if the user exists
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Check if the password is correct
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Create a session for the user (optional)

  if (passwordMatch) {
    jwt.sign(
      { email, id: user._id, name: user.name },
      secret,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token);
        res.cookie("name", user.name);
        res.json("ok");
      }
    );
  } else {
    res.status(400).json("wrong credential");
  }
});

postrouter.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

//Router For Creating New Post

postrouter.post("/newpost", uplode.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summery, content } = req.body;

    const PostDoc = await Post.create({
      title,
      summery,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json({ info, PostDoc });
  });
});

// Route for adding a new comment to a post
postrouter.post("/posts/:postId/comments", async (req, res) => {
  const { name, comment } = req.body;
  const postId = req.params.postId;

  try {
    const newComment = new Comment({
      name,
      comment,
      postId,
    });
    await newComment.save();
    res.json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = postrouter;
