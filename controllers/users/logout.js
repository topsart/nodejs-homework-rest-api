const { User } = require('../../models');

const logout = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { token: null });
  res.json({
    status: 'success',
    code: 204,
    message: 'Success logout'
  })
};

module.exports = logout;