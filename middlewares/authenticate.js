const jwt = require('jsonwebtoken');
const { Unauthorized } = require('http-errors');

const { User } = require('../models');

const { SECRET_KEY } = process.env;

const authenticate = async (req, _, next) => {
    const [bearer, token] = req.headers.authorization.split(' ');
    if (bearer !== 'Bearer') {
      throw new Unauthorized();
    };
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ token });
    if (!user) {
      throw new Unauthorized();
    }
    req.user = user;
    next();
};

module.exports = authenticate;