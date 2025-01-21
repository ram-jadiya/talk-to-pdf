export type Query = {
  id: number;
  docId: number;
  query: string;
  response: string;
  createdAt: Date;
};

export type QueryQueries = {
  docId: number;
  skip: number;
  limit: number;
};
