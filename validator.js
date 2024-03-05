const Joi = require("joi")
const validator = (schema) => (data) =>
    schema.validate(data, { abortEarly: false })

const postUpdateSchema = Joi.object({
    Country: Joi.string().required().min(4).max(60),
    Law: Joi.string().required(),
    Penalty: Joi.string().required(),
    State_Region_if_applicable: Joi.string().required()
})

const loginSchema = Joi.object({
    username: Joi.string()
        .required(),
    password: Joi.string()
        .required()
        .trim()
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]\\|:;"'<>,.?/-]).{8,}$/)
        .message('Password must contain at least one digit, one lowercase letter, one uppercase letter, and one special character.')
});

const updateAndPostValidator = validator(postUpdateSchema)
const loginValidator = validator(loginSchema)
module.exports = updateAndPostValidator, loginValidator