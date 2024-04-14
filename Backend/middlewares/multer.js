// const multer = require('multer');


// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, './public/temp');
//   },
//   filename: function(req, file, cb) {
//     cb(null, file.originalname);
//   }
// });

// const upload = multer({ storage });

// module.exports = { upload };

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/temp');
  },
  filename: function(req, file, cb) {
    const originalname = file.originalname;
    const ext = path.extname(originalname); 
    const basename = path.basename(originalname, ext); 

    const timestamp = Date.now(); 
    const newFilename = `${basename}-${timestamp}${ext}`;

    cb(null, newFilename);
  }
});

const upload = multer({ storage });

module.exports = { upload };
