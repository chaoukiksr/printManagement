import mongoose from "mongoose";


const invitationSchema = new mongoose.Schema({
    role : {
        type : String ,
        required : [true , "Role is required"],
        enum : ["department" , "teacher" , "printer" , "admin"],
    },
    email : {
        type : String ,
        required : [true , "Email is required"],
        unique : true,
        trim : true,
    },
    from : {
        type : mongoose.Schema.Types.ObjectId ,
        required : [true , "From is required"],
    },
    isSubAdmin : {
        type : Boolean ,
        default : false,
    },
    invitationLink : {
        type : String ,
    },
}, { timestamps: true });

const Invitation =mongoose.models.Invitation ||  mongoose.model("Invitation", invitationSchema);
export default Invitation;
