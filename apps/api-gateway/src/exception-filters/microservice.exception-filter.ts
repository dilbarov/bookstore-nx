import { MicroserviceBaseError } from '@bookstore-nx/microservices';
import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { Response } from 'express';

@Catch(MicroserviceBaseError)
export class MicroserviceExceptionFilter implements GqlExceptionFilter {
  catch(exception: MicroserviceBaseError, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const response = gqlHost.getContext().res as Response;
    console.log(exception);
    const status = exception.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    const errorResponse = {
      statusCode: status,
      message: exception.message,
      error: exception.code,
    };

    response.status(status).json(errorResponse);
  }
}
