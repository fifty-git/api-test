const jwt = require('jsonwebtoken');
const BaseService = require('../../cores/base/base.service');
const UserRepo = require('./user.repo');
const { AppError } = require('../../cores/errors');
const { env } = require('../../configs');
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
      env.auth.jwt_secret,
    );

    return token;
  }
}

module.exports = UserService;
