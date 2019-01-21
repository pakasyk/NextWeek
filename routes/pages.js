var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/contacts', function(req, res, next) {
  res.render('pages/contacts', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
    res.render('pages/about', { title: 'Express' });
  });

  router.get('/faq', function(req, res, next) {
    res.render('pages/faq', { title: 'Express' });
  });

  router.get('/terms', function(req, res, next) {
    res.render('pages/terms', { title: 'Express' });
  });
module.exports = router;