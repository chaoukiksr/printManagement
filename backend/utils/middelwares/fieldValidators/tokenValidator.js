import { body } from "express-validator";

const tokenValidator = [
   body("token")
   .notEmpty()
   .isString()
   .isLength({ min: 32, max: 32 })
   .withMessage({ message: "data validation error", location: "token field" })
]
export default tokenValidator;