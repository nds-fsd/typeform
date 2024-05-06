const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/user', userController.getAllUsers);
router.get('/user/:id', userController.getUser);
router.post('/user', userController.createUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

module.exports = router;
