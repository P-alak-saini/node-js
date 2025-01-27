const express=require("express");
const app=express();
const port=5000;
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
 const routes=require("./routes/allroutes")
 var cookieParser = require('cookie-parser')


// static public folder
app.use(express.static("public"));

// setejs 
app.set("view engine","ejs");


app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
const db=require("./db")

app.use((req,res,next)=>{
    res.locals.palak= req.student
    next()                         
})

const multer = require("multer");
// const upload = multer({ dest: 'uploads/' })
const upload = require("./multerconfig")

app.post("/upload",upload.single("profile"),(req,res)=>{
    console.log(req.body)
    console.log(req.file)
})


app.use("/api/v1",routes);



app.listen(port,function(){
    console.log("server start on port 5000");
    db()
});