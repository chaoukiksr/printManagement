import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true , "Your Name is required"],
        unique: true,
    },
    email: {
        type : String ,
        required : [true , "Your Email is required"],
        unique : true,
        trim : true,
    },
    password : {
        type : String , 
        required : [true , "Your Password is required"],
        minlength : [8 , "Password must be at least 8 characters long"],
    },

    role : {type : String , enum : ["admin" , "department" , "teacher" , "printer"] , default : "admin"},


    // for department chefs and teachers 
    departmentId : [{type : mongoose.Schema.Types.ObjectId , ref : "Department"}],

    // for faculty printers and super admins
    facultyId : {type : mongoose.Schema.Types.ObjectId , ref : "Faculty"},

    // for department or faculty admins
    isSubAdmin : {type : Boolean , default : false},

    // for email verification
    isEmailVerified : {type : Boolean , default : false},
    emailVerificationOTP : {type : String , default : null},
    emailVerificationOTPExpiry : {type : Date , default : null},
},{timeseries : true});


const User = mongoose.models.User || mongoose.model("User" , userSchema);
export default User;