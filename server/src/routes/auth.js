import express from "express";
import * as authController from "../controllers/authController.js";
import { loginValidationUser, registerValidationUser } from "../models/User.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  registerValidationUser,
  validationErrorMessage,
  authController.register
);
authRouter.post(
  "/login",
  loginValidationUser,
  validationErrorMessage,
  authController.login
);

export default authRouter;
