var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/member', function(req, res, next) {
  res.render('member/member', { title: 'Express' });
});

router.get('/board', function(req, res, next) {
  res.render('board/board', { title: 'Express' });
});

router.get('/notice', function(req, res, next) {
  res.render('notice/notice', { title: 'Express' });
});


module.exports = router;
