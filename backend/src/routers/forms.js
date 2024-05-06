const express = require('express');
const formController = require('../controllers/form.controller');
const router = express.Router();

router.get('/form', formController.getAllForms);
//router.get('/form/:id', formController.getForm);
router.post('/form', formController.createForm);
router.patch('/form/:id', formController.getForm);
router.delete('/form/:id', formController.deleteForm);

// // destructuring first (on require)
// const express = require('express');
// const { getAllForms, createForm, deleteForm } = require('../controllers/form.controller');
// const router = express.Router();

// router.get('/form', getAllForms);
// //router.get('/form/:id', getForm);
// router.post('/form', createForm);
// router.patch('/form/:id', getForm);
// router.delete('/form/:id', deleteForm);