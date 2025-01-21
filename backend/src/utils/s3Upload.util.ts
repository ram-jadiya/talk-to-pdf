import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '../configs/s3.config';
import { env } from '../configs/env.config';

// Upload PDF to S3 function
// eslint-disable-next-line no-undef
export async function uploadDocumentToS3(file: Express.Multer.File): Promise<string> {
  const uniqueKey = `${Date.now()}-${file.originalname}`;

  const uploadParams = {
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: uniqueKey, // Unique path in S3 bucket
    Body: file.buffer,
    ContentType: file.mimetype, // Set content type based on the uploaded file
  };

  const command = new PutObjectCommand(uploadParams);
  await s3Client.send(command);

  return uniqueKey;
}

export async function delDocumentFromS3(key: string): Promise<void> {
  const deleteParams = {
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: key,
  };

  const command = new DeleteObjectCommand(deleteParams);

  await s3Client.send(command);
}
