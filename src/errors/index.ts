import { camelToSnake } from '../utils';

export class ApplicationError extends Error {
  constructor(public message = 'Internal server error', public status = 500, public code = 'INTERNAL_SERVER_ERROR') {
    super();
  }
}

export class BadRequestError extends ApplicationError {
  constructor(
    public message = 'We are unable to locate requested resource',
    public status = 400,
    public code = 'BAD_REQUEST',
  ) {
    super();
  }
}

export class NotFoundError extends ApplicationError {
  constructor(
    public message = 'We are unable to locate requested resource',
    public status = 404,
    public code = 'NOT_FOUND',
  ) {
    super();
  }
}

/**
 * Request body validation error.
 * Use if request body does not pass validation.
 */
export class RequestBodyValidationError extends BadRequestError {
  public code: string;
  public constructor(public message: string, fieldName: string) {
    super();
    this.code = `${camelToSnake(fieldName)}_request_body_validation_error`;
  }
}

/**
 * Request query validation error.
 * Use if request query does not pass validation.
 */
export class RequestQueryValidationError extends BadRequestError {
  public code: string;
  public constructor(public message: string, fieldName: string) {
    super();
    this.code = `${camelToSnake(fieldName)}_request_query_validation_error`;
  }
}

/**
 * Request params validation error.
 * Use if request params does not pass validation.
 */
export class RequestParamsValidationError extends BadRequestError {
  public code: string;
  public constructor(public message: string, fieldName: string) {
    super();
    this.code = `${camelToSnake(fieldName)}_request_params_validation_error`;
  }
}

/**
 * Request headers validation error.
 * Use if request headers does not pass validation.
 */
export class RequestHeadersValidationError extends BadRequestError {
  public code: string;
  public constructor(public message: string, fieldName: string) {
    super();
    this.code = `${camelToSnake(fieldName)}_request_headers_validation_error`;
  }
}

export class ConflictError extends ApplicationError {
  constructor(public message = 'We have conflict with other resource', public status = 409, public code = 'CONFLICT') {
    super();
  }
}
