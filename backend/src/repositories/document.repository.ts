import { dbPool } from '../configs/pgDB.config';
import { Document } from '../types/document';

export class DocuemntRepository {
  private static instance: DocuemntRepository;

  private constructor() {}

  public static getInstance(): DocuemntRepository {
    if (!DocuemntRepository.instance) {
      DocuemntRepository.instance = new DocuemntRepository();
    }
    return DocuemntRepository.instance;
  }

  /**
   * @method createDocument
   * @param document - Document information
   * @returns document information
   * @description Insert document Info to DB
   */
  async createDocument(document: Omit<Document, 'createdAt' | 'id'>): Promise<Document> {
    const query = `
      INSERT INTO documents (
        "userId",
        title,
        pages,
        "pdfS3Key"
      ) VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const { pages, pdfS3Key, title, userId } = document;

    const values = [userId, title, pages, pdfS3Key];

    const result = await dbPool.query(query, values);
    return result.rows[0];
  }

  /**
   * @method deleteDocumentById
   * @param {number} docId - unique id of doc
   * @param {number} userId - unique id of user
   * @returns deleted document
   * @description Delete document by id
   */
  async delUserDocById(docId: number, userId: number): Promise<Document> {
    const query = `
      DELETE FROM documents WHERE "id" = $1 AND "userId" = $2
      RETURNING *
    `;

    const values = [docId, userId];

    const result = await dbPool.query(query, values);

    return result.rows[0];
  }

  /**
   * @method renameUserDocById
   * @param {number} docId - unique id of doc
   * @param {number} userId - unique id of user
   * @param {string} title - doc title to be renamed
   * @returns - Renamed doc information
   * @description - It update the title of doc and return it if exists
   */
  async renameUserDocById(docId: number, userId: number, title: string): Promise<Document | null> {
    const query = `
      UPDATE documents
        SET
        title = $1
      WHERE id = $2 AND "userId" = $3
      RETURNING *
    `;

    const values = [title, docId, userId];

    const result = await dbPool.query(query, values);

    return result.rows[0] ?? null;
  }

  /**
   * @method queryDocWithPaginationByUserId
   * @param {number} userId - unique id of doc
   * @param {string} searchTerm - doc title search term
   * @param {number} skip - number of doc to be skipped
   * @param {number} limit - number of doc to take after skipping
   * @returns - List of Document
   * @description - fetch list document from db with pagination
   */
  public queryDocWithPaginationByUserId = async (
    userId: number,
    searchTerm: string,
    skip: number,
    limit: number
  ): Promise<Document[]> => {
    const query = `
       SELECT * FROM documents
          WHERE title ILIKE $1 AND "userId" = $4
          ORDER BY "createdAt" DESC
          LIMIT $2 OFFSET $3
    `;

    const values = [`%${searchTerm}%`, limit, skip, userId];

    const result = await dbPool.query(query, values);

    return result.rows;
  };

  /**
   * @method getDocByDocIdAndUserId
   * @param {number} docId - unique id of doc
   * @param {number} userId - unique id of user
   * @returns - List of Document
   * @description - fetch list document from db with pagination
   */
  public getDocByDocIdAndUserId = async (
    docId: number,
    userId: number
  ): Promise<Document | null> => {
    const query = `
       SELECT * FROM documents
          WHERE id = $1 AND "userId" = $2
    `;

    const values = [docId, userId];

    const result = await dbPool.query(query, values);

    return result.rows[0] ?? null;
  };

  public countDocsByUserId = async (userId: number): Promise<number> => {
    const query = `
       SELECT COUNT(*) FROM documents
          WHERE "userId" = $1
    `;

    const values = [userId];

    const result = await dbPool.query(query, values);

    return Number(result.rows[0].count);
  };
}
