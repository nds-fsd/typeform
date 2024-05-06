const express = require('express');
const formController = require('../controllers/form.controller');

const router = express.Router();

router.get('/', formController.getAllForms);
router.get('/:id', formController.getForm);
router.post('/', formController.createForm);
//router.patch('/:id', formController.getForm);
router.delete('/:id', formController.deleteForm);

module.exports = router;


// // destructuring first (on require)
// const express = require('express');
// const { getAllForms, createForm, deleteForm } = require('../controllers/form.controller');
// const router = express.Router();

// router.get('/form', getAllForms);
// //router.get('/form/:id', getForm);
// router.post('/form', createForm);
// router.patch('/form/:id', getForm);
// router.delete('/form/:id', deleteForm);