const { Contact } = require('../../models');

const updateContact = async (req, res, next) => {
    const { contactId } = req.params;
    const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!updateContact) {
      return res.status(404).json({
        "message": "Not found"
      })
    }
    res.json({
      updateContact
    })
};

module.exports = updateContact;