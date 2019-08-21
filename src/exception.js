/**
 * @desc base exceptions
 * @param {string} message
 * @return {void}
 */
class Exception extends Error {
  constructor(message, code) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = Exception.name;
    this.code = code;
  }

  setCode(code) {
    this.code = code;
  }

  setMessage(message) {
    this.message = message;
  }
}

class NetworkException extends Exception {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = NetworkException.name;
  }
}

class InternetConnectionException extends NetworkException {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = InternetConnectionException.name;
  }
}

class AuthenticationException extends Exception {
  constructor(message, code) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = AuthenticationException.name;
    this.code = code;
  }
}

class AuthorizationException extends Exception {
  constructor(message, code) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = AuthorizationException.name;
    this.code = code;
  }
}

class ServerException extends Exception {
  constructor(message, code) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = ServerException.name;
    this.code = code;
  }
}

class BadRequestException extends Exception {
  constructor(message, fields) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = BadRequestException.name;
    this.fields = fields;
  }
}

export {
  NetworkException,
  AuthenticationException,
  AuthorizationException,
  InternetConnectionException,
  BadRequestException,
  ServerException,
};

export default Exception;
