import { body } from "express-validator"
const usernameValidator = [
   body('username')
      .notEmpty()
      .escape()
      .isAlpha()
      .withMessage({
         message: 'data validation error',
         location: 'username'
      })
]
export default usernameValidator;