const mongoose = require("mongoose");

// scherma 
const studentSchema = mongoose.Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true},
    password:{type:String,required:true,trim:true},
    profile:{
       url:{
         type:String,
       },
       public_id:{
        type:String
       }
    },
})


const Student = mongoose.model("Student",studentSchema);
module.exports = Student