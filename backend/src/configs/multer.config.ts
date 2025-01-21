import multer from 'multer';
import { BadRequestException } from '../exceptions/badRequest.exception';

// Configure multer for PDF upload
export const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new BadRequestException('Only PDF files are allowed'));
    }
  },
});
