import { Request, Response } from "express";
import AbstractRouter from "./AbstractRouter";
import path from "path";
import { systemRoleService } from "../service/SystemRoleService";
import { systemUserService } from "../service/SystemUserService";
class MainRouter extends AbstractRouter {
  protected initializeRoutes(): void {
    this.router.get("/", (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, "..", "public", "index.html"));
    });
    this.router.get("/test",async (req, res) => {
      console.log(await systemRoleService.findByPk(1));
      res.json(await systemRoleService.findByPk(1));
      // Find the role with systemRoleId of 1
      // const roleIdToFind = 1;
      // SystemRole.findByPk(roleIdToFind, {
      //   include: { model: SystemAccess, as: "system_access" },
      // })
      //   .then((role) => {
      //     if (role) {
      //       console.log("Role found:", role.toJSON());
      //       res.json(role);
      //     } else {
      //       console.log("Role not found.");
      //       res.json([]);
      //     }
      //   })
      //   .catch((error) => {
      //     console.error("Error finding role:", error);
      //   });

      // const roleIdToUpdate = 1;

      // // New role data
      // const newData = {
      //   systemRoleName: "New Role Name",
      //   activeStatus: false, // Set activeStatus to false
      // };

      // // Update role
      // SystemRole.update(newData, {
      //   where: {
      //     systemRoleId: roleIdToUpdate,
      //   },
      // })
      //   .then((result) => {
      //     console.log(`${result[0]} rows updated.`);
      //     res.send("updated")
      //   })
      //   .catch((error) => {
      //     res.send("not updated")
      //     console.error("Error updating role:", error);
      //   });
    });
  }
}
export default new MainRouter().router;
