const express = require('express');
const { getAllForms, getForm, createForm, deleteForm, updateForm } = require('../controllers/form.controller');

const router = express.Router();

router.get('/', getAllForms);
router.get('/:id', getForm);
router.post('/', createForm);
router.patch('/:id', updateForm);
router.delete('/:id', deleteForm);

module.exports = router;
