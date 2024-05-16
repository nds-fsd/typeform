const express = require('express');
const singUpController = require('../controllers/singup.controller');

const router = express.Router();

router.post('/', singUpController.register);

module.exports = router;
