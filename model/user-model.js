const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  count: {
    type: Number,
    require: true,
  },
  theatre: {
    type: String,
    require: true,
  },
  time: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  city:{
    type: String,
    require: true,
  },

});

const User = new mongoose.model("User", userSchema);
module.exports = User;
