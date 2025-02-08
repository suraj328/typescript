import { SystemUserInsert } from "../interface/systemuser";
import { CrudRepository } from "./CrudRepository";

export abstract class SystemUserRepository<T> extends CrudRepository<T> {
  protected abstract findByName(
    name: string,
    role: string,
    sort?: boolean
  ): Promise<T[] | null>;
  protected abstract findByEmail(
    email: string,
    role: string,
    loginCredential?: boolean
  ): Promise<T | null>;
  protected abstract create(data: SystemUserInsert): Promise<T>;
}
