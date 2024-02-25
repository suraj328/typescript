export abstract class CrudRepository<T> {
  public abstract  findAll(): Promise<T[]>;
  protected abstract findByPk(id: number):  Promise<T | null>;
  protected abstract updateByPk(id: number): Promise<T> ;
  protected abstract deleteByPk(id: number):  Promise<T>;
  protected abstract findByActive(active: boolean): Promise<T[]>;
}
