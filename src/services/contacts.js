import Contacts from "../db/models/contact.js";

export const getAllContact = async () => {
  const contacts = await Contacts.find();
  return contacts;
};
export const getContactId = async (contactId) => {
  const contact = await Contacts.findById(contactId);
  return contact;
};
export const createContact = async (payload) => {
  const contact = await Contacts.create(payload);
  return contact;
};
export const updateContact = async (contactId, payload, options = {}) => {
  const contactResult = await Contacts.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    }
  );

  if (!contactResult || !contactResult.value) {
    return null;
  }
  return {
    contact: contactResult.value,
    isNew: Boolean(contactResult?.lastErrorObject?.upserted),
  };
};
export const deleteContact = async (contactId) => {
  const contact = await Contacts.findOneAndDelete({ _id: contactId });
  return contact;
};
