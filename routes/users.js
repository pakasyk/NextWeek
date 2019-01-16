var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var ProfileController = require('../controllers/ProfileController');



router.get('/createProfile', ProfileController.profile );
router.post('/createProfile', urlencodedParser, ProfileController.createProfile )
router.get('/profileEnd', ProfileController.profileEnd)



module.exports = router;
