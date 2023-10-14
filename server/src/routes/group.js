import express from "express";
import * as groupController from "../controllers/groupController.js";
import { editValidateGroup, validateGroup } from "../models/Group.js";
// import checkAuth from "../util/checkAuth.js";
import validationErrorMessage from "../util/validationErrorMessage.js";

const groupRouter = express.Router();

groupRouter.get("/all", groupController.all);
groupRouter.get("/:id", groupController.getOne);

groupRouter.post(
  "/add",
  // checkAuth,
  validateGroup,
  validationErrorMessage,
  groupController.add
);

groupRouter.delete(
  "/:id",
  // checkAuth,
  groupController.remove
);

groupRouter.patch(
  "/edit/:id",
  // checkAuth,
  editValidateGroup,
  validationErrorMessage,
  groupController.edit
);

export default groupRouter;
