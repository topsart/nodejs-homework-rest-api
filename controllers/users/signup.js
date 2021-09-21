const gravatar = require('gravatar');
const { Conflict } = require('http-errors');

const { User } = require('../../models');
const { sendMail } = require('../../utils');

const signup = async (req, res) => {
  const { email, password } = req.body;
  const avatarUrl = gravatar.url(email, { s: '250', protocol: 'http' });

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict('Email in use');
  }
  // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const newUser = new User({ email, avatarUrl });
  newUser.createVerifyToken();
  newUser.setPassword(password);  

  const { verifyToken } = newUser;

  const mail = {
    to: email,
    subject: 'Подтверждение регистрации на сайте',
    html: `<a href="http://localhost:3000/api/users/verify/${verifyToken}">Подтвердите регистрацию</a>`
  };

  await sendMail(mail);

  await newUser.save();

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Success signup'
  })
};

module.exports = signup;