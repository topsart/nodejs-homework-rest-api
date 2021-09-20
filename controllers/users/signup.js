const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { Conflict } = require('http-errors');
const { User } = require('../../models');

const signup = async (req, res) => {
  const { email, password } = req.body;  
  const avatarUrl = gravatar.url(email, { s: '250', protocol: 'http' });

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict('Email in use');
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({ email, password: hashPassword, avatarUrl });
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Success signup'
  })
};

module.exports = signup;