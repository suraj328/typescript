import { Request, Response } from "express";
import AbstractRouter from "./AbstractRouter";
import { systemUserService } from "../service/SystemUserService";
import { body, check, validationResult } from "express-validator";
import { handleSingleFileUpload } from "../middleware/uploadMiddleware";
import { SystemUserInsert } from "../interface/systemuser";
import { ResponseHandler } from "../util/ResponseHandler";
import { sanitizePath } from "../util/sanitizePath";
import path from "path";
import { passwordHelper } from "../Helper/PasswordHelper";
import { tokenHelper } from "../Helper/TokenHelper";
import { cookieHelper } from "../Helper/CookieHelper";
class SystemUserRouter extends AbstractRouter {
  protected initializeRoutes(): void {
    // login
    this.router.post(
      "/login",
      [
        body("systemUserEmail")
          .trim()
          .isEmail()
          .withMessage("System User Email must be a valid email address"),
        body("systemUserPassword")
          .isLength({ min: 8, max: 30 })
          .withMessage(
            "System User Password must be between 8 to 30 characters"
          ),
      ],
      async (req: Request, res: Response): Promise<void> => {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            res.status(400).json(
              new ResponseHandler().sendResponse({
                code: 400,
                message: "Data with proper validation required",
                error: { errors: errors.array() },
                data: null,
                success: false,
                affectedId: null,
              })
            );
            return;
          }

          const reqData: {
            systemUserEmail: string;
            systemUserPassword: string;
          } = req.body;

          const userExist = await systemUserService.findByEmail(
            reqData.systemUserEmail,
            "admin",
            true
          );

          if (!userExist) {
            res.status(404).json(
              new ResponseHandler().sendResponse({
                code: 404,
                message: "No user found with this email",
                error: null,
                data: null,
                success: false,
                affectedId: null,
              })
            );
            return;
          }
          if (!userExist.systemUserPassword) {
            res.status(404).json(
              new ResponseHandler().sendResponse({
                code: 404,
                message:
                  "user need to create password, no password detected in the system",
                error: null,
                data: null,
                success: false,
                affectedId: null,
              })
            );
            return;
          }
          const isCorrectPassword = await passwordHelper.verifyPassword(
            reqData.systemUserPassword,
            userExist.systemUserPassword!
          );

          if (!isCorrectPassword) {
            res.status(401).json(
              new ResponseHandler().sendResponse({
                code: 401,
                message: "Incorrect password",
                error: null,
                data: null,
                success: false,
                affectedId: null,
              })
            );
            return;
          }
          // generating and setting token
          // access token
          const generatedAccessToken = await tokenHelper.generateAccessToken({
            systemUserId: userExist.systemUserId,
            role: userExist.isAdmin ? "admin" : "user",
            activeStatus: true,
          });

          await cookieHelper.setCookie({
            res,
            cookieName: "accessToken",
            cookieValue: generatedAccessToken.accessToken,
            expTime: generatedAccessToken.expiresTime,
          });
          // refresh token
          const generatedRefreshToken = await tokenHelper.generateRefreshToken({
            systemUserId: userExist.systemUserId,
            role: userExist.isAdmin ? "admin" : "user",
          });
          await cookieHelper.setCookie({
            res,
            cookieName: "refreshToken",
            cookieValue: generatedRefreshToken.refreshToken,
            expTime: generatedRefreshToken.expiresTime,
          });
          userExist.systemUserPassword = undefined; // Remove sensitive data
          res.status(200).json(
            new ResponseHandler().sendResponse({
              code: 200,
              message: "Login successful",
              error: null,
              data: userExist,
              success: true,
              affectedId: null,
            })
          );
        } catch (error) {
          res.status(500).json(
            new ResponseHandler().sendResponse({
              code: 500,
              message: "Internal Server Error",
              error: error as string,
              data: null,
              success: false,
              affectedId: null,
            })
          );
        }
      }
    );

    //create
    this.router.post(
      "/",
      handleSingleFileUpload("file"),
      [
        body("systemUserName")
          .trim()
          .isString()
          .withMessage("System User Name must be a string")
          .isLength({ min: 5, max: 30 })
          .withMessage("System User Name must be between 1 and 30 characters"),
        body("systemUserEmail")
          .trim()
          .isEmail()
          .withMessage("System User Email must be a valid email address"),
        body("systemUserAddress")
          .trim()
          .isString()
          .withMessage("System User Address must be a string")
          .notEmpty()
          .withMessage("System User Address cannot be empty"),
        body("systemUserNumber")
          .isInt({ min: 1000000000, max: 9999999999 })
          .withMessage("System User Number must be a valid 10-digit number"),
        body("systemUserImage")
          .optional()
          .isString()
          .withMessage("System User Image must be a string"),
        body("systemUserPassword")
          .optional()
          .isLength({ min: 8, max: 30 })
          .withMessage("System User Password must between 8 to 30 character"),
      ],
      async (req: Request, res: Response): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(400).json(
            new ResponseHandler().sendResponse({
              code: 400,
              message: "Data with proper validation require",
              error: { errors: errors.array() },
              data: null,
              success: false,
              affectedId: null,
            })
          );
          return;
        }
        var reqData: SystemUserInsert = await req.body;
        if (req.file) {
          reqData.systemUserImage = await sanitizePath(
            path.relative(__dirname, req.file.path)
          );
        }
        const existUser: SystemUserInsert | null =
          await systemUserService.findByEmail(reqData.systemUserEmail, "user");
        if (existUser) {
          res.status(302).json(
            new ResponseHandler().sendResponse({
              code: 302,
              message: "Account already exist",
              error: { errors: errors.array() },
              data: null,
              success: false,
              affectedId: null,
            })
          );
          return;
        }
        const createdUser: SystemUserInsert = await systemUserService.create(
          reqData
        );
        res.status(200).json(
          new ResponseHandler().sendResponse({
            code: 200,
            message: "User Registered Successfully",
            error: { errors: errors.array() },
            data: createdUser,
            success: false,
            affectedId: createdUser.systemUserId,
          })
        );
        return;
      }
    );
    //get by token
    this.router.get(
      "/token",
      async (req: any, res: Response): Promise<void> => {
        try {
          const token = await req.tokens;
          var id = null;
          var role = null;
          const decodedAccessToken = await tokenHelper.decodeAccessToken(
            token.accessToken
          );
          const decodedRefreshToken = await tokenHelper.decodeRefreshToken(
            token.refreshToken
          );
          if (decodedAccessToken.id) {
            id = decodedAccessToken.systemUserId;
            role = decodedAccessToken.role;
          }
          if (decodedRefreshToken.id! == null) {
            id = decodedRefreshToken.systemUserId;
            role = decodedRefreshToken.role;
          }
          if (!id) {
            res.status(404).json(
              new ResponseHandler().sendResponse({
                code: 404,
                message: "no user found with this token",
                error: { errors: null },
                data: null,
                success: false,
                affectedId: null,
              })
            );
            return;
          }
          const user = await systemUserService.findByPk(parseInt(id), role);
          if (!user) {
            res.status(404).json(
              new ResponseHandler().sendResponse({
                code: 404,
                message: "no user found",
                error: { errors: null },
                data: null,
                success: false,
                affectedId: null,
              })
            );
            return;
          }
          user!.systemUserPassword = undefined;
          user!.isVerified = undefined;
          user!.activeStatus = undefined;

          res.status(200).json(
            new ResponseHandler().sendResponse({
              code: 200,
              message: "User data",
              error: { errors: null },
              data: user,
              success: true,
              affectedId: user.systemUserId,
            })
          );
          return;
        } catch (error) {}
      }
    );
    // get user by name
    this.router.get(
      "/:name",
      [
        check("name")
          .trim()
          .isString()
          .withMessage("Name must be a string")
          .isLength({ min: 1, max: 30 })
          .withMessage("Name must be between 1 and 30 characters long"),
      ],
      async (req: Request, res: Response) => {
        try {
          // Validate request
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            res.status(400).json(
              new ResponseHandler().sendResponse({
                code: 400,
                message: "Path variable require",
                error: { errors: errors.array() },
                data: null,
                success: false,
                affectedId: null,
              })
            );
            return;
          }
          const role = req.userRole;
          if (!role) {
            res.status(400).json({
              success: false,
              message: "User role is required",
            });
            return;
          }
          const { name } = req.params;
          const user = await systemUserService.findByName(name, role, true);
          if (!user) {
            res.status(404).json(
              new ResponseHandler().sendResponse({
                code: 404,
                message: "user data not found",
                error: { errors: errors.array() },
                data: null,
                success: false,
                affectedId: null,
              })
            );
            return;
          }
          res.status(200).json(
            new ResponseHandler().sendResponse({
              code: 200,
              message: "User Found",
              error: { errors: errors.array() },
              data: user,
              success: true,
              affectedId: null,
            })
          );
          return;
        } catch (error) {
          console.error("Error finding user:", error);
          if (!res.headersSent) {
            res.status(500).json({ message: "Internal server error" });
          }
        }
      }
    );
    // get user by email
    this.router.get(
      "/email/:email",
      [
        check("email")
          .trim()
          .isString()
          .withMessage("email must be a string")
          .isLength({ min: 1, max: 40 })
          .withMessage("email must be between 1 and 40 characters long"),
      ],
      async (req: Request, res: Response) => {
        try {
          // Validate request
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            res.status(400).json(
              new ResponseHandler().sendResponse({
                code: 400,
                message: "Path variable require",
                error: { errors: errors.array() },
                data: null,
                success: false,
                affectedId: null,
              })
            );
            return;
          }
          const role = req.userRole;
          if (!role) {
            res.status(400).json({
              success: false,
              message: "User role is required",
            });
            return;
          }
          if (role !== "admin") {
            res.status(400).json({
              success: false,
              message: "Admin Acess required",
            });
            return;
          }
          const { email } = req.params;
          const user = await systemUserService.findByEmail(email, role);
          if (!user) {
            res.status(404).json(
              new ResponseHandler().sendResponse({
                code: 404,
                message: "user data not found",
                error: { errors: errors.array() },
                data: null,
                success: false,
                affectedId: null,
              })
            );
            return;
          }
          res.status(200).json(
            new ResponseHandler().sendResponse({
              code: 200,
              message: "User Found",
              error: { errors: errors.array() },
              data: user,
              success: true,
              affectedId: user.systemUserId,
            })
          );
          return;
        } catch (error) {
          console.error("Error finding user:", error);
          if (!res.headersSent) {
            res.status(500).json({ message: "Internal server error" });
          }
        }
      }
    );

    // get user by id
    this.router.get(
      "/id/:id",
      [check("id").trim().isInt().withMessage("id can only be a number")],
      async (req: Request, res: Response) => {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            res.status(400).json(
              new ResponseHandler().sendResponse({
                code: 400,
                message: "Path variable require",
                error: { errors: errors.array() },
                data: null,
                success: false,
                affectedId: null,
              })
            );
            return;
          }
          const role = req.userRole;
          if (!role) {
            res.status(400).json({
              success: false,
              message: "User role is required",
            });
            return;
          }

          const { id } = req.params;
          const user = await systemUserService.findByPk(parseInt(id), role);
          if (!user) {
            res.status(404).json(
              new ResponseHandler().sendResponse({
                code: 404,
                message: "user data not found",
                error: { errors: errors.array() },
                data: null,
                success: false,
                affectedId: null,
              })
            );
            return;
          }
          res.status(200).json(
            new ResponseHandler().sendResponse({
              code: 200,
              message: "User Found",
              error: { errors: errors.array() },
              data: user,
              success: true,
              affectedId: user.systemUserId,
            })
          );
          return;
        } catch (error) {
          console.error("Error finding user:", error);
          if (!res.headersSent) {
            res.status(500).json({ message: "Internal server error" });
          }
        }
      }
    );
    // get all users
    this.router.get("/", async (req: Request, res: Response) => {
      try {
        const role = req.userRole;
        if (!role) {
          res.status(400).json({
            success: false,
            message: "User role is required",
          });
          return;
        }
        if (role !== "admin") {
          res.status(400).json({
            success: false,
            message: "Admin Acess required",
          });
          return;
        }
        const sorting: boolean = req.body.sort;

        const user = await systemUserService.findAll(role, sorting);

        if (!user) {
          res.status(404).json(
            new ResponseHandler().sendResponse({
              code: 404,
              message: "Data not found",
              data: null,
              success: false,
              affectedId: null,
            })
          );
          return;
        }

        res.status(200).json(
          new ResponseHandler().sendResponse({
            code: 200,
            message: "Data fetched Sucessfully",
            data: user,
            success: true,
            affectedId: null,
          })
        );
        return;
      } catch (error) {
        console.error("Error finding user:", error);
        if (!res.headersSent) {
          res.status(500).json({ message: "Internal server error" });
        }
      }
    });
    // update
    this.router.put(
      "/:id",
      handleSingleFileUpload("file"),
      [
        check("id").trim().isInt().withMessage("id must be integer"),
        body("systemUserName")
          .trim()
          .isString()
          .withMessage("System User Name must be a string")
          .isLength({ min: 5, max: 30 })
          .withMessage("System User Name must be between 1 and 30 characters"),
        body("systemUserEmail")
          .trim()
          .isEmail()
          .withMessage("System User Email must be a valid email address"),
        body("systemUserAddress")
          .trim()
          .isString()
          .withMessage("System User Address must be a string")
          .notEmpty()
          .withMessage("System User Address cannot be empty"),
        body("systemUserNumber")
          .trim()
          .isInt({ min: 1000000000, max: 9998999999 })
          .withMessage("System User Number must be a valid 10-digit number"),
        body("systemUserImage")
          .optional()
          .isString()
          .withMessage("System User Image must be a string"),
        body("systemUserPassword")
          .optional()
          .isLength({ min: 8, max: 30 })
          .withMessage("System User Password must between 8 to 30 character"),
      ],
      async (req: Request, res: Response): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(400).json(
            new ResponseHandler().sendResponse({
              code: 400,
              message: "Data with proper validation require",
              error: { errors: errors.array() },
              data: null,
              success: false,
              affectedId: null,
            })
          );
          return;
        }
        const role = req.userRole;
        if (!role) {
          res.status(400).json({
            success: false,
            message: "User role is required",
          });
          return;
        }
        const { id } = req.params;
        var reqData: SystemUserInsert = await req.body;
        if (req.file) {
          reqData.systemUserImage = await sanitizePath(
            path.relative(__dirname, req.file.path)
          );
        }
        const existUserById: SystemUserInsert | null =
          await systemUserService.findByPk(reqData.systemUserId!, role);
        const existUserByEmail: SystemUserInsert | null =
          await systemUserService.findByEmail(reqData.systemUserEmail, role);

        if (
          existUserById?.systemUserEmail != existUserByEmail?.systemUserEmail
        ) {
          if (existUserByEmail) {
            res.status(302).json(
              new ResponseHandler().sendResponse({
                code: 302,
                message: "Account already exist with this mail",
                error: { errors: errors.array() },
                data: null,
                success: false,
                affectedId: null,
              })
            );
            return;
          }
          res.status(302).json(
            new ResponseHandler().sendResponse({
              code: 302,
              message: "you cannot change email address",
              error: { errors: errors.array() },
              data: null,
              success: false,
              affectedId: null,
            })
          );
        }
        const updatedUser: SystemUserInsert | null =
          await systemUserService.updateByPk(parseInt(id), role, reqData);
        res.status(200).json(
          new ResponseHandler().sendResponse({
            code: 200,
            message: "User data updated",
            error: { errors: errors.array() },
            data: updatedUser,
            success: true,
            affectedId: updatedUser?.systemUserId,
          })
        );
        return;
      }
    );
    // user data by token
  }
}
export default new SystemUserRouter().router;
