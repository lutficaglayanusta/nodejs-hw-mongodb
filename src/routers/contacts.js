import { Router } from "express";
import { createContactController, deleteContactController, getContactController, getContactsController, patchContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { isValidId } from "../middlewares/isValidId.js";

const router = Router();

router.get("/",ctrlWrapper(getContactsController));
router.get("/:contactId",isValidId,ctrlWrapper(getContactController));
router.post("/", validateBody(createContactSchema),ctrlWrapper(createContactController));
router.patch("/:contactId", validateBody(updateContactSchema),ctrlWrapper(patchContactController));
router.delete("/:contactId",ctrlWrapper(deleteContactController));

export default router;