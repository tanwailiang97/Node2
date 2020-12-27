const Joi = require('@hapi/joi')

const authRegisterSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(2).required(),
})

const authSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(2).required(),
})

module.exports = {
  authRegisterSchema, authSchema
}
