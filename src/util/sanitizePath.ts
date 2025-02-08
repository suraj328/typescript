import dotenv from "dotenv";
dotenv.config();
export const sanitizePath = (inputPath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const sanitizedPath = inputPath
        .replace(/\.\.[/\\]/g, "")
        .replace(/\\/g, "/");
      resolve(process.env.BACKEND_HOST_URL + sanitizedPath);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
