const { User } = require('../../models');
const { Unauthorized } = require('http-errors');

const updateUserSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;
  const updateSubscription = await User.findByIdAndUpdate(_id, { subscription }, { new: true });
  if (!updateSubscription) {
    throw new Unauthorized();
    }
  res.json({
    status: 'Success',
    code: 200,
    data: updateSubscription
  });
};

module.exports = updateUserSubscription;