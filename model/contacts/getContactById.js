const listContacts = require('./listContacts');

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts()
    const selectContact = contacts.find(item => item.id == contactId)
    if (!selectContact) {
      return null
    }
    return selectContact
  } catch (error) {
    throw error
  }
};

module.exports = getContactById;