const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __basedir + "/resources/assets/uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Use current timestamp as the file name
    }
  });


  // File filter to only allow .txt files
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'text/plain') {
      cb(null, true);
    } else {
      cb(new Error('Only .txt files are allowed!'), false);
    }
  };
  

  // Configure multer with storage and file filter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
  });





module.exports = upload;