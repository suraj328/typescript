export interface PortfolioType {
  portfolioId?: number;
  portfolioFile: string;
  activeStatus?: boolean;
  isImage: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
