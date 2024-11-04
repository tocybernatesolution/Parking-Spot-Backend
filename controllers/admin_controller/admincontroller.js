import { v4 as uuidv4 } from "uuid";
import User from "../../models/User.js";
import bcrypt from 'bcrypt'
const generateids = async (req, res) => {
  try {
    const { count } = req.body;
    if (!count || !Number.isInteger(count) || count <= 0) {
      return res.status(400).json({ message: "Invalid count parameter" });
    }

    const generatedIds = [];
    for (let i = 0; i < count; i++) {
      const newId = uuidv4();
      const newUser = new User({ _id: newId });
      await newUser.save();
      generatedIds.push(newId);
    }

    res.status(201).json({
      status: true,
      message: `${count} IDs generated successfully`,
      userIds: generatedIds,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error generating IDs",
      error: error.message,
    });
  }
};

const register = async (req, res) => {
  try {
    req.body.role = "admin";
    req.body.isDataComplete = true;
    const saltRounds=10
    const hashedPassword=await bcrypt.hash(req.body.password,saltRounds);
    req.body.password=hashedPassword;
    let user = await new User(req.body).save();
    return res.status(201).json({
      status: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Error generating IDs",
      error: error.message,
    });
  }
};
export { generateids, register };
