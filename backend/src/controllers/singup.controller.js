const User = require('../schemas/user.schema');

const register = (req, res) => {
  const body = req.body;
  const email = req.body.email;

  if (!email) {
    res.status(400).json({ error: { register: 'email not received' } });
  }
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        res.status(400).json({ email: 'email already registered' });
      }
      console.log('pruebaaaaa');

      const data = {
        email: body.email,
        name: body.name,
        password: body.password,
        createdAt: new Date(),
      };

      const newUser = new User(data);

      newUser
        .save()
        .then((createdUser) => {
          return res.status(201).json({
            token: createdUser.generateJWT(),
            user: {
              id: createdUser._id,
              email: createdUser.email,
              name: createdUser.name,
              createdAt: createdUser.createdAt,
            },
          });
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ error: 'Error saving user' });
        });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error: 'Error finding user' });
    });
};

module.exports = {
  register,
};

// backedn - crear endpoint para registrarnos == recoger datos del usuarios que vienen en el body y validar que los datos son correctos
//encriptar la contraseña y guardar los datos en la base de datos
//con el id del nuevo usuario firmar un token con el jsonwebtokens
//responder a la peticion con le token en el body.

//forntend
// crear el formulario
// en onSubmit enviar un post a la ruta que he creado antes
// si el servidor no respionde 200 enviar error
// almacenar el token en local storage
//redirigir a la pagina /home
