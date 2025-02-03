import multer from "multer";
import path from "path";

// Set up storage engine
const storage = multer.diskStorage({
  destination: "../public/uploads", // Folder to store uploaded files
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// File type validation
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === ".jpg" || ext === ".png" || ext === ".jpeg") {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg, .png, or .jpeg files are allowed."));
  }
};

const upload = multer({ storage, fileFilter });
export default upload;