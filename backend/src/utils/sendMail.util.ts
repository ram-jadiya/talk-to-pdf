import Mail from 'nodemailer/lib/mailer';
import { transporter } from '../configs/nodemailer.config';
import { Logger } from '../configs/logger.config';

export default async function sendEmail(mailOptions: Mail.Options) {
  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    Logger.error('Error sending mail', error ?? {});
  }
}
