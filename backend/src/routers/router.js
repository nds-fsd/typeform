const express = require('express');
const formRouter = require('./routes/form.js');
const userRouter = require('./routes/user.router');
const signUpRouter = require('./routes/signup.router.js');

const router = express.Router();

router.use('/form', formRouter);
router.use('/user', userRouter);
router.use('/signup', signUpRouter);

module.exports = router;
