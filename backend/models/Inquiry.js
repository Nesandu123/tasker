const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
  name: String,
  phone: String,
  message: String,
  serviceProviderId: String
});

module.exports = mongoose.model("Inquiry", inquirySchema);