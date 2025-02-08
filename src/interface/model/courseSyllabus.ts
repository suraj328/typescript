export interface CourseSyllabusType {
  cousrseSyllabusId?: number;
  courseSyllabusTitle: string;
  courseId: number;
  activeStatus: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
