const express = require('express');
const singUpController = require('../controllers/user.controller');

const router = express.Router();

router.post('/', singUpController.createUser);

module.exports = router;
