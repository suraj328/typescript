import dotenv from "dotenv";
import { Response } from "express";
dotenv.config();

class CookieHelper {
  private domainName: string | undefined = "localhost";
  constructor() {
    const url = new URL(process.env.BACKEND_HOST_URL as string);
    this.domainName = url.hostname;
  }
  public async setCookie({
    res,
    cookieName,
    cookieValue,
    expTime,
  }: {
    res: Response;
    cookieName: string;
    cookieValue: string;
    expTime: number;
  }): Promise<boolean> {
    res.cookie(cookieName, cookieValue, {
      // domain: this.domainName,
      sameSite: 'none',
      httpOnly: (process.env.NODE_ENV as string) === "production", // Ensure the cookie is only accessible via HTTP(S)
      secure: (process.env.NODE_ENV as string) === "production", // Set to true if your app is served over HTTPS in production
      maxAge: expTime, // Set the cookie expiry time
    });
    if (res.get("Set-Cookie")) {
      return true;
    }
    return false;
  }
  // set multiple cookie
}

export const cookieHelper: CookieHelper = new CookieHelper();
