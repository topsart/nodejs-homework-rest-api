const bcrypt = require('bcryptjs');
const { User } = require('../../models');

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Email in use'
      })
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.create({ email, password: hashPassword });
    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Success signup'
    })
  } catch (error) {
    next(error);
  }
};

module.exports = signup;