const BaseRepo = require('../../cores/base/base.repo');
const UserEntity = require('./user.entity');
class UserRepo extends BaseRepo {
  constructor() {
    super(UserEntity, 'users');
  }
}

module.exports = UserRepo;
