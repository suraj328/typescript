import { SystemAccessType } from "./systemUserAcessType";
export interface userDataType {
  systemUserId?: number;
  firstName: string;
  lastName: string;
  username: string;
  ipi?: number;
  mobileNumber?: number;
  systemUserProId: number;
  email: string;
  country: string;
  city: string;
  recordLabel?: string;
  publisher?: string;
  profilePath?: string;
  biography?: string;
  password?: string;
  otp?: string;
  dob: Date;
  verificationStatus?: boolean;
  deactiveStatus?: boolean;
  activeStatus?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  // oAuth
  oAuthProviderId?: number;
  oAuthId?: string;
  oAuthAccessToken?: string;
  system_user_system_access: SystemAccessType[];
}
