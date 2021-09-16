const express = require('express');
const router = express.Router();

const { joiContactSchema } = require('../../models/contact');
const { validation, controllerWrapper, authenticate } = require('../../middlewares');
const ctrl = require('../../controllers/contacts');

const validationMiddleware = validation(joiContactSchema);

router.get('/', controllerWrapper(authenticate), controllerWrapper(ctrl.listContacts));

router.get('/:contactId', ctrl.getContactById);

router.post('/', controllerWrapper(authenticate), validationMiddleware, controllerWrapper(ctrl.addContact));

router.delete('/:contactId', ctrl.removeContact);

router.put('/:contactId', validationMiddleware, ctrl.updateContact);

router.patch('/:contactId/favorite', ctrl.updateStatusContact);

module.exports = router;
