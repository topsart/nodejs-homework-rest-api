const express = require('express');
const router = express.Router();

const { joiContactSchema } = require('../../models/contact');
const { validation, controllerWrapper, authenticate } = require('../../middlewares');
const ctrl = require('../../controllers/contacts');

const validationMiddleware = validation(joiContactSchema);

router.get('/', controllerWrapper(authenticate), controllerWrapper(ctrl.listContacts));

router.get('/:contactId', controllerWrapper(ctrl.getContactById));

router.post('/', controllerWrapper(authenticate), validationMiddleware, controllerWrapper(ctrl.addContact));

router.delete('/:contactId', controllerWrapper(ctrl.removeContact));

router.put('/:contactId', validationMiddleware, controllerWrapper(ctrl.updateContact));

router.patch('/:contactId/favorite', controllerWrapper(ctrl.updateStatusContact));

module.exports = router;
