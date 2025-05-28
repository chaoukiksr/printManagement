import { body } from "express-validator";

const emailValidator = [
   body('email')
      .notEmpty()
      .escape()
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage({
         message: 'data validation error',
         location: 'email'
      })
]
export default emailValidator;