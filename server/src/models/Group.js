import mongoose from "mongoose";
import { body } from "express-validator";

const groupSchema = new mongoose.Schema(
  {
    numberOfGroupName: {
      type: Number,
      required: true,
      unique: true,
    },

    students: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "user",
    },

    status: {
      type: String,
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

const Group = mongoose.model("group", groupSchema);

export const validateGroup = [
  body("numberOfGroupName")
    .isLength({ min: 1 })
    .withMessage("Group must have at least 1 digits")
    .matches(/^\d+$/)
    .withMessage("Group must consist of numbers only"),
  body("students").optional().isArray(),
  body("status")
    .isString()
    .isIn(["active", "inactive"])
    .withMessage("Status must be 'active' or 'inactive'"),
  body("color").optional().isString(),
];

export const editValidateGroup = [
  body("students").optional().isArray(),
  body("status")
    .isString()
    .isIn(["active", "inactive"])
    .withMessage("Status must be 'active' or 'inactive'"),
];

export default Group;
