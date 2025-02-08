export interface CourseSyllabusContentType {
    cousrseSyllabusId?: number; // Primary key, auto-incremented
    cousrseSyllabusTitle: string; // Title of the course syllabus content
    courseId: number; // Foreign key referencing the course_syllabus table
    activeStatus: boolean; // Status of the course syllabus content (active/inactive)
    createdAt?: Date; // Timestamp of when the record was created
    updatedAt?: Date; // Timestamp of when the record was last updated
    deletedAt?: Date | null; // Timestamp of when the record was deleted (for soft deletes)
  }
  