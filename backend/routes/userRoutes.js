const express = require('express');
const{check} = require('express-validator');


const userController = require('../controllers/users-controller');

const router = express.Router();

router.post('/login', userController.login);



module.exports = router;