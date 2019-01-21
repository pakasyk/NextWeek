var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var ProfileController = require('../controllers/ProfileController');


var multer = require('multer');
var sharp = require('sharp');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/')
    },
    filename: (req, file, cb) => {
      sharp('public/images/').resize(200, 200).toFile();
      
      cb(null, file.filename + '-' + Date.now() + '.jpg')
      
    }
});
var upload = multer({storage: storage});


router.get('/createProfile', ProfileController.profile );
router.post('/createProfile', upload.single('photo'), ProfileController.createProfile );


router.get('/profileEnd/:id', ProfileController.profileEnd)
router.get('/newPassword', ProfileController.changePassword)
router.get('/resultTracker', ProfileController.resultTracker )



module.exports = router;
