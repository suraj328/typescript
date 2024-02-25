import { SystemRoleWithSystemAccess } from "../interface/service/SystemRoleWithSystemAcess";
import { CrudRepository } from "./CrudRepository";
export abstract class SystemRoleRepository<T> extends CrudRepository<T> {
  protected abstract findRoleWithSystemAcess(): Promise<T[]>;
  protected abstract findRoleWithSystemAcessByPk(id:number): Promise<SystemRoleWithSystemAccess>;
}
