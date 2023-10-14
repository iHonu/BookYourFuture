import express from "express";
import * as eventController from "../controllers/eventController.js";
// import checkAuth from "../util/checkAuth.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import { validateEvent } from "../models/Event.js";

const eventRouter = express.Router();

eventRouter.get("/all", eventController.all);
eventRouter.get("/:id", eventController.getOne);
eventRouter.get("/all/:studentId", eventController.findTimeSlotByStudentId);

eventRouter.post(
  "/add",
  // checkAuth,
  validateEvent,
  validationErrorMessage,
  eventController.add
);

eventRouter.delete(
  "/:id",
  // checkAuth,
  eventController.remove
);

eventRouter.patch(
  "/edit/:id",
  // checkAuth,
  validateEvent,
  validationErrorMessage,
  eventController.edit
);

eventRouter.post(
  "/bookTime/addStudent/:sessionId",
  // checkAuth,
  eventController.bookSession
);

eventRouter.delete(
  "/bookTime/deleteStudent/:sessionId",
  eventController.deleteStudentFromSessionSlot
);

export default eventRouter;
