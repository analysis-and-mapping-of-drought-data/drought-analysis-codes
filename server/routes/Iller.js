const express = require('express');
const router = express.Router();
const ilController = require('../controllers/IllerController');

router.get('/', ilController.getAllIller);
router.get('/:plaka', ilController.getIlWithId);

module.exports = router;
