import {
  loginUser,
  logoutUser,
  refreshUsersSession,
  registerUser,
  resetPasswordToken,
  resetToken,
} from "../services/auth.js";
import { MONTH } from "../constants/index.js";

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: "Successfully registered a user!",
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + MONTH),
  });
  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + MONTH),
  });
  res.status(200).json({
    status: 200,
    message: "Successfully logged in an user!",
    data: {
      accessToken: session.accessToken,
    },
  });
};

const setupSession = (res, session) => {
  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + MONTH),
  });
  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + MONTH),
  });
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: "Successfully refreshed a session!",
    data: {
      accessToken: session.accessToken,
    },
  });
};
export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }
  res.clearCookie("sessionId");
  res.clearCookie("refreshToken");

  res.status(204).send();
};
export const resetPasswordController = async (req, res) => {
  await resetToken(req.body.email);

  res.status(200).json({
    status: 200,
    message: "Reset password email was successfully sent!",
    data: {},
  });
};

export const resetTokenController = async (req, res) => {
  await resetPasswordToken(req.body),
    res.status(200).json({
      message: "Password was successfully reset!",
      status: 200,
      data: {},
    });
};
