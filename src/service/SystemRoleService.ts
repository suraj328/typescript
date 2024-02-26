import SystemRole from "../db/models/SystemRole";
import { SystemRoleType } from "../interface/model/systemrole";
import { SystemRoleWithSystemAccess } from "../interface/service/SystemRoleWithSystemAcess";
import { SystemRoleRepository } from "../repository/SystemRoleRepository";

class SystemRoleService extends SystemRoleRepository<SystemRoleType> {
  private readonly systemRole;
  public async create(rolename: string): Promise<SystemRoleType | null> {
    const createdRole = await this.systemRole.create({
      systemRoleName: rolename,
    });
    return createdRole ? (createdRole.toJSON() as SystemRoleType) : null;
  }
  constructor() {
    super();
    this.systemRole = SystemRole;
  }
  protected findRoleWithSystemAcess(): Promise<SystemRoleType[] | null> {
    throw new Error("Method not implemented.");
  }
  protected findRoleWithSystemAcessByPk(
    id: number
  ): Promise<SystemRoleWithSystemAccess | null> {
    throw new Error("Method not implemented.");
  }
  protected updateByPk(id: number): Promise<SystemRoleType | null> {
    throw new Error("Method not implemented.");
  }
  protected deleteByPk(id: number): Promise<SystemRoleType | null> {
    throw new Error("Method not implemented.");
  }
  protected findByActive(active: boolean): Promise<SystemRoleType[] | null> {
    throw new Error("Method not implemented.");
  }
  public async findByPk(id: number): Promise<SystemRoleType | null> {
    try {
      const role = await this.systemRole.findByPk(id);
      return role ? (role.toJSON() as SystemRoleType) : null;
    } catch (error) {
      console.error("Error finding system role by id:", error);
      throw error;
    }
  }
  public async findAll(sort: number): Promise<SystemRoleType[] | null> {
    const sortType: string = sort === -1 ? "DESC" : "ASC";
    try {
      const roles = await this.systemRole.findAll({
        order: [["systemRoleId", `${sortType.toUpperCase()}`]],
      });
      const userValues = roles.map((user) => user.dataValues);
      return userValues;
    } catch (error) {
      console.error("Error finding system roles:", error);
      throw new Error("Internal server error");
    }
  }
}
export const systemRoleService: SystemRoleService = new SystemRoleService();
