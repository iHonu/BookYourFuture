import mongoose from "mongoose";
import { body } from "express-validator";

const timeSlotSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true,
    unique: true,
  },
  durationInSeconds: {
    type: Number,
    required: true,
  },
});

// eslint-disable-next-line
mongoose.model("timeSlot", timeSlotSchema);

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: String,

    location: {
      type: String,
      required: true,
    },

    receiverType: {
      type: String,
      required: true,
    },

    sessionSlot: [timeSlotSchema],

    group: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "group",
    },

    student: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("event", eventSchema);

export const validateEvent = [
  body("title", "Title must be at least 6 characters")
    .isLength({ min: 6 })
    .isString(),
  body("description").optional().isString(),

  body("location")
    .isIn(["online", "offline"])
    .withMessage("Location must be 'online' or 'offline'")
    .isString(),

  body("receiverType")
    .isIn(["group", "student"])
    .withMessage("receiverType must be 'group' or 'student'")
    .isString(),

  body("sessionSlot").optional().isArray(),
  body("group").optional(),
  body("student").optional(),
];

export default Event;
