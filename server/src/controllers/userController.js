import UserModel from "../models/User.js";
import GroupModel from "../models/Group.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateRandomPassword, sendEmail } from "../util/password-logic.js";
import { v2 as cloudinary } from "cloudinary";

export const userMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const { passwordHash, ...userData } = user._doc;

    res.status(200).json(userData);
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const all = async (req, res) => {
  try {
    const users = await UserModel.find().populate("group").exec();

    if (!users) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const usersWithoutPassword = users.map((user) => {
      const { passwordHash, ...allUsersData } = user._doc;
      return allUsersData;
    });

    res.status(200).json({ success: true, usersData: usersWithoutPassword });
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const getOne = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = await UserModel.findById(userId).populate("group").exec();

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Exclude passwordHash from the response
    const { passwordHash, ...userData } = user._doc;

    res.status(200).json({ success: true, userData });
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const remove = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    UserModel.findByIdAndDelete(
      {
        _id: userId,
      },
      (err, user) => {
        if (err) {
          return res.status(500).json({
            message: "Can`t delete user",
          });
        }
        if (!user) {
          return res.status(404).json({
            message: "User not found",
          });
        }
      }
    );

    if (!userId) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const edit = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Update user properties
    const {
      firstName,
      lastName,
      phone,
      city,
      street,
      houseNumber,
      zipCode,
      gitHub,
      linkedIn,
      facebook,
      telegram,
      avatarUrl,
    } = req.body;

    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone;
    user.city = city;
    user.street = street;
    user.houseNumber = houseNumber;
    user.zipCode = zipCode;
    user.gitHub = gitHub;
    user.linkedIn = linkedIn;
    user.facebook = facebook;
    user.telegram = telegram;
    user.avatarUrl = avatarUrl;

    await user.save();

    const { passwordHash, ...userData } = user._doc;

    res.status(200).json({ userData, success: true });
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const editGroupUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { group } = req.body;

    if (!group) {
      // If group is not provided, remove the student from their previous group
      if (user.group) {
        const previousGroup = await GroupModel.findById(user.group);
        if (previousGroup) {
          previousGroup.students = previousGroup.students.filter(
            (studentId) => studentId.toString() !== userId
          );
          await previousGroup.save();
        }
        user.group = []; // Set the user's group to null
      }
    } else {
      const newGroup = await GroupModel.findById(group);
      if (!newGroup) {
        return res.status(404).json({
          message: "Group not found",
        });
      }

      // Check if the student is already in the group
      const existingStudent = newGroup.students.includes(userId);
      if (existingStudent) {
        return res.status(400).json({
          message: "This student is already added to the group.",
        });
      }

      // Remove the student from their previous group if they had one
      if (user.group) {
        const previousGroup = await GroupModel.findById(user.group);
        if (previousGroup) {
          previousGroup.students = previousGroup.students.filter(
            (studentId) => studentId.toString() !== userId
          );
          await previousGroup.save();
        }
      }

      newGroup.students.push(userId);
      user.group = group;
      await newGroup.save();
    }

    await user.save();

    const { passwordHash, ...userData } = user._doc;

    res.status(200).json({ userData, success: true });
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const password = req.body.newPassword.toString();
    const salt = await bcrypt.genSalt(10); // salt
    const hash = await bcrypt.hash(password, salt); // hash password

    user.passwordHash = hash;
    await user.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.KEY_JWT_AUTH, // secret code
      { expiresIn: "30d" } // time life token 30 days
    );

    res.status(200).json({ success: true, token });
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    // Generate a new random password
    const password = generateRandomPassword();

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Find the user based on the provided email
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.passwordHash = hash;
    await user.save();

    // Generate a new JWT token
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.KEY_JWT_AUTH, // Your secret key
      { expiresIn: "30d" } // Token expiration time
    );

    // Send the new password to the user's email
    await sendEmail(
      req.body.email, // Use the provided email, not newUser.email
      "New Password for BookYourFuture",
      `Your new password: ${password}\nBYF Team`
    );

    // Respond with the updated user data and the new token
    const { passwordHash, ...userData } = user._doc;
    res.status(200).json({ ...userData, token, success: true });
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
    if (err.code === 11000) {
      res.status(400).json({ message: "Duplicate email" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const upload = async (req, res) => {
  try {
    cloudinary.config({
      cloud_name: "dxmq1hceo",
      api_key: "997517822879569",
      api_secret: "3WtsprLg-HLP3V24G8RRN2okhh0",
    });

    const avatarUrl = req.body.avatarUrl;

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(avatarUrl);

    // Update the avatarUrl field in the userSchema
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.userId,
      { avatarUrl: result.secure_url },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      url: result.secure_url,
    });
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
