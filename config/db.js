const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const URL = process.env.DB;
// const USERNAME = process.env.DB_USERNAME;
// const PASSWORD = process.env.DB_PASSWORD;

const Connection = () => {
  const DB_URI = URL;
  try {
    mongoose.connect(DB_URI, { useNewUrlParser: true });
    mongoose.set("strictQuery", false);
    console.log("Database connected sucessfully");
  } catch (error) {
    console.log("Error while connecting with the database ", error.message);
  }
};

module.exports = Connection;
