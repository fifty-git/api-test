const httpContext = require('express-http-context');

class Context {
  constructor() {
    this._currentUserContextName = 'currentUser';
  }

  get currentUser() {
    return httpContext.get(this._currentUserContextName);
  }

  set currentUser(user) {
    return httpContext.set(this._currentUserContextName, user);
  }
}

module.exports = Context;
