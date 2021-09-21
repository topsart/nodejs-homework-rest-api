const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');
const checkUserInfo = require('./checkUserInfo');
const updateUserSubscription = require('./updateUserSubscription');
const updateAvatar = require('./updateAvatar');
const verify = require('./verify');
const verifyRepeat = require('./verifyRepeat');

module.exports = {
  signup,
  login,
  logout,
  checkUserInfo,
  updateUserSubscription,
  updateAvatar,
  verify,
  verifyRepeat
}