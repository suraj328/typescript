export interface CareerApplicantType {
  careerApplicantId?: number;
  careerApplicantName: string;
  careerApplicantEmail: string;
  careerApplicantCoverLetter: string;
  careerApplicantCv: string;
  careerId: number;
  careerApplicantExperience: number;
  isShortlisted?: boolean;
  isInterviewed?: boolean;
  isSelected?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
