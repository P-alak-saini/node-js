const multer = require("multer");
const path = require("path");

const st = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      // Set file name as the original file name (you can customize this)
      cb(null, Date.now() + path.extname(file.originalname)); 
    }
  });
  
const upload = multer({ storage: st });
module.exports = upload