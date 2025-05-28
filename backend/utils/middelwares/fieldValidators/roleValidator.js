import { body } from "express-validator"
const roleValidator = [
   body('role')
         .notEmpty()
         .escape()
         .isIn(["department", "teacher", "printer", "admin"])
         .withMessage({
            message: 'data validation error',
            location: 'role'
         })
]
export default roleValidator;
