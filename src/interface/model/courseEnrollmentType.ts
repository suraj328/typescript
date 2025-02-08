export interface CourseEnrollmentType {
  courseEnrollmentId?: number; // Primary key
  courseId: number; // Foreign key referencing the course table
  systemUserId: number; // Foreign key referencing the system_user table
  activeStatus: boolean; // Active/inactive status
  createdAt?: Date; // Creation timestamp
  updatedAt?: Date; // Update timestamp
  deletedAt?: Date | null; // Deletion timestamp for soft deletes
}
