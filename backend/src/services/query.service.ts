import { Response } from 'express';
import { pcIndex } from '../configs/pinecone.config';
import { NotFoundException } from '../exceptions/notFound.exception';
import { DocuemntRepository } from '../repositories/document.repository';
import { QueryRepository } from '../repositories/query.repository';
import { generateEmbedding } from '../utils/openAi.until';
import { openai } from '../configs/openAi.config';
import { Query, QueryQueries } from '../types/query';

/**
 * @class QueryService
 * @description Handles query related business logics
 */
export class QueryService {
  private static instance: QueryService;
  private docRepository: DocuemntRepository;
  private queryRepository: QueryRepository;

  private constructor() {
    this.docRepository = DocuemntRepository.getInstance();
    this.queryRepository = QueryRepository.getInstance();
  }

  public static getInstance(): QueryService {
    if (!QueryService.instance) {
      QueryService.instance = new QueryService();
    }
    return QueryService.instance;
  }

  /**
   * @method queryDoc
   * @param {number} docId - unique id of doc
   * @param {number} userId - unique id of user
   * @param {string} query - query to be asked to document
   * @param {Response} res - response fom express
   * @description - ask question to document and stream the response
   */
  public queryDoc = async (docId: number, userId: number, query: string, res: Response) => {
    const docInfo = await this.docRepository.getDocByDocIdAndUserId(docId, userId);

    if (!docInfo) {
      throw new NotFoundException('Document not found!');
    }

    // inject query to database
    const queryInfo = await this.queryRepository.createQuery({
      docId: docInfo.id,
      query,
    });

    // create embeddings of question (query)
    const queryEmbeddings = await generateEmbedding(query);

    // search sementic from vector database to particlar namespace
    const queryResult = await pcIndex.namespace(String(docId)).query({
      vector: queryEmbeddings,
      topK: 5,
      includeMetadata: true,
    });

    // gather mached text and create context for openai
    const relevantTexts = queryResult.matches.map((match) => match.metadata?.text ?? '');
    const context = relevantTexts.join('\n\n');

    // generate response from openai and stream the response.
    const queryResponse = await this.streamOpenAIResponse(context, query, res);

    // update response of query into database
    await this.queryRepository.updateQueryResponse(queryInfo.id, queryResponse);
  };

  /**
   * @method streamOpenAIResponse
   * @param {string} context - context for getting response
   * @param {string} query - user query for document
   * @param {Response} res - response fom express
   * @returns - stream the response
   * @description - give context and query to openai and genrate the response
   */
  public streamOpenAIResponse = async (context: string, query: string, res: Response) => {
    let fullResponse: string = ''; // Buffer to store full response

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant that answers questions based on the provided context.',
        },
        {
          role: 'user',
          content: `Context:\n${context}\n\nQuestion: ${query}`,
        },
      ],
      stream: true, // Enable streaming
    });

    // Stream the response and accumulate the text
    for await (const chunk of response) {
      const content = chunk.choices[0].delta?.content || '';
      fullResponse += content; // Collect chunk in buffer
      res.write(content); // Stream the content to the client
    }

    res.end(); // End the response stream when done
    return fullResponse; // Return accumulated response text
  };

  public getQueryQueryList = async (query: QueryQueries): Promise<Query[]> => {
    return await this.queryRepository.getQueryListByDocId(query);
  };
}
