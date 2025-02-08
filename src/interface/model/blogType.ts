export interface BlogType {
  blogId?: number; // Primary key, auto-increment
  blogHeading: string; // Blog title
  blogDescription: string; // Blog description
  blogImage: string; // URL or path to the blog image
  blogExternalLink?: string | null; // Optional external link
  createdAt?: Date; // Record creation date
  updatedAt?: Date; // Record last update date
  deletedAt?: Date | null; // Optional soft-delete timestamp
}
