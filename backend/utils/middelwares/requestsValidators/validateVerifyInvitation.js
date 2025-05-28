import {body,validationResult} from "express-validator";
import emailValidator from "../fieldValidators/emailValidator";
import usernameValidator from "../fieldValidators/usernameValidator";
import roleValidator from "../fieldValidators/roleValidator";
import isSubAdminValidator from "../fieldValidators/isSubAdminValidator";
import validateFunc from "../validationFunction";
import tokenValidator from "../fieldValidators/tokenValidator";
const validateVerifyInvitation = [
   ...tokenValidator,
   ...emailValidator,
   ...usernameValidator,
   ...roleValidator,
   ...isSubAdminValidator,
   validateFunc
]

export default validateVerifyInvitation;