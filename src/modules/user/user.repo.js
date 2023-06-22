const BaseRepo = require('../../cores/base/base.repo');

class UserRepo extends BaseRepo {
  constructor() {
    super('users');
  }
}

module.exports = UserRepo;
