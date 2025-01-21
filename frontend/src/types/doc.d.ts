export type Document = {
  id: number;
  userId: number;
  title: string;
  pages: number;
  createdAt: string; // ISO date string
  pdfS3Key: string;
};

export type Documents = Document[];

export type GetDocumentParams = {
  search?: string;
  skip: number;
  limit: number;
};

export type Chat = {
  query: string;
  response: string;
  id: number;
};

export type Chats = Chat[];

export type GetChatParams = {
  docId: number;
  skip: number;
  limit: number;
};
