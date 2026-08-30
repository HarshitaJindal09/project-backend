// But Express doesn't automatically handle uploaded files in the same way it handles JSON.
// That's where Multer comes in.
// Multer is middleware for handling multipart/form-data, which is commonly used for file uploads.

// diskStorage() means: Save the uploaded file on the server's disk.

// There are two important functions inside:
// diskStorage
//    ├── destination → Where should the file go?
//    └── filename    → What should the file be called?
// cb means callback.\
// file has all info about file


import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    //   cb(error, result)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ 
    storage, 
})