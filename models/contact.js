const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false, timestamps: true });

const joiContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  // favorite: Joi.boolean().required()
});

const Contact = model('contact', contactSchema);

module.exports = { Contact, joiContactSchema };