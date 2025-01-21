import { env } from '../../configs/env.config';
import { Document } from '../../types/document';

export class DocDto {
  private constructor() {}

  public static addS3UrlToDocs(docList: Document[]): Document[] {
    return docList.map((doc) => this.addS3UrlToDoc(doc));
  }

  public static addS3UrlToDoc(doc: Document): Document {
    return {
      ...doc,
      pdfS3Key: env.AWS_S3_BASE_URL + '/' + doc.pdfS3Key,
    };
  }
}
