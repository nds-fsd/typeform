const express = require('express');
const formRouter = require('./form');

const userRouter = require('./user.router');

const router = express.Router();
router.use('/form', formRouter);
router.use('/user', userRouter);

module.exports = router;
