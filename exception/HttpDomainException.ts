export abstract class HttpDomainException extends Error {
  public abstract readonly statusCode: number;
  public readonly details?: Record<string, unknown>;

  constructor(message: string, details?: Record<string, unknown>) {
    super(message);
    this.name = this.constructor.name;
    this.details = details;
  }

  /**
   * Serializa la excepción siguiendo el estándar RFC 7807 (Problem Details).
   */
  public toProblemDetails(instancePath?: string) {
    return {
      type: `https://errors.yourdomain.com/${this.camelToKebabCase(this.name)}`,
      title: this.name,
      status: this.statusCode,
      detail: this.message,
      instance: instancePath,
      ...(this.details && { invalidParams: this.details }),
    };
  }

  private camelToKebabCase(str: string): string {
    return str.replace(/[A-Z]/g, (letter, index) =>
      index === 0 ? letter.toLowerCase() : `-${letter.toLowerCase()}`
    );
  }
}
