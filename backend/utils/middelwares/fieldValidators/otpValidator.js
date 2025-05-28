import { body } from "express-validator";

const otpValidator = [
   body("otp")
   .notEmpty()
   .trim()
   .escape()
   .isNumeric()
   .isLength({ min: 6, max: 6 })
   .withMessage({
      message: "data validation error",
      location: "otp field"
   })
]
export default otpValidator;