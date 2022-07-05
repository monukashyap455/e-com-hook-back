const router = require('express').Router();

// import controllers
const userController = require('../controller/usersController');

router.post('/api/signup', userController.register);
router.post('/api/login', userController.login);



module.exports = router;