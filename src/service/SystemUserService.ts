import { Op } from "sequelize";
import SystemUser from "../db/models/SystemUser";
import { passwordHelper } from "../Helper/PasswordHelper";
import { SystemUserData, SystemUserInsert } from "../interface/systemuser";
import { SystemUserRepository } from "../repository/SystemUserRepository";
import { RoleChecker } from "../util/RoleChecker";
import { tokenHelper } from "../Helper/TokenHelper";

class SystemUserService extends SystemUserRepository<SystemUserData> {
  // find by name
  public findByName(
    name: string,
    role: string,
    sort?: boolean
  ): Promise<SystemUserData[] | null> {
    return new Promise<SystemUserData[] | null>(async (resolve, reject) => {
      try {
        let attributesToExclude: string[] = await RoleChecker.getExcludedFields(
          {
            role: role!,
          }
        );
        const sortType: string = sort ? "ASC" : "DESC";

        const userData = await SystemUser.findAll({
          where: {
            systemUserName: { [Op.startsWith]: name },
          },
          order: [["systemUserName", sortType.toUpperCase()]],
          attributes: { exclude: attributesToExclude },
        });
        const userValues = userData.map(({ dataValues }) => {
          const { systemUserPassword, ...rest } = dataValues;
          return rest;
        });
        resolve(userValues);
      } catch (error) {
        reject(error);
      }
    });
  }
  // find my email
  public findByEmail(
    email: string,
    role: string,
    loginCredential?: boolean
  ): Promise<SystemUserInsert | null> {
    return new Promise<SystemUserInsert | null>(async (resolve, reject) => {
      try {
        let attributesToExclude: string[] = await RoleChecker.getExcludedFields(
          {
            role: role!,
          }
        );
        const userData = await SystemUser.findOne({
          where: {
            systemUserEmail: email,
          },
          attributes: { exclude: attributesToExclude },
        });
        const userValues = userData?.dataValues;
        if (userValues && !loginCredential) {
          userValues.systemUserPassword = undefined;
        }
        resolve(userValues!);
      } catch (error) {
        reject(error);
      }
    });
  }
  // create a new user
  public create(data: SystemUserInsert): Promise<SystemUserInsert> {
    return new Promise<SystemUserInsert>(async (resolve, reject) => {
      try {
        if (data.systemUserPassword) {
          data.systemUserPassword = await passwordHelper.hashPassword(
            data.systemUserPassword
          );
        }
        const createdUser: SystemUserInsert = (await SystemUser.create(data))
          .dataValues;
        createdUser.systemUserPassword = undefined;
        createdUser.activeStatus = undefined;
        createdUser.isVerified = undefined;
        resolve(createdUser);
      } catch (error) {
        reject(error);
        console.error("Error creating user:", error);
        throw new Error("Error creating user");
      }
    });
  }
  // find all user
  public findAll(
    role: string,
    sort?: boolean
  ): Promise<SystemUserData[] | null> {
    return new Promise<SystemUserData[] | null>(async (resolve, reject) => {
      try {
        let attributesToExclude: string[] = await RoleChecker.getExcludedFields(
          {
            role: role!,
          }
        );
        const sortType: string = sort ? "ASC" : "DESC";
        const userData = await SystemUser.findAll({
          order: [["systemUserName", sortType.toUpperCase()]],
          attributes: { exclude: attributesToExclude },
        });
        const userValues = userData.map(({ dataValues }) => {
          const { systemUserPassword, ...rest } = dataValues;
          return rest;
        });
        resolve(userValues);
      } catch (error) {
        reject(error);
      }
    });
  }
  // find by pk
  public findByPk(id: number, role: string): Promise<SystemUserInsert | null> {
    return new Promise<SystemUserInsert | null>(async (resolve, reject) => {
      try {
        let attributesToExclude: string[] = await RoleChecker.getExcludedFields(
          {
            role: role!,
          }
        );
        const userData = await SystemUser.findByPk(id, {
          attributes: { exclude: attributesToExclude },
        });
        const userValues = userData?.dataValues;
        resolve(userValues!);
      } catch (error) {
        reject(error);
      }
    });
  }
  // update By pk
  public updateByPk(
    id: number,
    role: string,
    data: SystemUserInsert
  ): Promise<SystemUserInsert | null> {
    return new Promise<SystemUserInsert | null>(async (resolve, reject) => {
      try {
        if (data.systemUserPassword) {
          data.systemUserPassword = undefined;
          data.systemUserId = undefined;
        }
        if (role !== "admin") {
          data.activeStatus = undefined;
          data.isVerified = undefined;
        }
        const [affectedRows, updatedInstances] = await SystemUser.update(data, {
          where: { systemUserId: id },
          returning: true,
        });
        if (affectedRows === 0) {
          resolve(null);
        }
        const updatedData = await systemUserService.findByPk(id, role);
        resolve(updatedData);
      } catch (error) {
        reject(error);
      }
    });
  }
  protected deleteByPk(id: number): Promise<SystemUserData | null> {
    throw new Error("Method not implemented.");
  }
  protected findByActive(active: boolean): Promise<SystemUserData[] | null> {
    throw new Error("Method not implemented.");
  }
}
export const systemUserService: SystemUserService = new SystemUserService();
