const express = require("express");
const router = express.Router();
const AuthCtrl = require("../controllers/auth");

const MeetupsCtrl = require("../controllers/meetups");

router.get("", MeetupsCtrl.getMeetups);
router.post("", AuthCtrl.onlyAuthUser, MeetupsCtrl.createMeetup);

router.get("/secret", AuthCtrl.onlyAuthUser, MeetupsCtrl.getSecrets);

router.get("/:id", MeetupsCtrl.getMeetupById);

module.exports = router;
