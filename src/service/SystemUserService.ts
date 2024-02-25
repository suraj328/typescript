import { SystemUserData, SystemUserInsert } from "../interface/systemuser";
import SystemUser from "../db/models/SystemUser";
import { SystemUserRepository } from "../repository/SystemUserRepository";

class SystemUserService extends SystemUserRepository<SystemUserData> {
  protected findByPk(id: number): Promise<SystemUserData> {
    throw new Error("Method not implemented.");
  }
  protected updateByPk(id: number): Promise<SystemUserData> {
    throw new Error("Method not implemented.");
  }
  protected deleteByPk(id: number): Promise<SystemUserData> {
    throw new Error("Method not implemented.");
  }
  protected findByActive(active: boolean): Promise<SystemUserData[]> {
    throw new Error("Method not implemented.");
  }
  protected createNew(): SystemUserData {
    throw new Error("Method not implemented.");
  }
  protected findByUsername(): SystemUserData {
    throw new Error("Method not implemented.");
  }
  protected findByEmail(): SystemUserData {
    throw new Error("Method not implemented.");
  }
  public async findAll(): Promise<SystemUserData[]> {
    try {
      const users = await SystemUser.findAll();
      const userValues = users.map((user) => user.dataValues);
      return userValues;
    } catch (error) {
      console.error("Error finding system users:", error);
      throw new Error("Internal server error");
    }
  }
}
export const systemUserService: SystemUserService = new SystemUserService();
