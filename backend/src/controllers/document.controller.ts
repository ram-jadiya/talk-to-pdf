import { NextFunction, Response } from 'express';
import { responseHandler } from '../utils/response.util';
import { RequestWithUser } from '../types/user';
import { DocumentService } from '../services/document.service';
import { QueryDocument } from '../types/document';
import { DocDto } from '../dtos/docs/docs.dto';

/**
 * @class DocumentController
 * @description Handles HTTP requests and responses
 */
export class DocumentController {
  private static instance: DocumentController;
  private documentService: DocumentService;

  private constructor() {
    this.documentService = DocumentService.getInstance();
  }

  /**
   * @method getInstance
   * @descriptionHandle Get PaymentController instance
   */
  public static getInstance(): DocumentController {
    if (!DocumentController.instance) {
      DocumentController.instance = new DocumentController();
    }
    return DocumentController.instance;
  }

  /**
   * @method uploadDocument
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Next middleware function
   * @descriptionHandle it upload the pdf to cloud and convert it into vectors
   */
  public uploadDocument = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const file = req.file!;
      const { id: userId, isPremium } = req.user!;

      // payment validation
      await this.documentService.validatingUserPayment(userId, isPremium);

      // creating document
      const docInfo = await this.documentService.createDocument(userId, file);

      res.status(200).json(responseHandler(DocDto.addS3UrlToDoc(docInfo)));
    } catch (error) {
      next(error);
    }
  };

  /**
   * @method delDocument
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Next middleware function
   * @descriptionHandle it remove document from cloud, database and vector db
   */
  public delDocument = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const userId = req.user!.id;

      await this.documentService.delUserDocument(id, userId);

      res.status(200).json(responseHandler());
    } catch (error) {
      next(error);
    }
  };

  /**
   * @method updateDocTitle
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Next middleware function
   * @descriptionHandle it rename the title of doc
   */
  public updateDocTitle = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const docId = req.params.id as unknown as number;
      const userId = req.user!.id;
      const { title } = req.body;

      const docInfo = await this.documentService.renameDoc(title, docId, userId);

      res.status(200).json(responseHandler(docInfo));
    } catch (error) {
      next(error);
    }
  };

  /**
   * @method getDocs
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Next middleware function
   * @descriptionHandle it get the list of docs with pagination
   */
  public getDocs = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const { search, skip, limit } = req.query as unknown as QueryDocument;

      const docList = await this.documentService.getDocs(userId, search, skip, limit);

      res.status(200).json(responseHandler(DocDto.addS3UrlToDocs(docList)));
    } catch (error) {
      next(error);
    }
  };
}
