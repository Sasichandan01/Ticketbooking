const User = require("../model/user-model");

const home = async (req, res) => {
  try {
    res.status(200).send("home page");
  } catch (error) {
    console.log(error);
  }
};
const contact = async (req, res) => {
  try {
    const {
      username,
      email,
      
      title,
      
      count,
      theatre,
      time,
      date,
      city
    } = req.body;
    const userCreated = await User.create({
      username,
      email,
      
      title,
      
      count,
      theatre,
      time,
      date,
      city
    });
    res.status(200).json({ message: req.body });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { home, contact };
