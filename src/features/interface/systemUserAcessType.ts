import { SystemRoleType } from "./systemRoleType";

// SystemAccess.interface.ts
export interface SystemAccessType {
  systemAccessId?: number;
  systemUserId?: number;
  systemRoleId?: number;
  activeStatus?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  system_role: SystemRoleType;
}
