export class MicroserviceBaseError extends Error {
  public readonly code: string;
  public readonly statusCode: number;

  public constructor(message: string, code: string, statusCode: number) {
    super(code);
    this.code = code;
    this.message = message;
    this.statusCode = statusCode;

    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;

    // This clips the constructor invocation from the stack trace.
    Error.captureStackTrace(this, this.constructor);
  }
}
