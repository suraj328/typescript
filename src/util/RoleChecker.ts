export class RoleChecker {
  public static getExcludedFields({
    role,
  }: {
    role: string;
  }): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      switch (role) {
        case "admin":
          resolve(["deletedAt"]);
          break;
        case "user":
          resolve(["activeStatus", "createdAt", "updatedAt", "deletedAt"]);
          break;
        case "guest":
          resolve(["activeStatus", "createdAt", "updatedAt", "deletedAt"]);
          break;
        default:
          resolve(["activeStatus", "createdAt", "updatedAt", "deletedAt"]);
      }
    });
  }
}
