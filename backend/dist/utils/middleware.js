import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
export const loginvalidator = [
    body('email').notEmpty().trim().isEmail().withMessage("Email is Required !"),
    body('password').notEmpty().trim().isLength({ min: 6 }).withMessage("password should contain atleast 6 characters !")
];
export const generateChatCompletionValidator = [
    body('message').notEmpty().withMessage("Message is required !"),
];
export const signupvalidator = [
    body('name').notEmpty().withMessage("Name is Required !"),
    body('email').notEmpty().trim().isEmail().withMessage("Email is Required !"),
    body('password').notEmpty().trim().isLength({ min: 6 }).withMessage("password should contain atleast 6 characters !")
];
//# sourceMappingURL=middleware.js.map