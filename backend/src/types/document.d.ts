export type Document = {
  id: number;
  userId: number;
  title: string;
  pages: number;
  pdfS3Key: string;
  createdAt: Date;
};

export interface QueryDocument {
  search: string;
  skip: number;
  limit: number;
}
