export class HttpException extends Error {
  public status: number;
  public message: string;
  public hasError: boolean;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
    this.hasError = true;
  }
}
