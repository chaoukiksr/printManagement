import { validationResult } from "express-validator"
const validateFunc =  (req,res,next)=>{
   let result = validationResult(req);
   if(!result.isEmpty()){
      res.status(400).send({
         message:"data validation error"
      })
   }
   next();
}

export default validateFunc;