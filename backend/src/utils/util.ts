/* eslint-disable @typescript-eslint/no-explicit-any */
import PdfParse from 'pdf-parse';
import pdf from 'pdf-parse';

/**
 * @method generateOtp
 * @returns {string} A 6-digit OTP code as a string
 * @description Generates a random 6-digit OTP code
 */
export const generateOtp = (): string => {
  // Generate a random 6-digit number and pad it with leading zeros if necessary
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * @method extractTextFromPDF
 * @param {Buffer} buffer - Buffer of pdf
 * @returns {string[]} text of pdf
 * @description extract text from pdf
 */
export async function extractTextFromPDF(buffer: Buffer): Promise<PdfParse.Result> {
  return await pdf(buffer, {
    pagerender: function (pageData: any) {
      // Return text with better formatting
      return pageData.getTextContent().then(function (textContent: any) {
        let lastY,
          text = '';
        for (let item of textContent.items) {
          if (lastY == item.transform[5] || !lastY) {
            text += item.str;
          } else {
            text += '\n' + item.str;
          }
          lastY = item.transform[5];
        }
        return text;
      });
    },
  });
}
