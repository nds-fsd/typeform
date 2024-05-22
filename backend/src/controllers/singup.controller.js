const User = require('../schemas/user.schema');

const signUp = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ error: { register: 'email not received' } });
    }
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ error: 'email already registered' });
    }

    const newUser = new User({
      email,
      name,
      password,
      createdAt: new Date(),
    });

    await newUser.save(); 
    //antes de guardarse se encripta la contraseña. El codigo que encripta la contraseña esta en el archivo de 'user.schema.js'(el que pone ).

    const token = newUser.generateJWT(); 
    // el metodo "generateJWT" esta definido en 'user.schema.js'

    return res.status(201).json({
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  signUp,
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
