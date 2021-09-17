const { Contact } = require('../../models');

const removeContact = async (req, res, next) => {
    const { contactId } = req.params;
    const deleteContact = await Contact.findByIdAndDelete(contactId);
    if (!deleteContact) {
      return res.status(404).json({
        "message": "Not found"
      })
    }
    res.json({
      deleteContact
    })
};

module.exports = removeContact;