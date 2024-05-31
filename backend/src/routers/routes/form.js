const express = require('express');
const { getAllForms, getForm, createForm, deleteForm, updateForm } = require('../../controllers/form.controller');
const { Authorization } = require('../../middlewares/Authorization');
const { validateRequest } = require('zod-express-middleware');
const { CreateFormBodyValidation } = require('../../validators/form.validators');

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

// router.get('/', Authorization, getAllForms);
// router.get('/:id', Authorization, getForm);
// router.post('/', Authorization, validateRequest({
//   body: CreateFormBodyValidation
// }), createForm);
// router.patch('/:id', Authorization, validateRequest({
//   body: CreateFormBodyValidation
// }), updateForm);
// router.delete('/:id', Authorization, deleteForm);

module.exports = router;
