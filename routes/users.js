var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var ProfileController = require('../controllers/ProfileController');



router.get('/createProfile', ProfileController.profile );
router.post('/createProfile', ProfileController.createProfile, ProfileController.profileEnd );

router.get('/profileEnd/:id', ProfileController.profileEnd)
router.get('/newPassword', ProfileController.changePassword)
router.get('/resultTracker', ProfileController.resultTracker )



module.exports = router;
