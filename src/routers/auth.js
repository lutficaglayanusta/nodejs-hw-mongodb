import { Router } from "express";
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
  resetPasswordController,
  resetTokenController,
} from "../controllers/auth.js";
import {
  loginUserSchema,
  registerUserSchema,
  resetPassword,
  resetPasswordSchema,
} from "../validation/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";

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

router.post("/refresh", ctrlWrapper(refreshUserSessionController));

router.post("/logout", ctrlWrapper(logoutUserController));

router.post(
  "/send-reset-email",
  validateBody(resetPassword),
  ctrlWrapper(resetPasswordController)
);
router.post(
  "/reset-password",
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetTokenController)
);

export default router;
