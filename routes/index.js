var express = require('express');
const login = require('./acess/login');


var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/login', login);

module.exports = router;
