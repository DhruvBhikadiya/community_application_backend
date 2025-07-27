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
    const {
      firstName, middleName, lastName, mobileNumber,
      age, village, country, gender, role,
      bloodGroup, email, password,
      workSector, designation, career, city, pr, workExperience
    } = req.body;

    const countryCodes = {
      India: '+91',
      USA: '+1',
      UK: '+44',
      Canada: '+1',
      Australia: '+61',
      UAE: '+971',
    };
    const countryCode = countryCodes[country] || '+00';
    const formattedMobile = `${countryCode}${mobileNumber}`;

    // Check duplicate mobile
    const existingUser = await User.findOne({ mobileNumber: formattedMobile });
    if (existingUser) {
      return res.status(400).json({ msg: "User already registered with this mobile number" });
    }

    // Check duplicate email
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return res.status(400).json({ msg: "User already registered with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const isNri = country !== 'India';

    const newUser = new User({
      firstName,
      middleName,
      lastName,
      mobileNumber: formattedMobile,
      age,
      village,
      country,
      gender,
      role,
      bloodGroup,
      email: email.toLowerCase(),
      password: hashedPassword,
      isNri,
      ...(isNri && {
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
        role.includes("pratinidhi"))
      ) ? "Approved" : "Pending",
    });

    await newUser.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { registerUser };