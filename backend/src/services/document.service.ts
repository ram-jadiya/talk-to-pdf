/* eslint-disable no-undef */

import { BadRequestException } from '../exceptions/badRequest.exception';
import { NotFoundException } from '../exceptions/notFound.exception';
import { DocuemntRepository } from '../repositories/document.repository';
import { Document } from '../types/document';
import { delDocumentFromS3, uploadDocumentToS3 } from '../utils/s3Upload.util';
import { extractTextFromPDF } from '../utils/util';
import { PineConeService } from './pinecone.service';

/**
 * @class DocumentService
 * @description Handles Document level business logic
 */
export class DocumentService {
  private static instance: DocumentService;
  private documentRepository: DocuemntRepository;
  private pineConeService: PineConeService;

  private constructor() {
    this.documentRepository = DocuemntRepository.getInstance();
    this.pineConeService = PineConeService.getInstance();
  }

  public static getInstance(): DocumentService {
    if (!DocumentService.instance) {
      DocumentService.instance = new DocumentService();
    }
    return DocumentService.instance;
  }

  public validatingUserPayment = async (userId: number, isPremiumUser: boolean) => {
    // free user can create 1 free document
    const count = await this.documentRepository.countDocsByUserId(userId);

    if (count >= 2 && isPremiumUser == false) {
      throw new BadRequestException('You reached to free limit!');
    }
  };

  /**
   * @method createDocument
   * @param {number} userId - unique id of user
   * @param {Express.Multer.File} doc - doc file
   * @returns - Created Document information
   * @description - upload file to s3 bucket, database and vector database
   */
  public createDocument = async (userId: number, doc: Express.Multer.File): Promise<Document> => {
    // upload to s3 bucket
    const s3Key = await uploadDocumentToS3(doc);

    const pdfInfo = await extractTextFromPDF(doc.buffer);
    const docTitle = doc.originalname.split('.')[0];

    // inject to database
    const docInfo = await this.documentRepository.createDocument({
      userId,
      pages: pdfInfo.numpages,
      pdfS3Key: s3Key,
      title: docTitle,
    });

    // injection of pdf chunks into vector db
    await this.pineConeService.createDocVector(docInfo, pdfInfo.text);

    return docInfo;
  };

  /**
   * @method delUserDocument
   * @param {number} docId - unique id of doc
   * @param {number} userId - unique id of user
   * @returns - deleted document info
   * @description - delete user document from DB, vector DB and from s3 bucket
   */
  public delUserDocument = async (docId: number, userId: number) => {
    // del document from db

    console.log(docId, userId)
    const docInfo = await this.documentRepository.delUserDocById(docId, userId);

    if (docInfo) {
      // del all vector of document
      await this.pineConeService.delDocVector(docId);

      // del doc from s3 bucket
      await delDocumentFromS3(docInfo.pdfS3Key);
    }

    return docInfo;
  };

  /**
   * @method renameDoc
   * @param {number} docId - unique id of doc
   * @param {number} userId - unique id of user
   * @param {string} title - doc title to be renamed
   * @returns - Renamed doc information
   * @description - update the title of doc and return it if exists
   */
  public renameDoc = async (title: string, docId: number, userId: number) => {
    const docInfo = await this.documentRepository.renameUserDocById(docId, userId, title);

    if (!docInfo) {
      throw new NotFoundException('Document not found!');
    }

    return docInfo;
  };

  /**
   * @method getDocs
   * @param {number} userId - unique id of user
   * @param {string} searchTerm - search term for title
   * @param {number} skip - number of doc to be skipped
   * @param {number} limit - number of doc to take after skipping doc
   * @returns - return user document list
   * @description - get user docs with pagination
   */
  public getDocs = async (
    userId: number,
    searchTerm: string,
    skip: number,
    limit: number
  ): Promise<Document[]> => {
    return await this.documentRepository.queryDocWithPaginationByUserId(
      userId,
      searchTerm,
      skip,
      limit
    );
  };
}
