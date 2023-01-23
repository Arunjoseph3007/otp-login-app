const mongoose = require("mongoose");

const connectDB = () =>
  mongoose
    .connect("mongodb://localhost:27017/auth-system", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    })
    .then(() => console.log("Connected to mongoDB.."))
    .catch((e) => console.log("Error connecting to DB", e));

module.exports = connectDB;
