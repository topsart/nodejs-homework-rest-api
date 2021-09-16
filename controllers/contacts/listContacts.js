const { Contact } = require('../../models');

const listContacts = async (req, res) => {
  const result = await Contact.find({ owner: req.user._id }).populate('owner', 'email');
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  });
};

module.exports = listContacts;