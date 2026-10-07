/*
    * NotFoundException.ts
    * This file defines a custom exception for not found errors.
*/

import { HttpDomainException } from "./HttpDomainException";

// 404 Not Found
export class NotFoundException extends HttpDomainException {
  public readonly statusCode = 404;
}