const Joi = require('joi');

// Validation for Signup
const validateSignup = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9]+$/).min(10).max(15).required(),
    password: Joi.string().min(8).required()
  });
  return schema.validate(data);
};

// Validation for Login
const validateLogin = (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  });
  return schema.validate(data);
};

module.exports = { validateSignup, validateLogin };
