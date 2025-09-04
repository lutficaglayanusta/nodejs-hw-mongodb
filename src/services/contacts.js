import { SORT_ORDER } from "../constants/index.js";
import Contacts from "../db/models/contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContact = async ({
  page = 1,
  perPage = 4,
  sortOrder = SORT_ORDER.ASC,
  sortBy = "_id",
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contacts.find();
  const contactsCount = await Contacts.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
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
