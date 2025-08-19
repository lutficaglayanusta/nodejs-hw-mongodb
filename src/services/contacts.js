import Contacts from "../db/models/contact.js";

export const getAllContact = async () => {
  const contacts = await Contacts.find();
  return contacts;
};
export const getContactId = async (contactId) => {
  const contact = await Contacts.findById(contactId);
  return contact;
};
