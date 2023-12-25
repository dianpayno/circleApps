import joi from "joi";

export const registerSchema = joi.object({
    full_name: joi.string().required().max(20),
    username: joi.string().required().min(3).max(10),
    email: joi.string().email().required(),
    password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})