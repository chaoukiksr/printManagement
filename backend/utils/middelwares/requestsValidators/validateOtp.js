import { body, validationResult } from "express-validator";
import emailValidator from "../fieldValidators/emailValidator";
import validateFunc from "../validationFunction";
import otpValidator from "../fieldValidators/otpValidator";
const validateOtp = [

   ...emailValidator,
   ...otpValidator,
  validateFunc

];
const validateResendOtp = [
   ...emailValidator,
   validateFunc]
export { validateOtp, validateResendOtp };