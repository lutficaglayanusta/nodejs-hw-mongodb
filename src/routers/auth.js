import { Router } from "express";
import {
  loginUserController,
  registerUserController,
} from "../controllers/auth";
import { loginUserSchema, registerUserSchema } from "../validation/auth";
import { ctrlWrapper } from "../utils/ctrlWrapper";
import { validateBody } from "../middlewares/validateBody";

const router = Router();

router.post(
  "/register",
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController)
);
router.post(
  "/login",
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController)
);

export default router;
