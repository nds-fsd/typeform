const express = require('express');
const formRouter = require('./form')

const router = express.Router();

router.use('/form', formRouter);

module.exports = router;