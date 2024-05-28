const { jwt } = require('jsonwebtoken');
const User = require('../schemas/user.schema');

const userAuthorization = async (req, res, next) => {
  const authorization = req.headers['authorization'];

  if (!authorization) {
    res.status(401).json({ error: 'Not Authorized, no token' });
  }
  const token = header.split(' ')[1];

  try {
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    next();
    const user = await User.findOne({ email: verifyToken.email });
    req.user = user;
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Not authorized' });
  }
};

module.exports = {
  userAuthorization,
};
