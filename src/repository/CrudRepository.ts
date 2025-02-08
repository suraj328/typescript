export abstract class CrudRepository<T> {
  protected abstract findAll(role: string, sort?: boolean): Promise<T[] | null>;
  protected abstract findByPk(id: number, role: string): Promise<T | null>;
  protected abstract updateByPk(
    id: number,
    role: string,
    data: T
  ): Promise<T | null>;
  protected abstract deleteByPk(id: number, role: string): Promise<T | null>;
  protected abstract findByActive(
    active: boolean,
    role: string,
    sort: boolean
  ): Promise<T[] | null>;
}
