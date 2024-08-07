export class PublicError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class AuthenticationError extends PublicError {
  constructor() {
    super("You must be logged in to view this content");
    this.name = "AuthenticationError";
  }
}

export class AccessDeniedError extends PublicError {
  constructor() {
    super("You are not allowed to view this content");
    this.name = "AccessDeniedError";
  }
}

export class EmailInUseError extends PublicError {
  constructor() {
    super("Email is already in use");
    this.name = "EmailInUseError";
  }
}

export class NotFoundError extends PublicError {
  constructor() {
    super("Resource not found");
    this.name = "NotFoundError";
  }
}

export class InvalidTokenError extends PublicError {
  constructor() {
    super("Invalid token");
    this.name = "InvalidTokenError";
  }
}

export class TokenExpiredError extends PublicError {
  constructor() {
    super("Token has expired, Please login again");
    this.name = "TokenExpiredError";
  }
}

export class UserNotFoundError extends PublicError {
  constructor() {
    super("User not found");
    this.name = "UserNotFoundError";
  }
}

export class LoginError extends PublicError {
  constructor() {
    super("Invalid email or password");
    this.name = "LoginError";
  }
}

export class EmailAlreadyRegisteredError extends PublicError {
  constructor() {
    super("This email is already registered");
    this.name = "EmailAlreadyRegisteredError";
  }
}
