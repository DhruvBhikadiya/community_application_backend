const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/User.js');
const { loginValidationSchema } = require('../config/validation.js');

module.exports.userLogin = async (req, res) => {
    try {
        const { error } = loginValidationSchema.validate(req.body);
        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(400).json({ msg: "Validation failed", errors });
        }

        const { mobileNumber, password } = req.body;

        const user = await userModel.findOne({
            mobileNumber: { $regex: `${mobileNumber}$` }
        });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const hasUserRole = user.role.includes("User");
        if (!hasUserRole) {
            return res.status(403).json({ msg: "Access denied. Not an User." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ msg: "Invalid password" });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            msg: "Login successful",
            token,
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                mobileNumber: user.mobileNumber,
            },
        });
    } catch (error) {
        console.error("Admin login error:", error);
        return res.status(500).json({ error: "Server error" });
    }
};