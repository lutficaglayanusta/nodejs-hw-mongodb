import {
  createContact,
  deleteContact,
  getAllContact,
  getContactId,
  updateContact,
} from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import createHttpError from "http-errors";
import { parseSortParams } from "../utils/parseSortParams.js";

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const { sortOrder, sortBy } = parseSortParams(req.query);

  const id = req.user._id;

  const contacts = await getAllContact({
    page,
    perPage,
    sortBy,
    sortOrder,
    id,
  });
  res.status(200).json({
    status: 200,
    message: "Successfully found contacts!",
    data: contacts,
  });
};
export const getContactController = async (req, res) => {
  const { contactId } = req.params;
  const id = req.user._id;
  const contact = await getContactId(contactId, id);
  if (!contact) {
    throw createHttpError(404, "Contact not found");
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};
export const createContactController = async (req, res) => {
  const id = req.user._id;
  const contact = await createContact(req.body, id);

  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data: contact,
  });
};
export const patchContactController = async (req, res) => {
  const { contactId } = req.params;

  const id = req.user._id;

  const contact = await updateContact(contactId, req.body, id);

  if (!contact) {
    throw createHttpError(404, "Contact not found");
  }

  res.status(200).json({
    status: 200,
    message: "Successfully patched a contact!",
    data: contact,
  });
};
export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;

  const id = req.user._id;

  const contact = await deleteContact(contactId,id);
  if (!contact) {
    throw createHttpError(404, "Contact not found");
  }
  res.status(204).send();
};
