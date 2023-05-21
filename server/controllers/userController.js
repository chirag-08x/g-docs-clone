const Users = require("../models/user");
const Docs = require("../models/docs");

const addNewUser = async (req, res) => {
  try {
    const userAlreadyExists = await Users.findOne({ email: req.body.email });
    if (userAlreadyExists) {
      return res.status(208).json({
        success: false,
        message: "User Already Exists",
      });
    } else {
      await Users.create(req.body);
      await Docs.create({ email: req.body.email, docs: [] });
      res.status(201).json({
        success: true,
        message: "User successfully created",
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addNewUser,
};
