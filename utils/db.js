const mongoose = require("mongoose");
// const URI =
//   "mongodb+srv://bhargavsasichandan:YDKZz9eUPqfvVRLA@cluster0.pq8mxaz.mongodb.net/book_ticket?retryWrites=true&w=majority";
  
const URI = process.env.MONGODB_URI;
const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("connection succesfull to db");
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
};

module.exports = connectDb;
