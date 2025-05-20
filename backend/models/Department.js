import mongoose from "mongoose";


const departmentSchema = new mongoose.Schema({
    name : {type : String , required : [true , "Department name is required"]},
    facultyId : {type : mongoose.Schema.Types.ObjectId , ref : "Faculty"},
    chefName : {type : String },
    chefEmail : {type : String , required : [true , "Chef email is required"]},
    isRegistered : {type : Boolean , default : false},
    invitationLink : {type : String , default : null}
},{timestamps : true});


const Department = mongoose.models.Department || mongoose.model("Department", departmentSchema);
export default Department;
