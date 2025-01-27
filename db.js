const mongoose=require("mongoose");

 async function db(){
    try{
   await  mongoose.connect("mongodb://127.0.0.1:27017/whatspp");
    console.log("connect to database");
    } catch(error){
        console.log(error);
    }
}

module.exports = db;