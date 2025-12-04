import { SORT_ORDER } from "../constants/index.js";
import Contacts from "../db/models/contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContact = async ({
  page = 1,
  perPage = 4,
  sortOrder = SORT_ORDER.ASC,
  sortBy = "_id",
  id,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contacts.find({ userId: id });
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
export const getContactId = async (contactId, id) => {
  const contact = await Contacts.findOne({ _id: contactId, userId: id });
  return contact;
};
export const createContact = async (payload, id) => {
  const contact = await Contacts.create({ ...payload, userId: id });
  return contact;
};
export const updateContact = async (contactId, payload, id, options = {}) => {
  const contactResult = await Contacts.findOneAndUpdate(
    { _id: contactId, userId: id },
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
export const deleteContact = async (contactId, id) => {
  const contact = await Contacts.findOneAndDelete({
    _id: contactId,
    userId: id,
  });
  return contact;
};
