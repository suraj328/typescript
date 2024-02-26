export abstract class CrudRepository<T> {
  protected abstract  findAll(sort:number): Promise<T[] | null>;
  protected abstract findByPk(id: number):  Promise<T | null>;
  protected abstract updateByPk(id: number): Promise<T | null> ;
  protected abstract deleteByPk(id: number):  Promise<T | null>;
  protected abstract findByActive(active: boolean): Promise<T[] | null>;
}