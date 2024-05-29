const jwt = require('jsonwebtoken');
const User = require('../schemas/user.schema');

const Authorization = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: 'Not Authorized, no token' });
  }
  const token = authorization.split(' ')[1];

  try {
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: verifyToken.email });
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Not authorized' });
  }
};

module.exports = {
  Authorization,
};
