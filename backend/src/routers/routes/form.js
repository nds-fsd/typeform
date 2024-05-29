const express = require('express');
const { getAllForms, getForm, createForm, deleteForm, updateForm } = require('../../controllers/form.controller');
const { Authorization } = require('../../middlewares/Authorization');

const router = express.Router();

router.get('/', Authorization, getAllForms);
router.get('/:id', Authorization, getForm);
router.post('/', createForm);
router.patch('/:id', Authorization, updateForm);
router.delete('/:id', Authorization, deleteForm);

module.exports = router;
