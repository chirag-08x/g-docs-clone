const mongoose = require("mongoose");

const db = process.env.MONGODB_URI;

const database = async () =>
  await mongoose
    .connect(db)
    .then(() => console.log("Connected to database"))
    .catch((e) => console.log(e));

module.exports = database;
