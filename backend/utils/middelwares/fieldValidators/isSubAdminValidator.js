import { body } from "express-validator";
const isSubAdminValidator = [
   body('isSubAdmin')
      .notEmpty()
      .escape()
      .trim()
      .isBoolean()
      .withMessage({
         message: 'data validation error',
         location: 'isSubAdmin field'
      })
]
export default isSubAdminValidator;
