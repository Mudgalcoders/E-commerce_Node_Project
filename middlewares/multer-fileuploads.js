import multer from 'multer';
import path from 'path';

// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Define the directory where files should be saved
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp and extension for unique file name
    },
});

const upload = multer({ storage: storage });

// Make sure the `uploads` folder exists (you can check manually or programmatically create it)
import fs from 'fs';
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

export { upload };  // Export to use in the routes
