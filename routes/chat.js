var express = require("express");
var router = express.Router();
var path = require("path");
var bodyParser = require("body-parser");
var chatController = require('../controllers/ChatController');

router.get("/", chatController.chatHome);
// router.get("/", chatController.loadData);
router.post("/send", chatController.sendMessage);

module.exports = router;