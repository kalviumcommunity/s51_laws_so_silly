const Joi = require("joi")
const validator = (schema) => (data) => 
    schema.validate(data, {abortEarly: false})

const postUpdateSchema = Joi.object({
    Country: Joi.string().required().min(4).max(60),
    Law: Joi.string().required(),
    Penalty: Joi.string().required(),
    State_Region_if_applicable: Joi.string().required()
})

const updateAndPostValidator = validator(postUpdateSchema)
module.exports = updateAndPostValidator