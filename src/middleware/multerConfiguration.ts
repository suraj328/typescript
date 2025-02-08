// src/multerConfig.ts
import multer, { StorageEngine } from "multer";
import path from "path";
import fs from "fs";

// Get the current working directory and set the 'uploads' folder path
const uploadDir = path.join(
  process.cwd(),
  (process.env.ROOT_DIR as string) + "/uploads"
);

// Ensure the 'uploads' directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// funtction to handle file upload

// Function to get a folder name based on MIME type
const getFolderNameByMimeType = (mimeType: string): string => {
  if (mimeType.startsWith("image/")) {
    return "images"; // For all image files
  } else if (mimeType.startsWith("video/")) {
    return "videos"; // For all video files
  } else if (mimeType.startsWith("audio/")) {
    return "audios"; // For all audio files
  } else if (mimeType === "application/pdf") {
    return "pdfs"; // For PDF files
  } else {
    return "others"; // For unsupported or other file types
  }
};

// Multer storage configuration
const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = getFolderNameByMimeType(file.mimetype); // Get folder based on MIME type
    const destination = path.join(uploadDir, folder);

    // Ensure the folder exists
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
    }

    cb(null, destination); // Set the dynamic folder based on MIME type
  },
  filename: (req, file, cb) => {
    // Create a unique file name by appending the timestamp to the original file name
    const fileExtension = path.extname(file.originalname); // Get the file extension
    const fileNameWithoutExt = path.basename(file.originalname, fileExtension); // Get file name without extension
    const timestamp = Date.now(); // Get current timestamp

    const newFileName = `${fileNameWithoutExt}_${timestamp}${fileExtension}`; // Generate new file name

    cb(null, newFileName); // Set the new file name
  },
});

// Multer upload instance with storage options and file filter
const upload = multer({
  storage,
  limits: {
    fileSize: 200 * 1024 * 1024, // 200MB file size limit
  },
  fileFilter: (req, file, cb) => {
    // Allow only specific MIME types, else return an error
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "video/mp4",
      "audio/mpeg",
      "application/pdf",
      "image/svg+xml",
    ];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error("LIMIT_UNEXPECTED_FILE"));
    }

    cb(null, true); // Accept the file
  },
});

// Export the multer upload instance for use in routes
export default upload;
