const express=require("express");
const router=express.Router();
const Studentlist = require("../modals/studentlist");
const Student=require("../modals/students");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../auth")
const jwt = require("jsonwebtoken")

 router.get("/home" ,authMiddleware,async function(request,response){
     const finddata= await Studentlist.find();
     console.log(finddata)
    response.render("home.ejs",{finddata})
});

router.get("/create",(request,response)=>{
  response.render("create.ejs")
}); 

router.post("/create",(request,response)=>{
  new Studentlist ({
   name:request.body.name,
   age:request.body.age,
   fathersName:request.body.fname,
   mothersName:request.body.mname,
  }).save();

  response.redirect("/api/v1/home")

  // console.log( request.body)
});

router.get("/view/:id", async (request,response)=>{
  // console.log(request.params)
  const student =  await Studentlist.findById(request.params.id);
  // console.log(student);

  response.render("view.ejs",{student});
});

router.get("/edit/:id",async(request,response)=>{
  const student =  await Studentlist.findById(request.params.id);
  response.render("edit.ejs",{student})
})

router.put("/edit/:id",async(request,response)=>{
  // new Studentlist({
  //     name:request.body.name
  // })
  
 const editv= await Studentlist.findByIdAndUpdate(request.params.id,{$set:{name:request.body.name,age:request.body.age,fathersName:request.body.fname,mothersName:request.body.mname}} );
 editv.save();
//  console.log(editv);
    response.redirect("/api/v1/home")

})

router.delete("/delete/:id",async(request,response)=>{
  const editv= await Studentlist.findByIdAndDelete(request.params.id,{$set:{name:request.body.name,age:request.body.age,fathersName:request.body.fname,mothersName:request.body.mname}} );
response.redirect("/api/v1/home")
})



router.get("/login",(request,response)=>{
  response.render("login.ejs")
});

router.post("/login",async(request,response)=>{
  const {email,password} = request.body;
  // console.log(request.body)
 if( !email || !password){
   return response.redirect("/api/v1/login")
 }
const user =  await Student.findOne({email});
if(!user){
  return response.redirect("/api/v1/signup")
}
const isMatch =  await bcrypt.compare(password,user.password)
console.log(isMatch);
if(!isMatch){
  return response.redirect("/api/v1/login")
}

const token = await jwt.sign({userId:user._id},"palak2343",{expiresIn:'28d'})
response.cookie("token",token)
return response.redirect("/api/v1/profile")
});

router.get("/signup",(request,response)=>{
  response.render("signup.ejs")
}); 

router.post("/signup",async(request,response)=>{
 const {username,email,password} = request.body;
 if(!username || !email || !password){
   return response.redirect("/api/v1/signup")
 }
const hashpassword =  await bcrypt.hash(password,10)
 await new Student({name:username,email,password:hashpassword}).save()
 response.redirect("/api/v1/login");
}); 

router.get("/profile",authMiddleware,(request,response)=>{
  console.log(request.student)
  response.locals.palak= request.student
  response.render("profile.ejs",{student:request.student})  
}); 

router.post("/logout",authMiddleware,(req,res)=>{
  res.clearCookie("token")
  res.redirect("/api/v1/login")
})



module.exports=router;

