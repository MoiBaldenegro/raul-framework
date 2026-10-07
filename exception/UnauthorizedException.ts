/*
    * UnauthorizedException.ts
    * This file defines a custom exception for unauthorized errors.
*/

import { HttpDomainException } from "./HttpDomainException";

// 401 Unauthorized
export class UnauthorizedException extends HttpDomainException {
  public readonly statusCode = 401;
}