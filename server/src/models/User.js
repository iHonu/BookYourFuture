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
      type: [mongoose.Schema.Types.ObjectId],
      ref: "group",
    },

    gitHub: String,

    linkedIn: String,

    facebook: String,

    telegram: String,

    avatarUrl: String,

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
  body("group", "Group field is required").optional(),
  body("admin").optional().isBoolean(),
];

export const editValidationUser = [
  body("firstName", "First name must be at least 3 characters").isLength({
    min: 3,
  }),
  body("lastName", "Last name must be at least 3 characters").isLength({
    min: 3,
  }),
  body("group", "Group field is required").optional(),
];

export const loginValidationUser = [
  body("email", "Email must be valid").isEmail(),
  body("password", "Password must be at least 8 characters").isLength({
    min: 8,
  }),
];

export const changePasswordValidationUser = [
  body("oldPassword", "Old password is required").notEmpty(),
  body("newPassword", "New password must be at least 8 characters").isLength({
    min: 8,
  }),
  body(
    "confirmPassword",
    "Confirm password must be at least 8 characters"
  ).isLength({
    min: 8,
  }),
];

export default User;
