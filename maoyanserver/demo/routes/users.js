var express = require('express');
var router = express.Router();
var Controllers=require('../controllers/users.js');
var multer = require('multer')
var upload = multer({ dest: 'public/uploads/' })
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',Controllers.login);
router.post('/register',Controllers.register);
router.get('/logout',Controllers.logout);
router.get('/verify',Controllers.verify);
router.get('/getUser',Controllers.getUser);
router.post('/findPassword',Controllers.findPassword);
router.get('/verifyImg',Controllers.verifyImg);
router.post('/uploadUserHead',upload.single('file'),Controllers.uploadUserHead);
module.exports = router;
