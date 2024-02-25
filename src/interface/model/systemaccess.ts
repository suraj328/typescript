// SystemAccess.interface.ts
export interface SystemAccessType {
  systemAccessId?: number;
  systemRoleId?: number;
  activeStatus?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
