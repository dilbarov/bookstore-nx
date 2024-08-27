import { MicroserviceBaseError } from '@bookstore-nx/microservices';
import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { Response } from 'express';

@Catch(MicroserviceBaseError)
export class MicroserviceExceptionFilter implements GqlExceptionFilter {
  public catch(exception: MicroserviceBaseError, host: ArgumentsHost): void {
    const gqlHost = GqlArgumentsHost.create(host);
    const response = gqlHost.getContext().res as Response;
    const statusCode = exception.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    const errorResponse = {
      statusCode,
      message: exception.message,
      error: exception.code,
    };

    response.status(statusCode).json(errorResponse);
  }
}
