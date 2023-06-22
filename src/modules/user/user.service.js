const jwt = require('jsonwebtoken');
const BaseService = require('../../core/base/base.service');
const UserRepo = require('./user.repo');
const { AppError } = require('../../core/errors');

class UserService extends BaseService {
  constructor() {
    super(new UserRepo());
  }

  async login(id) {
    const user = await this.repo.findById(id);

    if (!user) {
      throw new AppError('Invalid credentials');
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
    );

    return token;
  }
}

module.exports = UserService;
