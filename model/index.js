const fs = require('fs/promises')
// const contacts = require('./contacts.json')
const path = require('path')
const { v4 } = require('uuid')

const contactsPath = path.join(__dirname, './contacts.json')
const updateContacts = require('./updateContacts')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)
    return contacts
  } catch (error) {
    throw error
  }
}

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
}

const updateContact = async (contactId, updateInfo) => {
  try {
    const contacts = await listContacts()
    const idx = contacts.findIndex(item => item.id == contactId)
    if (idx === -1) {
      return null
    }
    contacts[idx] = { ...contacts[idx], ...updateInfo }
    await updateContacts(contacts)
    return contacts[idx]
  } catch (error) {
    throw error
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts()
    const idx = contacts.findIndex(item => item.id == contactId)
    if (idx === -1) {
      return null
    }
    const newContacts = contacts.filter(item => item.id !== contactId)
    await updateContacts(newContacts)
    return contacts[idx]
  } catch (error) {
    throw error
  }
}

const addContact = async ({ name, email, phone }) => {
  try {
    const newContact = { id: v4(), name, email, phone }
    const contacts = await listContacts()
    contacts.push(newContact)
    await updateContacts(contacts)
    return newContact
  } catch (error) {
    throw error
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
