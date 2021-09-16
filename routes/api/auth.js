const express = require('express');
const router = express.Router();

const { joiUserSchema } = require('../../models/user');
const { validation } = require('../../middlewares');
const { auth: ctrl } = require('../../controllers');

const userValidationMiddleware = validation(joiUserSchema);

router.post('/signup', userValidationMiddleware, ctrl.signup);
router.post('/login', userValidationMiddleware, ctrl.login);
// router.get('/logout', ctrl.logout);

module.exports = router;