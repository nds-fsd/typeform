const User = require('../schemas/user.schema');

const getAllUsers = async (req, res) => {
  const allUsers = await User.find();
  res.json(allUsers);
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};

const createUser = async (req, res) => {
  const body = req.body;

  const data = {
    email: body.email,
    name: body.name,
    password: body.password,
    createdAt: new Date(),
  };

  const newUser = new User(data);

  try {
    console.log('saving user..');
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json(updatedUser);
};

const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.json(user);
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
