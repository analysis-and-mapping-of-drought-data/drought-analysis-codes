const express = require('express');
const route = express.Router();
const ilController = require('../controllers/IllerController');

route.get('/',ilController.getIller);

route.get('/:il_id',ilController.getIller);

module.exports=route;