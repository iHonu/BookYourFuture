import mongoose from "mongoose";
import { body } from "express-validator";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    phone: String,

    city: String,

    street: String,

    houseNumber: String,

    zipCode: String,

    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },

    gitHub: String,

    linkedIn: String,

    avatarUrl: String,

    status: {
      type: String,
      enum: {
        values: ["active", "inactive"],
      },
    },

    admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

export const registerValidationUser = [
  body("firstName", "First name must be at least 3 characters").isLength({
    min: 3,
  }),
  body("lastName", "Last name must be at least 3 characters").isLength({
    min: 3,
  }),
  body("email", "Email must be valid").isEmail().isString(),
  body("password", "Password must be at least 6 characters").isLength({
    min: 6,
  }),
  body("group", "Group field is required").exists(),
  body("admin").optional().isBoolean(),
];

export const editValidationUser = [
  body("firstName", "First name must be at least 3 characters").isLength({
    min: 3,
  }),
  body("lastName", "Last name must be at least 3 characters").isLength({
    min: 3,
  }),
  body("group", "Group field is required").exists(),
  body("admin").optional().isBoolean(),
];

export const loginValidationUser = [
  body("email", "Email must be valid").isEmail(),
  body("password", "Password must be at least 6 characters").isLength({
    min: 6,
  }),
];

export const changePasswordValidationUser = [
  body("oldPassword", "Old password is required").notEmpty(),
  body("newPassword", "New password must be at least 6 characters").isLength({
    min: 6,
  }),
];

export default User;
