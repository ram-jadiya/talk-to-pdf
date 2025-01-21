import { dbPool } from '../configs/pgDB.config';
import { Query, QueryQueries } from '../types/query';

export class QueryRepository {
  private static instance: QueryRepository;

  private constructor() {}

  public static getInstance(): QueryRepository {
    if (!QueryRepository.instance) {
      QueryRepository.instance = new QueryRepository();
    }
    return QueryRepository.instance;
  }

  /**
   * @method createQuery
   * @param {Omit<Query, 'id' | 'createdAt' | 'response'>} queryInfo - query information
   * @returns - created query
   * @description - Inject query into database
   */
  public createQuery = async (
    queryInfo: Omit<Query, 'id' | 'createdAt' | 'response'>
  ): Promise<Query> => {
    const query = `
      INSERT INTO queries (
        "docId",
        query,
        response
      ) VALUES ($1, $2, $3)
      RETURNING *
    `;

    const { docId, query: question } = queryInfo;

    const values = [docId, question, ''];

    const result = await dbPool.query(query, values);
    return result.rows[0];
  };

  /**
   * @method updateQueryResponse
   * @param {number} queryId - unique id of query
   * @param {string} response - query response to be update
   * @returns - updated query information
   * @description - update response of query
   */
  public updateQueryResponse = async (queryId: number, response: string): Promise<Query> => {
    const query = `
     UPDATE queries SET
      response = $1
      WHERE id = $2
    `;

    const values = [response, queryId];

    const result = await dbPool.query(query, values);
    return result.rows[0];
  };

  /**
   * @method getQueryListByDocId
   * @param {QueryQueries} - query Queries info with pagination
   * @returns - return query list
   * @description - fetch query list from db with pagination
   */
  public getQueryListByDocId = async ({ docId, limit, skip }: QueryQueries): Promise<Query[]> => {
    const query = `
       SELECT * FROM queries
          WHERE "docId" = $1
          ORDER BY "createdAt" DESC
          LIMIT $2 OFFSET $3
    `;

    const values = [docId, limit, skip];

    const result = await dbPool.query(query, values);

    return result.rows;
  };
}
