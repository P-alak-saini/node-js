const jwt = require("jsonwebtoken");
const Student = require("./modals/students");

async function auth(req,res,next){
    const {token} = req.cookies;
    console.log(token)
    if(!token || token == "undefined"){
       return  res.redirect("/api/v1/login")
    }
    const decodeData = await jwt.verify(token,"palak2343")
    const student = await Student.findById(decodeData.userId)
    if(!student){
       return  res.redirect("/api/v1/login")
    }
    req.student = student
    next()
}

module.exports = auth