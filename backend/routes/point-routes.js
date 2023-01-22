const express = require('express');

const pointController = require('../controllers/point-controllers');

const router = express.Router();

router.get('/pointCords', pointController.getCoordinates);


module.exports = router;