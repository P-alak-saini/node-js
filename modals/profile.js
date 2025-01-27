
const mongoose = require("mongoose")

const schema = mongoose.Schema({
    username:{type:String},
    profile:{
        url:String,
        public_id:String
    }
})

const User = mongoose.model("User",schema)

module.exports = User