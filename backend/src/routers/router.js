const express = require('express');
const formRouter = require('../routers/routes/form.js');
const userRouter = require('../routers/routes/user.router.js');
const signUpRouter = require('./routes/signup.router.js');
const loginRouter = require('./routes/login.router.js');
const formAnswerRouter = require('./routes/formAnswer.router.js');

const router = express.Router();

router.use('/form', formRouter);
router.use('/formAnswers', formAnswerRouter);
router.use('/user', userRouter);
router.use('/signup', signUpRouter);
router.use('/login', loginRouter);

module.exports = router;
