/*
    * InternalServerException.ts
    * This file defines a custom exception for internal server errors.
*/

import { HttpDomainException } from "./HttpDomainException.js";

// 500 Internal Server Error
export class InternalServerException extends HttpDomainException {
  public readonly statusCode = 500;
}