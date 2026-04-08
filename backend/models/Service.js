const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: String,
  category: String,
  phone: String,
  whatsapp: String,
  location: String,
  description: String,
  image: String
});

module.exports = mongoose.model("Service", serviceSchema);