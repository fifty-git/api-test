const AppError = require('../../cores/errors/app.error');
class UserEntity {
  constructor({ firstName, lastName, userTypeId }) {
    if (!firstName) {
      throw new AppError('First name is required', 400);
    }

    if (!lastName) {
      throw new AppError('Last name is required', 400);
    }

    if (!userTypeId) {
      throw new AppError('User type ID is required', 400);
    }

    this.firstName = firstName;
    this.lastName = lastName;
    this.userTypeId = userTypeId;
  }
}

module.exports = UserEntity;
