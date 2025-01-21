import { v4 as uuidv4 } from 'uuid';
import { pcIndex } from '../configs/pinecone.config';
import { Document } from '../types/document';
import { generateEmbedding } from '../utils/openAi.until';

/**
 * @class PineConeService
 * @description Handles Pinecone database actions
 */
export class PineConeService {
  private static instance: PineConeService;

  private constructor() {}

  public static getInstance(): PineConeService {
    if (!PineConeService.instance) {
      PineConeService.instance = new PineConeService();
    }
    return PineConeService.instance;
  }

  /**
   * @method createDocVector
   * @param {Document} documentInfo - Document metadata
   * @param {string} pdfText - pdf content to inject into vector database
   * @description - divide pdf by pages and inject into vector database
   */
  public createDocVector = async (documentInfo: Document, pdfText: string) => {
    // Split the text into chunks (paragraphs or pages)
    const pdfChunks = pdfText.split('\n\n').filter((chunk) => chunk.trim());

    // creating embbeded vector from text
    const embbededChunks = await Promise.all(pdfChunks.map(async (it) => generateEmbedding(it)));

    // vector injection to pinecone db
    await pcIndex.namespace(String(documentInfo.id)).upsert(
      embbededChunks.map((it, index) => {
        return {
          id: uuidv4(),
          values: it,
          metadata: {
            documentId: documentInfo.id,
            title: documentInfo.title,
            userId: documentInfo.userId,
            text: pdfChunks[index],
          },
        };
      })
    );
  };

  /**
   * @method delDocVector
   * @param {number} docId - unique id of doc
   * @description - delete vectors of doc referenced to docId from vector DB
   */
  public delDocVector = async (docId: number) => {
    try {
      await pcIndex.namespace(String(docId)).deleteAll();
    } catch (e) {
      console.log(e);
    }
  };
}
