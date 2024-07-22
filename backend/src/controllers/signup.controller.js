const { sendWelcomeEmail } = require('../service/email.service.js');
const User = require('../schemas/user.schema.js');

const signUp = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ error: { register: 'Email not received' } });
    }
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const newUser = new User({
      email,
      name,
      password,
      createdAt: new Date(),
    });

    await newUser.save();
    //antes de guardarse se encripta la contraseña. El codigo que encripta la contraseña esta en el archivo de 'user.schema.js'.

    const token = newUser.generateJWT();
    // el metodo "generateJWT" esta definido en 'user.schema.js'

    // acá va la función sabre mail de bienvenida
    await sendWelcomeEmail(email, name)

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