/**
 * In our models we will have validation checkers that should return an array of error messages.
 * This function creates a nice message for the user of our API saying what is wrong.
 */

import { validationResult } from "express-validator";

export default (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  next();
};
