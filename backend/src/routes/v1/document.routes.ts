import { Router } from 'express';
import { Route } from '../../types';
import { DocumentController } from '../../controllers/document.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { upload } from '../../configs/multer.config';
import { validate } from '../../middlewares/validation.middleware';
import { docIdSchema, renameDocSchema, searchDocSchema } from '../../validations/docValidations';

class DocumentRoutes implements Route {
  public router = Router();
  public path = '/document';
  private documentController: DocumentController;

  constructor() {
    this.documentController = DocumentController.getInstance();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(authMiddleware);

    this.router.get('/', validate({ query: searchDocSchema }), this.documentController.getDocs);

    this.router.post('/upload', upload.single('pdf'), this.documentController.uploadDocument);

    this.router.delete(
      '/:id',
      validate({ params: docIdSchema }),
      this.documentController.delDocument
    );

    this.router.patch(
      '/:id/rename',
      validate({ params: docIdSchema, body: renameDocSchema }),
      this.documentController.updateDocTitle
    );
  }
}

export default DocumentRoutes;
