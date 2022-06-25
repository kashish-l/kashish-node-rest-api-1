const controller = require("../controllers/post.controller");
const express = require("express");
const router = express.Router();

router.get("/posts", controller.posts);

router.get("/ping", (req, res) => {
  res.status(200).json({ "sucess": true });
});

module.exports = router;