const express = require('express');
const formsRouter = require('./forms')

const router = express.Router();

router.use('/form', formsRouter);


module.exports = router;
