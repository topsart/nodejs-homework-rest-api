const { BadRequest } = require('http-errors');
const { sendMail } = require('../../utils');

const { User } = require('../../models');

const verifyRepeat = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequest('Missing required field email')
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequest('Wrong email');
  }

  if (user.verify) {
    throw new BadRequest('Verification has already been passed');
  }

  const mail = {
    to: email,
    subject: 'Подтверждение регистрации на сайте',
    html: `<a href="http://localhost:3000/api/users/verify/${user.verifyToken}">Подтвердите регистрацию</a>`
  };

  await sendMail(mail);

  res.send('Verification email sent');
};

module.exports = verifyRepeat;