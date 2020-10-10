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

router.get('/production', function(req, res, next) {
  res.render('production/production', { title: 'Express' });
});

router.get('/program', function(req, res, next) {
  res.render('program/program', { title: 'Express' });
});

router.get('/youtube', function(req, res, next) {
  res.render('youtube/youtube', { title: 'Express' });
});


module.exports = router;
