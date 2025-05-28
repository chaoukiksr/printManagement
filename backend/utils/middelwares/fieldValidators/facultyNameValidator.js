import { body } from "express-validator"
const facultyNameValidator = [
   body('facultyName')
      .notEmpty()
      .escape()
      .trim()
      .isAlpha()
      .withMessage({
         message: 'data validation error',
         location: 'faculty name'
      })
]
export default facultyNameValidator;
