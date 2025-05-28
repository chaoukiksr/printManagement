
import emailValidator from "../fieldValidators/emailValidator";
import usernameValidator from "../fieldValidators/usernameValidator";
import passwordValidator from "../fieldValidators/passwordValidator";
import roleValidator from "../fieldValidators/roleValidator";
import facultyNameValidator from "../fieldValidators/facultyNameValidator";
import validationFunction from "../validationFunction.js";
const validateData = [
   ...usernameValidator,
   ...emailValidator,
   ...passwordValidator,
   ...roleValidator,
   ...facultyNameValidator,
   validationFunction
];

export default validateData;