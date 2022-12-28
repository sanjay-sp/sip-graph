const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Register = mongoose.model("user-data", RegisterSchema);

module.exports = Register;
