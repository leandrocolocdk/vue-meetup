const express = require("express");
const router = express.Router();
const AuthCtrl = require("../controllers/auth");

const PostsCtrl = require("../controllers/posts");

router.get("", PostsCtrl.getPosts);
router.post("", AuthCtrl.onlyAuthUser, PostsCtrl.createPost);

module.exports = router;
