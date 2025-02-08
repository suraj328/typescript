import { Request, Response, NextFunction } from "express";
import { tokenHelper } from "../Helper/TokenHelper";
import { cookieHelper } from "../Helper/CookieHelper";
import { ResponseHandler } from "../util/ResponseHandler";
import { systemUserService } from "../service/SystemUserService";
const tokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authorization: string | undefined = req.headers["authorization"];
    const cookies: Record<string, string> = req.cookies || {};

    let accessToken: string | undefined = cookies["accessToken"];
    let refreshToken: string | undefined = cookies["refreshToken"];

    // Extract accessToken from Authorization header if not in cookies
    if (!accessToken && authorization?.startsWith("Bearer ")) {
      accessToken = authorization.split(" ")[1];
    }

    // Extract refreshToken from headers if not in cookies
    if (!refreshToken) {
      const refreshTokenHeader: string | undefined = req.headers[
        "refresh-token"
      ] as string;
      if (refreshTokenHeader) {
        refreshToken = refreshTokenHeader;
      }
    }

    // Validate tokens if available
    // if (accessToken) {
    //   const isAccessTokenValid = await tokenHelper.verifyAccessToken(
    //     accessToken
    //   );
    //   if (isAccessTokenValid) {
    //     (req as any).tokens = { accessToken, refreshToken };
    //     const decodedToken = await tokenHelper.decodeAccessToken(accessToken);
    //     (req as any).userRole = decodedToken.role;
    //     return next(); // Exit after successful validation
    //   }
    // }

    if (refreshToken) {
      const isRefreshTokenValid = await tokenHelper.verifyRefreshToken(
        refreshToken
      );
      if (!isRefreshTokenValid) {
        res.status(401).json(
          new ResponseHandler().sendResponse({
            code: 401,
            message: "Unauthorized access, please login again.",
            error: null,
            data: null,
            success: false,
            affectedId: null,
          })
        );
        return;
      }
      const tokenData = await tokenHelper.decodeRefreshToken(refreshToken);
      const userData = await systemUserService.findByPk(
        tokenData.systemUserId,
        tokenData.role
      );

      // Generate a new access token if refreshToken is valid
      const generatedAccessToken = await tokenHelper.generateAccessToken({
        systemUserId: userData?.systemUserId,
        role: userData?.isAdmin ? "admin" : "user",
        activeStatus: userData?.activeStatus,
      });
      accessToken = generatedAccessToken.accessToken;
      await cookieHelper.setCookie({
        res,
        cookieName: "accessToken",
        cookieValue: accessToken,
        expTime: generatedAccessToken.expiresTime,
      });
      const generatedRefreshToken = await tokenHelper.generateRefreshToken({
        systemUserId: userData?.systemUserId,
        role: userData?.isAdmin ? "admin" : "user",
      });

      refreshToken = generatedRefreshToken.refreshToken;
      await cookieHelper.setCookie({
        res,
        cookieName: "refreshToken",
        cookieValue: refreshToken,
        expTime: generatedRefreshToken.expiresTime,
      });

      (req as any).tokens = { accessToken, refreshToken };
      (req as any).userRole = tokenData.role;
      return next(); // Exit after handling refresh token
    }
    if (!accessToken) {
      const generatedAccessToken = await tokenHelper.generateAccessToken({
        systemUserId: null,
        role: "guest",
        activeStatus: true,
      });

      accessToken = generatedAccessToken.accessToken;
      await cookieHelper.setCookie({
        res,
        cookieName: "accessToken",
        cookieValue: accessToken,
        expTime: generatedAccessToken.expiresTime,
      });
    }

    if (!refreshToken) {
      const generatedRefreshToken = await tokenHelper.generateRefreshToken({
        systemUserId: null,
        role: "guest",
      });

      refreshToken = generatedRefreshToken.refreshToken;
      await cookieHelper.setCookie({
        res,
        cookieName: "refreshToken",
        cookieValue: refreshToken,
        expTime: generatedRefreshToken.expiresTime,
      });
    }

    // Attach tokens to the request object
    (req as any).tokens = { accessToken, refreshToken };
    (req as any).userRole = "guest";

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error in tokenMiddleware:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default tokenMiddleware;
