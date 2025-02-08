export interface CareerType {
  careerId?: number;
  careerTitle: string;
  careerDescription: string;
  careerThumbnail: string;
  careerExpires?: Date;
  activeStatus?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
