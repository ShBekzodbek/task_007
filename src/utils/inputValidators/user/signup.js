const Joi = require('joi');

const signupSchema = Joi
    .object()
    .keys({
        name: Joi
            .string()
            .alphanum()
            .min(3)
            .max(50)
            .trim(true)
            .required(),
        email: Joi
            .string()
            .email()
            .trim(true),
        about: Joi
            .string(),
        password: Joi
            .string()
            .regex(/[a-z0-9]/)
            .min(5)
            .max(15)
    })
const signUpInputValidator = (payload) => {
    return signupSchema.validate(payload);
}

module.exports = signUpInputValidator;