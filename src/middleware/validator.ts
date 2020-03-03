// https://www.npmjs.com/package/express-joi-validation

import { RequestHandler, Request } from 'express';
import { compile, ValidationOptions, SchemaLike } from '@hapi/joi';

import {
  RequestBodyValidationError,
  RequestParamsValidationError,
  RequestQueryValidationError,
  RequestHeadersValidationError,
  ApplicationError,
} from '../errors';

type IErrorConstructor = new (message: string, property: string) => ApplicationError;

/**
 * These are the named properties on an express.Request that this module can
 * validate, e.g "body" or "query"
 */
export enum ContainerTypes {
  Body = 'body',
  Query = 'query',
  Headers = 'headers',
  Params = 'params',
}

/**
 * A schema that developers should extend to strongly type the properties
 * (query, body, etc.) of incoming express.Request passed to a request handler.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValidatedRequestSchema = Record<ContainerTypes, any>;

/**
 * Use this in conjunction with *ValidatedRequestSchema* instead of
 * express.Request for route handlers. This ensures *req.query*,
 * *req.body* and others are strongly typed using your
 * *ValidatedRequestSchema*
 */
export interface ValidatedRequest<T extends ValidatedRequestSchema> extends Request {
  body: T[ContainerTypes.Body];
  query: T[ContainerTypes.Query];
  headers: T[ContainerTypes.Headers];
  params: T[ContainerTypes.Params];
}

/**
 * A validator instance that can be used to generate middleware. Is returned by
 * calling *createValidator*
 */
export interface ExpressJoiInstance {
  body: (schema: SchemaLike, cfg?: ValidationOptions) => RequestHandler;
  query: (schema: SchemaLike, cfg?: ValidationOptions) => RequestHandler;
  params: (schema: SchemaLike, cfg?: ValidationOptions) => RequestHandler;
  headers: (schema: SchemaLike, cfg?: ValidationOptions) => RequestHandler;
}

export type ContainersObject = Record<ContainerTypes, { joi: ValidationOptions; ErrorConstructor: IErrorConstructor }>;

// These represent the incoming data containers that we might need to validate
const containers: ContainersObject = {
  query: {
    ErrorConstructor: RequestQueryValidationError,
    joi: {
      convert: true,
      allowUnknown: false,
      abortEarly: false,
    },
  },
  // For use with body-parser
  body: {
    ErrorConstructor: RequestBodyValidationError,
    joi: {
      convert: true,
      allowUnknown: false,
      abortEarly: false,
    },
  },
  headers: {
    ErrorConstructor: RequestHeadersValidationError,
    joi: {
      convert: true,
      allowUnknown: true,
      stripUnknown: false,
      abortEarly: false,
    },
  },
  // URL params e.g "/users/:userId"
  params: {
    ErrorConstructor: RequestParamsValidationError,
    joi: {
      convert: true,
      allowUnknown: false,
      abortEarly: false,
    },
  },
};

/**
 * Builds the validation middleware.
 */
export const validator: ExpressJoiInstance = Object.keys(containers).reduce(
  (prev, curr: 'query' | 'body' | 'headers' | 'params') => {
    prev[curr] = (schema, opts) => {
      return async function innerExpressValidater(req, res, next) {
        try {
          const compiledSchema = compile(schema);
          req[curr] = await compiledSchema.validateAsync(req[curr], opts ?? containers[curr]['joi']);
          next();
        } catch (error) {
          const [detail] = error.details;
          const message = detail.context.message ?? detail.message;
          next(new containers[curr]['ErrorConstructor'](message, detail.context.label));
        }
      };
    };

    return prev;
  },
  {} as ExpressJoiInstance,
);
