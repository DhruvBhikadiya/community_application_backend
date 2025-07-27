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

    mobileNumber: Joi.string()
        .pattern(/^\d{10}$/)
        .required()
        .messages({
            "any.required": "Mobile number is required",
            "string.pattern.base": "Mobile number must be 10 digits",
        }),

    email: Joi.string().email().required().messages({
        "any.required": "Email is required",
        "string.email": "Invalid email format",
    }),

    password: Joi.string().min(6).required().messages({
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
        .required()
        .messages({
            "array.min": "At least one role is required",
            "any.required": "Role is required",
        }),

    status: Joi.string()
        .valid("Pending", "Approved", "Reject")
        .default("Pending"),

    isNri: Joi.boolean().default(false),

    workSector: Joi.when("isNri", {
        is: true,
        then: Joi.string().required().messages({
            "any.required": "Work sector is required for NRI",
        }),
        otherwise: Joi.string().optional(),
    }),

    designation: Joi.when("isNri", {
        is: true,
        then: Joi.string().required().messages({
            "any.required": "Designation is required for NRI",
        }),
        otherwise: Joi.string().optional(),
    }),

    career: Joi.when("isNri", {
        is: true,
        then: Joi.string().required().messages({
            "any.required": "Career is required for NRI",
        }),
        otherwise: Joi.string().optional(),
    }),

    pr: Joi.when("isNri", {
        is: true,
        then: Joi.boolean().required().messages({
            "any.required": "PR status is required for NRI",
        }),
        otherwise: Joi.boolean().optional(),
    }),

    workExperience: Joi.when("isNri", {
        is: true,
        then: Joi.string().required().messages({
            "any.required": "Work experience is required for NRI",
        }),
        otherwise: Joi.string().optional(),
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