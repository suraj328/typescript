import { Request, Response, NextFunction } from "express";
import upload from "./multerConfiguration";
import multer from "multer";

const handleSingleFileUpload =
  (fileFieldName: string) =>
  (req: Request, res: Response, next: NextFunction) => {
    upload.single(fileFieldName)(req, res, (err: any) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
              error: "File too large. Maximum size is 10MB",
            });
          }
          if (err.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).json({
              error: err.message,
            });
          }
          return res.status(400).json({
            error: err.message,
          });
        }
        return res.status(500).json({
          error: err.message || "An unknown error occurred",
        });
      }

      // Call next() only if there are no errors
      return next();
    });
  };

const handleMultipleFieldUploadsByField =
  (fields: { name: string; maxCount: number }[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    upload.fields(fields)(req, res, (err: any) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
              error: "File too large. Maximum size is 10MB",
            });
          }
          if (err.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).json({
              error: err.message,
            });
          }
          if (err.code === "LIMIT_FILE_COUNT") {
            return res.status(400).json({
              error: "Too many files uploaded for one of the fields",
            });
          }
          return res.status(400).json({
            error: err.message,
          });
        }
        return res.status(500).json({
          error: err.message || "An unknown error occurred",
        });
      }

      // Call next() only if there are no errors
      return next();
    });
  };

export { handleSingleFileUpload, handleMultipleFieldUploadsByField };
