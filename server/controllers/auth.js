import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/user.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new user({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: 0,
      impressions: 0,
    });

    const userSaved = await newUser.save();

    res.status(201).json(userSaved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/* login */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const requiredUser = await user.findOne({ email: email });

    if (!requiredUser) {
      return res.status(400).json({ msg: "Requested user does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      requiredUser.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ msg: "Wrong password for requested user" });
    }

    const sessionToken = jwt.sign(
      { id: requiredUser._id },
      process.env.JWT_SECRET
    );

    delete requiredUser.password;

    res.status(200).send({ sessionToken, requiredUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
