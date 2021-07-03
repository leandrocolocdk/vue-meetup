const express = require("express");
const router = express.Router();
const AuthCtrl = require("../controllers/auth");

const MeetupsCtrl = require("../controllers/meetups");

router.get("", MeetupsCtrl.getMeetups);
router.get("/secret", AuthCtrl.onlyAuthUsers, MeetupsCtrl.getSecrets);

router.get("/:id", MeetupsCtrl.getMeetupById);

module.exports = router;
