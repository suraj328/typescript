export interface EmployeeType {
  employeeId?: number; // Primary key, auto-increment
  employeeName: string; // Name of the employee
  employeePosition: string; // Position of the employee
  employeeDescription: string; // Description or cover letter
  employeeImage: string; // Path or URL to the employee image
  createdAt?: Date; // Record creation date
  updatedAt?: Date; // Record last update date
  deletedAt?: Date | null; // Optional soft-delete timestamp
}
