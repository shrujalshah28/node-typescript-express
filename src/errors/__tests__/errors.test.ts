import {
  ApplicationError,
  RequestBodyValidationError,
  RequestQueryValidationError,
  RequestParamsValidationError,
  RequestHeadersValidationError,
  ConflictError,
} from '..';

describe('ApplicationError test suite', () => {
  test('sets default error message', () => {
    const error = new ApplicationError();
    expect(error.message).toBe('Internal server error');
  });

  test('sets 500 as default status code', () => {
    const message = 'error message';
    const error = new ApplicationError(message);
    expect(error.status).toBe(500);
  });

  test('sets default error code', () => {
    const error = new ApplicationError();
    expect(error.code).toBe('INTERNAL_SERVER_ERROR');
  });

  test('sets correct message', () => {
    const message = 'error message';
    const error = new ApplicationError(message);
    expect(error.message).toBe(message);
  });

  test('sets correct status', () => {
    const message = 'error message';
    const status = 400;
    const error = new ApplicationError(message, status);
    expect(error.status).toBe(status);
  });

  test('sets correct code', () => {
    const message = 'error message';
    const status = 400;
    const code = 'BAD_REQUEST';
    const error = new ApplicationError(message, status, code);
    expect(error.code).toBe(code);
  });

  test('sets correct error for body validation error', () => {
    const message = 'Name is requeired';
    const fieldName = 'name';
    const error = new RequestBodyValidationError(message, fieldName);
    expect(error.status).toBe(400);
    expect(error.code).toBe('name_request_body_validation_error');
  });

  test('sets correct error for query validation error', () => {
    const message = 'Name is requeired';
    const fieldName = 'name';
    const error = new RequestQueryValidationError(message, fieldName);
    expect(error.status).toBe(400);
    expect(error.code).toBe('name_request_query_validation_error');
  });

  test('sets correct error for params validation error', () => {
    const message = 'Name is requeired';
    const fieldName = 'name';
    const error = new RequestParamsValidationError(message, fieldName);
    expect(error.status).toBe(400);
    expect(error.code).toBe('name_request_params_validation_error');
  });

  test('sets correct error for headers validation error', () => {
    const message = 'Name is requeired';
    const fieldName = 'name';
    const error = new RequestHeadersValidationError(message, fieldName);
    expect(error.status).toBe(400);
    expect(error.code).toBe('name_request_headers_validation_error');
  });

  test('sets 409 as default status code in conflict error', () => {
    const message = 'error message';
    const error = new ConflictError(message);
    expect(error.status).toBe(409);
  });
});
