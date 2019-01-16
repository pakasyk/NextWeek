var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var auth = require('../controllers/AuthController');

router.get('/', auth.home);
router.get('/register', auth.register);
router.post('/register', urlencodedParser, auth.doRegister);
router.get('/login', auth.login);
router.post('/login', urlencodedParser, auth.doLogin);
router.get('/logout', auth.doLogout);
router.get('/passwordChange', auth.login);
router.post('/passwordChange', urlencodedParser, auth.doLogin);

module.exports = router;
