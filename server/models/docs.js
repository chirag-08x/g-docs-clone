const mongoose = require("mongoose");

const docsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  docs: {
    type: [
      {
        name: {
          type: String,
          default: "Untitled document",
        },
        content: {
          type: String,
          default: "",
        },
      },
    ],
  },
});

module.exports = mongoose.model("Docs", docsSchema);
