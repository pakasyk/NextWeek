var express = require('express');
var router = express.Router();

/* GET exercises listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a exercise');
});

module.exports = router;