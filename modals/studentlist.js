const mongoose = require("mongoose");

// scherma 
const studentlistSchema = mongoose.Schema({
  name:{
    type:String,
  },
  age:{
    type:Number,
  },
  fathersName:{type:String},
  mothersName:{type:String},
})


const Studentlist = mongoose.model("Studentlist",studentlistSchema);
module.exports = Studentlist