import SystemAccess from "../db/models/SystemAccess";
import SystemRole from "../db/models/SystemRole";
import { SystemRoleType } from "../interface/model/systemrole";
import { SystemRoleWithSystemAccess } from "../interface/service/SystemRoleWithSystemAcess";
import { SystemRoleRepository } from "../repository/SystemRoleRepository";

class SystemRoleService extends SystemRoleRepository<SystemRoleType> {
  public async findByPk(id: number): Promise<SystemRoleType | null> {
    console.log("findind");
    try {
      const role = await SystemRole.findByPk(id);
      return role ? (role.toJSON() as SystemRoleType) : null;
    } catch (error) {
      console.error("Error finding system role by id:", error);
      throw error;
    }
  }
  protected findRoleWithSystemAcess(): Promise<SystemRoleType[]> {
    throw new Error("Method not implemented.");
  }
  protected findRoleWithSystemAcessByPk(
    id: number
  ): Promise<SystemRoleWithSystemAccess> {
    throw new Error("Method not implemented.");
  }
  public async findAll(): Promise<SystemRoleType[]> {
    try {
      const users = await SystemRole.findAll();
      const userValues = users.map((user) => user.dataValues);
      return userValues;
    } catch (error) {
      console.error("Error finding system users:", error);
      throw new Error("Internal server error");
    }
  }
  protected updateByPk(id: number): Promise<SystemRoleType> {
    throw new Error("Method not implemented.");
  }
  protected deleteByPk(id: number): Promise<SystemRoleType> {
    throw new Error("Method not implemented.");
  }
  protected findByActive(active: boolean): Promise<SystemRoleType[]> {
    throw new Error("Method not implemented.");
  }
}
export const systemRoleService: SystemRoleService = new SystemRoleService();
