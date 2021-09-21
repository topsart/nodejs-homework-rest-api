const { NotFound } = require('http-errors');

const { User } = require('../../models');

const verify = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
      throw new NotFound('Пользователь не найден');
    }
    await User.findByIdAndUpdate(user._id, { verifyToken: null, verify: true });
    res.send('Email подтвержден');
};

module.exports = verify;