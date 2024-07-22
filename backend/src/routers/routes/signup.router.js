const express = require('express');
const signUpController = require('../../controllers/signup.controller');

const router = express.Router();

router.post('/', signUpController.signUp);

module.exports = router;