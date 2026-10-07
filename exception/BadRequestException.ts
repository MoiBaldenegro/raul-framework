/*
    * BadRequestException.ts
    * This file defines a custom exception for bad request errors.
*/
import { HttpDomainException } from "./HttpDomainException.js";

// 400 Bad Request / Validation
export class BadRequestException extends HttpDomainException {
  public readonly statusCode = 400;
}