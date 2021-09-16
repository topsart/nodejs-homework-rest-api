const express = require('express');
const router = express.Router();

const { joiUserSchema } = require('../../models/user');
const { validation, controllerWrapper, authenticate } = require('../../middlewares');
const { auth: ctrl } = require('../../controllers');

const userValidationMiddleware = validation(joiUserSchema);

router.post('/signup', userValidationMiddleware, controllerWrapper(ctrl.signup));
router.post('/login', userValidationMiddleware, controllerWrapper(ctrl.login));
router.get('/logout', controllerWrapper(authenticate), controllerWrapper(ctrl.logout));

module.exports = router;