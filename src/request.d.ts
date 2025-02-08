import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      userRole?: string; // Make it optional if not always present
    }
  }
}
