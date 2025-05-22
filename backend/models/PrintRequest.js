import mongoose from "mongoose";


const printRequestSchema = new mongoose.Schema({
    user: {
        id : {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        name: {type: String , ref: "User"},
        image: {type: String , ref: "User"},
    },
    departmentId : {type: mongoose.Schema.Types.ObjectId, ref: "Department"},

    // request details
    type : {type : String , enum : ["Test" , "Exam" , "Other"] , required: [true , "Type is required"]},
    quantity : {type : Number , required: [true , "Quantity is required"]},
    description : {type : String },
    status : {type : String , enum : ["wf_printer" , "wf-teacher" , "pending" , "completed" , "refused"] , default: "pending"},
    // file details
    file : {type : String},
},{timestamps: true});



const PrintRequest = mongoose.models.PrintRequest || mongoose.model("PrintRequest", printRequestSchema);
export default PrintRequest;
