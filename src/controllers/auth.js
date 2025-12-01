import { loginUser, registerUser } from "../services/auth";
import { MONTH } from "../constants";

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
    httpyOnly: true,
    expires: new Date(Date.now() + MONTH),
  });
  res.cookie("sessionId", session._id, {
    httpyOnly: true,
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
