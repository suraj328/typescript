export interface SystemUserInsert {
  systemUserId?: number;
  systemUserName: string;
  systemUserEmail: string;
  systemUserAddress: string;
  systemUserNumber: number;
  isAdmin?: boolean;
  systemUserPassword?: string;
  systemUserImage?: string;
  activeStatus?: boolean;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface SystemUserData {
  systemUserId?: number;
  systemUserName: string;
  systemUserEmail: string;
  systemUserAddress: string;
  systemUserNumber: number;
  systemUserPassword?: string;
  systemUserImage?: string;
  activeStatus?: boolean;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
