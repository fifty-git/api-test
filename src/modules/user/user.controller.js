const UserService = require('./user.service');
const UserEntity = require('./user.entity');
class UserController {
  constructor() {
    this.service = new UserService();
  }

  async getAll(req, res, next) {
    try {
      const users = await this.service.getAll();
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await this.service.getById(id);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const user = await this.service.create(req.body);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const user = await this.service.update(id, req.body);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const user = await this.service.delete(id);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { id } = req.body;
      const token = await this.service.login(id);
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
