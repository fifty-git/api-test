const UserService = require('./user.service');

class UserController {
  constructor() {
    this.service = new UserService();
  }

  async findAll(req, res) {
    const users = await this.service.findAll();
    return res.json(users);
  }

  async findById(req, res) {
    const { id } = req.params;
    const user = await this.service.findById(id);
    return res.json(user);
  }

  async create(req, res) {
    const user = await this.service.create(req.body);
    return res.json(user);
  }

  async update(req, res) {
    const { id } = req.params;
    const user = await this.service.update(id, req.body);
    return res.json(user);
  }

  async delete(req, res) {
    const { id } = req.params;
    const user = await this.service.delete(id);
    return res.json(user);
  }

  async login(req, res) {
    const { id } = req.body;
    const token = await this.service.login(id);
    return res.json(token);
  }
}

module.exports = UserController;
