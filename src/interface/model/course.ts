export interface CourseType {
  courseId: number;
  courseTitle: string;
  courseDescription?: string; // Optional
  courseThumbnail?: string; // Optional
  coursePrice?: number; // Optional
  activeStatus: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date; // Optional
}
