import { SystemAccessType } from "../model/systemaccess";
export interface SystemRoleWithSystemAccess {
  systemRoleId?: string;
  systemRoleName?: string;
  activeStatus?: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  system_access: SystemAccessType[];
}
