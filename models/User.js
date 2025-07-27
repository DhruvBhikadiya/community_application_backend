const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    minlength: 2,
  },
  middleName: {
    type: String,
    trim: true,
    default: "",
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    minlength: 2,
  },
  mobileNumber: {
    type: String,
    required: [true, "Mobile number is required"],
    match: [/^\+\d{1,4}\d{10}$/, "Invalid formatted mobile number"],
    unique: true,
  },
  village: {
    type: String,
    required: [true, "Village is required"],
    trim: true,
  },
  country: {
    type: String,
    required: [true, "Country is required"],
    trim: true,
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: [true, "Blood group is required"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: [true, "Gender is required"],
  },
  role: {
    type: [String],
    enum: ["superAdmin", "Admin", "Pratinidhi", "User"],
    default: ["User"],
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Reject"],
    default: "Pending",
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "Enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  isNri: {
    type: Boolean,
    default: false,
  },
  workSector: {
    type: String,
    required: function () {
      return this.isNri;
    },
  },
  designation: {
    type: String,
    required: function () {
      return this.isNri;
    },
  },
  career: {
    type: String,
    required: function () {
      return this.isNri;
    },
  },
  pr: {
    type: Boolean,
    required: function () {
      return this.isNri;
    },
  },
  workExperience: {
    type: String,
    required: function () {
      return this.isNri;
    },
  },
  city: {
    type: String,
    required: function () {
      return this.isNri;
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);