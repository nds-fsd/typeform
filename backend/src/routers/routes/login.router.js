const express = require('express');
const loginController = require('../../controllers/login.controller');

const router = express.Router();

router.post('/', loginController.login);

// //probablemente esto es un get ya que requiero los datos del usuario
// //falta el schema de login y luego los controlers (ver como usar zod para validar y no tener que crear la lógica)
// //posteriormente debo validar dichos datos contra mi BBDD
// //Establecer un middleware para validar

module.exports = router;
