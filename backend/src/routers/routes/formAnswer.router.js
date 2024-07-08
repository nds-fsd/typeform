const express = require('express');
const { postAnswer, getAnswers } = require('../../controllers/formAnswer.controller');

const router = express.Router();

router.post('/', postAnswer);
router.get('/', getAnswers);

module.exports = router;
