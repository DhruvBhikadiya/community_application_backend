const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const { userValidationSchema } = require('../config/validation.js');

const registerUser = async (req, res) => {
  const { error } = userValidationSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((err) => err.message);
    return res.status(400).json({ msg: "Validation failed", errors });
  }

  try {
    let {
      firstName, middleName, lastName, mobilePrefix, mobileNumber,
      village, country, gender, role,
      bloodGroup, email, password, isNri,
      workSector, designation, career, city, pr, workExperience,
      nriType, university
    } = req.body;

    if (!Array.isArray(role) || role.length === 0) {
      role = ['User'];
    } else if (!role.includes('User')) {
      role.push('User');
    }

    const existingUser = await User.findOne({ mobileNumber: mobileNumber });
    if (existingUser) {
      return res.status(400).json({ msg: "User already registered with this mobile number" });
    }

    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return res.status(400).json({ msg: "User already registered with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      middleName,
      lastName,
      mobilePrefix,
      mobileNumber,
      village,
      country,
      gender,
      role,
      bloodGroup,
      email: email.toLowerCase(),
      password: hashedPassword,
      isNri,
      ...(isNri && {
        nriType,
        ...(nriType === "student" || nriType === "both" ? { university } : {}),
        city,
        workSector,
        designation,
        career,
        pr,
        workExperience
      }),
      status: (Array.isArray(role) && (
        role.includes("superAdmin") ||
        role.includes("Admin") ||
        role.includes("Pratinidhi"))
      ) ? "Approved" : "Pending",
      isFamilyHead: false,
    });

    await newUser.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { registerUser };
