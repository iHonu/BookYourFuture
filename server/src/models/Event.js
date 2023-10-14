import mongoose from "mongoose";
import { body } from "express-validator";

const timeSlotSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true,
  },
  durationInSeconds: {
    type: Number,
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

// eslint-disable-next-line
const TimeSlot = mongoose.model("timeSlot", timeSlotSchema);

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

    sessionSlot: [timeSlotSchema],

    group: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "group",
    },

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
    .isLength({ min: 3 })
    .isString(),
  body("description").optional().isString(),

  body("location")
    .isIn(["online", "offline"])
    .withMessage("Location must be 'online' or 'offline'")
    .isString(),

  body("sessionSlot").optional().isArray(),
  body("group").optional(),
];

export { Event, TimeSlot };
