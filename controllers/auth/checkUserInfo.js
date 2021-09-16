const { Unauthorized } = require('http-errors');

const checkUserInfo = async (req, res) => {
  const { email, subscription } = req.user;
  const user = req.user;
  if (!user) {
    throw new Unauthorized();
  }
  return res.json({
    status: 'success',
    code: 200,
    data: {
      email,
      subscription
    }
  })
};

module.exports = checkUserInfo;