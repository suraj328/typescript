import { SystemRoleWithSystemAccess } from "../interface/service/SystemRoleWithSystemAcess";
import { CrudRepository } from "./CrudRepository";
export abstract class SystemRoleRepository<T> extends CrudRepository<T> {
  protected abstract findRoleWithSystemAcess(): Promise<T[] | null>;
  protected abstract create(rolename:string): Promise<T | null>;
  protected abstract findRoleWithSystemAcessByPk(
    id: number
  ): Promise<SystemRoleWithSystemAccess | null>;
}
