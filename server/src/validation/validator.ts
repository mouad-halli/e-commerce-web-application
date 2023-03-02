import Joi from "joi"

const validator = (
    validationSchema: Joi.Schema,
    validationOptions: Joi.ValidationOptions
    ) => (payload: any) => {
        return validationSchema.validate(payload, validationOptions)
}

const registerSchema = Joi.object({  
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(12).alphanum().required(),
    passwordConfirmation: Joi.ref('password')
})

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().alphanum().required(),
})

export const validateRegister = validator(registerSchema, { abortEarly: true })

export const validateLogin = validator(loginSchema, { abortEarly: true })