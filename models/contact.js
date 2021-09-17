const { Schema, Types, model } = require('mongoose');
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
  owner: {
    type: Types.ObjectId,
    ref: 'user',
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