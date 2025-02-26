const { Contact } = require('../../models');

const updateStatusContact = async (req, res, next) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const updateContact = await Contact.findByIdAndUpdate(contactId, {favorite}, {new: true});
    if (!updateContact) {
      return res.status(404).json({
        "message": "Not found"
      })
    }
    res.json({
      updateContact
    })
};

module.exports = updateStatusContact;