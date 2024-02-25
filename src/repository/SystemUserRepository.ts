import { CrudRepository } from "./CrudRepository";

export abstract class SystemUserRepository<T> extends CrudRepository<T> {
  protected abstract findByUsername(): T;
  protected abstract findByEmail(): T;
}
