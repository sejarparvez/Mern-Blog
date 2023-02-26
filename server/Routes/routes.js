const express = require("express");

const jwt = require("jsonwebtoken");

const secret =
  "*wAkhx`}_XsiK/[|_9m_L[#^BhI&Z:^9yws6D[o|;o7Np.G@G*:1$e!/tt;VTm6y";
const multer = require("multer");
const fs = require("fs");
const Post = require("../Model/Post");

const uplode = multer({ dest: "uplodes" });

const router = express.Router();


router.put("/post", uplode.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;

    const { id, title, summery, content } = req.body;
    const PostDoc = await Post.findById(id);

    const isAuthor = JSON.stringify(PostDoc.author) === JSON.stringify(info.id);

    if (!isAuthor) {
      return res.status(400).json("You are not the author of this post");
    }

    await PostDoc.update({
      title,
      summery,
      content,
      cover: newPath ? newPath : PostDoc.cover,
    });

    res.json(PostDoc);
  });
});

router.delete("/post/:id", (req, res) => {
  const postId = req.params.id;
  Post.findByIdAndDelete(postId, (err, post) => {
    if (err) {
      return res.status(500).json({ error: "Could not delete post" });
    }
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.status(200).json({ message: "Post deleted successfully" });
  });
});

module.exports = router;
