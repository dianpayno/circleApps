import joi from "joi";

export const registerSchema = joi.object({
    full_name: joi.string().required().max(20),
    username: joi.string().required().min(3).max(10),
    email: joi.string().email().required(),
    password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    profile_picture: joi.string(),
    cover_picture: joi.string(),
    profile_description: joi.string()
})
export const editProfileSchema = joi.object({
    full_name: joi.optional(),
    username: joi.optional(),
    profile_picture: joi.optional(),
    cover_picture: joi.optional(),
    profile_description: joi.optional(),

})