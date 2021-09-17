const express = require('express');
const router = express.Router();

const { joiUserSchema } = require('../../models/user');
const { validation, controllerWrapper, authenticate, upload } = require('../../middlewares');
const { users: ctrl } = require('../../controllers');

const userValidationMiddleware = validation(joiUserSchema);

router.post('/signup', userValidationMiddleware, controllerWrapper(ctrl.signup));
router.post('/login', userValidationMiddleware, controllerWrapper(ctrl.login));
router.get('/logout', controllerWrapper(authenticate), controllerWrapper(ctrl.logout));
router.get('/current', controllerWrapper(authenticate), controllerWrapper(ctrl.checkUserInfo));
router.patch('/', controllerWrapper(authenticate), userValidationMiddleware, controllerWrapper(ctrl.updateUserSubscription));
router.patch('/avatars', controllerWrapper(authenticate), upload.single('avatar'), controllerWrapper(ctrl.updateAvatar));

module.exports = router;