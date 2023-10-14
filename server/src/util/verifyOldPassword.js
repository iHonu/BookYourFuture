import UserModel from "../models/User.js";
import bcrypt from "bcrypt";

export default async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify old password
    const isPasswordValid = await bcrypt.compare(
      req.body.oldPassword,
      user.passwordHash
    );
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid old password" });
    }

    // Check if the new password matches the confirm password
    if (req.body.newPassword !== req.body.confirmPassword) {
      return res
        .status(400)
        .json({ error: "New password and confirm password do not match" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};
