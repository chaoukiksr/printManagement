import { body } from "express-validator"
const passwordValidator = [
   body('password')
      .notEmpty()
      .escape()
      .trim()
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/)
      .isLength({ min: 8 })
      .withMessage({
         message: 'data validation error',
         location: 'password'
      })
]
export default passwordValidator;
