import UserModel from "../models/User.js";
import GroupModel from "../models/Group.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateRandomPassword, sendEmail } from "../util/password-logic.js";

export const register = async (req, res) => {
  try {
    const password = generateRandomPassword();
    const salt = await bcrypt.genSalt(10); // salt
    const hash = await bcrypt.hash(password, salt); // hash password

    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      passwordHash: hash,
      group: req.body.group || [],
    };

    const user = await UserModel.create(newUser);

    if (user.group && user.group.length > 0) {
      const groupId = user.group[0].toString();
      // Find all groups with the specified IDs
      const group = await GroupModel.findById(groupId);
      // Assuming there can be multiple groups with the provided IDs
      group.students.push(user._id);
      await group.save();
    } else {
      // Handle the case where user.group is empty or undefined
      user.group = [];
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.KEY_JWT_AUTH, // secret code
      { expiresIn: "30d" } // time life token 30 days
    );

    const { passwordHash, ...userData } = user._doc;

    await sendEmail(
      newUser.email,
      "Welcome to BookYouFuture",
      `Dear Valued Member,

      Welcome to BookYourFuture, your platform for student-mentor connections! We are thrilled to have you join our community. To get started on your journey with us, please find below your login credentials:
      
      Email: ${newUser.email}
      Password: ${password}
      
      Please make sure to keep this information secure and do not share your password with anyone. If you ever forget your password, you can easily reset it through our platform. If you have any questions or encounter any issues during your registration or while using our platform, our dedicated BYF Team is here to assist you. Feel free to reach out to us at byfhyf23@gmail.com.
      Thank you for choosing BookYourFuture. We look forward to facilitating meaningful connections on our platform. Happy mentoring and learning!
      
      Warm regards,
      BYF Team`
    );

    res.status(200).json({ ...userData, token, success: true });
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
    if (err.code === 11000) {
      // Duplicate key error
      res.status(400).json({ message: "Duplicate email" });
    } else {
      res.status(500).json({ message: "No Auth, sorry error...." });
    }
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const isValidPass = await bcrypt.compareSync(
      req.body.password,
      user._doc.passwordHash
    ); // only string

    if (!isValidPass) {
      return res.status(403).json({
        message: "Wrong password or email", // check in errors, password or email
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.KEY_JWT_AUTH, // secret code
      { expiresIn: "30d" } // time life token 30 days
    );

    const { passwordHash, ...userData } = user._doc;

    res.status(200).json({ ...userData, token, success: true });
  } catch (err) {
    //eslint-disable-next-line
    console.error(err);
    res.status(500).json({
      message: "No Auth, sorry error....",
    });
  }
};
