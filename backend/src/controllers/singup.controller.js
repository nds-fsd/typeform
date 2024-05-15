const User = require('../schemas/user.schema');

const createUser = (req, res) => {
  const body = req.body;
  const email = req.body.email;

  if (!email) {
    res.status(400).json({ error: { register: 'email not recieved' } });
  }
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        res.status(400).json({ email: 'email already regitered' });
      }
      const newUser = {
        email: body.email,
        name: body.name,
        password: body.password,
        createdAt: new Date(),
      };

      newUser.save().then((createdUser) => {
        return res.status(201).json({
          token: createdUser.generateJWT(),
          user: {
            id: createdUser._id,
            email: createdUser.email,
            name: createdUser.name,
            createdAt: createdUser.createdAt,
          },
        });
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error: error });
    });
};

module.exports = {
  createUser,
};
