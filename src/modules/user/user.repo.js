const BaseRepo = require('../../cores/base/base.repo');

class UserRepo extends BaseRepo {
  constructor() {
    super('users');
  }

  async findAll() {
    const users = await this.db.find().toArray();

    return users;
  }
}

module.exports = UserRepo;
