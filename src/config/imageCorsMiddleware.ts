import { Request, Response, NextFunction } from "express";
const imageCorsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins for images
  res.header("Access-Control-Allow-Methods", "GET");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  next();
};

export default imageCorsMiddleware;
