const bcrypt = require('bcryptjs');
const { BadRequest } = require('http-errors');
const { User } = require('../../models');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequest('Wrong email');
  }
  const hashPassword = user.password;
  const compareResult = bcrypt.compareSync(password, hashPassword);
  if (!compareResult) {
    throw new BadRequest('Wrong password');
  }
  const token = 'asdfasdfa.dsfasdf.afsdfasdf';
  res.json({
    token
  });
};

module.exports = login;