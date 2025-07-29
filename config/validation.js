const Joi = require("joi");

const userValidationSchema = Joi.object({
    firstName: Joi.string()
        .pattern(/^[A-Za-z\s\-'.]+$/)
        .min(2)
        .max(50)
        .required()
        .messages({
            "any.required": "First name is required",
            "string.empty": "First name is required",
            "string.pattern.base": "First name must contain only alphabets",
        }),

    middleName: Joi.string()
        .pattern(/^[A-Za-z\s\-'.]+$/)
        .min(2)
        .max(50)
        .required()
        .messages({
            "any.required": "Middle name is required",
            "string.empty": "Middle name is required",
            "string.pattern.base": "Middle name must contain only alphabets",
        }),

    lastName: Joi.string()
        .pattern(/^[A-Za-z\s\-'.]+$/)
        .min(2)
        .max(50)
        .required()
        .messages({
            "any.required": "Last name is required",
            "string.empty": "Last name is required",
            "string.pattern.base": "Last name must contain only alphabets",
        }),

    mobilePrefix: Joi.string()
        .pattern(/^\+\d{1,4}$/)
        .required()
        .messages({
            "any.required": "Mobile prefix is required",
            "string.pattern.base": "Mobile prefix must be in format +<country_code> (e.g., +91, +1)",
        }),

    mobileNumber: Joi.string()
        .pattern(/^\d{6,15}$/)
        .required()
        .messages({
            "any.required": "Mobile number is required",
            "string.pattern.base": "Mobile number must be between 6 to 15 digits",
        }),

    email: Joi.string().email().required().messages({
        "any.required": "Email is required",
        "string.email": "Invalid email format",
    }),

    password: Joi.string().min(6).required().messages({
        "any.required": "Password is required",
        "string.min": "Password must be at least 6 characters",
    }),

    confirmPassword: Joi.string().min(6).required().messages({
        "any.required": "Password is required",
        "string.min": "Password must be at least 6 characters",
    }),

    village: Joi.string().required().messages({
        "any.required": "Village is required",
    }),

    country: Joi.string().required().messages({
        "any.required": "Country is required",
    }),

    bloodGroup: Joi.string()
        .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
        .required()
        .messages({
            "any.required": "Blood group is required",
            "any.only": "Invalid blood group",
        }),

    gender: Joi.string()
        .valid("Male", "Female", "Other")
        .required()
        .messages({
            "any.required": "Gender is required",
            "any.only": "Invalid gender",
        }),

    role: Joi.array()
        .items(Joi.string().valid("superAdmin", "Admin", "Pratinidhi", "User"))
        .default(["User"])
        .min(1)
        .messages({
            "array.min": "At least one role is required",
            "any.required": "Role is required",
        }),

    status: Joi.string()
        .valid("Pending", "Approved", "Reject")
        .default("Pending"),

    isNri: Joi.boolean().default(false).required(),

    nriType: Joi.when("isNri", {
        is: true,
        then: Joi.string()
            .valid("employee", "student", "both")
            .required()
            .messages({
                "any.required": "NRI type is required",
                "any.only": "Invalid NRI type",
            }),
        otherwise: Joi.string().optional(),
    }),

    university: Joi.any().custom((value, helpers) => {
        const { role, isNri, nriType } = helpers.state.ancestors[0];
        const isUser = Array.isArray(role) && role.includes("User");
        if (isUser && isNri && (nriType === "student" || nriType === "both")) {
            if (!value) return helpers.error("any.required");
        }
        return value;
    }).messages({
        "any.required": "University is required for NRI student",
    }),

    workSector: Joi.any().custom((value, helpers) => {
        const { role, isNri, nriType } = helpers.state.ancestors[0];
        const isUser = Array.isArray(role) && role.includes("User");
        if (isNri && isUser && (nriType === "employee" || nriType === "both")) {
            if (!value) return helpers.error("any.required");
        }
        return value;
    }).messages({
        "any.required": "Work sector is required for NRI employee",
    }),

    designation: Joi.any().custom((value, helpers) => {
        const { role, isNri, nriType } = helpers.state.ancestors[0];
        const isUser = Array.isArray(role) && role.includes("User");
        if (isNri && isUser && (nriType === "employee" || nriType === "both")) {
            if (!value) return helpers.error("any.required");
        }
        return value;
    }).messages({
        "any.required": "designation is required for NRI employee",
    }),

    career: Joi.any().custom((value, helpers) => {
        const { role, isNri, nriType } = helpers.state.ancestors[0];
        const isUser = Array.isArray(role) && role.includes("User");
        if (isNri && isUser && (nriType === "employee" || nriType === "both")) {
            if (!value) return helpers.error("any.required");
        }
        return value;
    }).messages({
        "any.required": "career is required for NRI employee",
    }),

    pr: Joi.any().custom((value, helpers) => {
        const { role, isNri, nriType } = helpers.state.ancestors[0];
        const isUser = Array.isArray(role) && role.includes("User");
        if (isNri && isUser && (nriType === "employee" || nriType === "both")) {
            if (value === undefined || value === null) return helpers.error("any.required");
        }
        return value;
    }).messages({
        "any.required": "pr is required for NRI employee",
    }),

    workExperience: Joi.any().custom((value, helpers) => {
        const { role, isNri, nriType } = helpers.state.ancestors[0];
        const isUser = Array.isArray(role) && role.includes("User");
        if (isNri && isUser && (nriType === "employee" || nriType === "both")) {
            if (!value) return helpers.error("any.required");
        }
        return value;
    }).messages({
        "any.required": "Work experience is required for NRI employee",
    }),

    city: Joi.when("isNri", {
        is: true,
        then: Joi.string().required().messages({
            "any.required": "City is required for NRI",
        }),
        otherwise: Joi.string().optional(),
    }),

    isActive: Joi.boolean().default(true),

    isDelete: Joi.boolean().default(false),
});

const loginValidationSchema = Joi.object({
    mobileNumber: Joi.string()
        .pattern(/^\d{10}$/)
        .required()
        .messages({
            "any.required": "Mobile number is required",
            "string.empty": "Mobile number is required",
            "string.pattern.base": "Mobile number must be exactly 10 digits",
        }),

    password: Joi.string()
        .min(6)
        .required()
        .messages({
            "any.required": "Password is required",
            "string.empty": "Password is required",
            "string.min": "Password must be at least 6 characters",
        }),
});

module.exports = {
    userValidationSchema,
    loginValidationSchema
};
