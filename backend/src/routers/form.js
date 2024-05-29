const { CreateFormBodyValidation } = require('../validators/form.validators');

const express = require('express');
const { getAllForms, getForm, createForm, deleteForm, updateForm } = require('../controllers/form.controller');
const { validateRequest } = require('zod-express-middleware');

const router = express.Router();

router.get('/', getAllForms);
router.get('/:id', getForm);
router.post('/', validateRequest({
  body: CreateFormBodyValidation
}), createForm);
router.patch('/:id', validateRequest({
  body: CreateFormBodyValidation
}), updateForm);
router.delete('/:id', deleteForm);

module.exports = router;
