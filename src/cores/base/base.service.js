const Context = require('../../helpers/context');
const BaseRepo = require('./base.repo');
const { AppError } = require('../errors');

class CoreService {
  constructor(repo) {
    console.log(repo);
    if (!(repo instanceof BaseRepo)) {
      throw new AppError('Wrong Repo Type', 500);
    }

    this.repo = repo;
    this.context = new Context();
  }

  async getAll() {
    return this.repo.findAll();
  }

  async getById(id) {
    return this.repo.findById(id);
  }

  async create(data) {
    return this.repo.create(data);
  }

  async update(id, data) {
    const user = await this.repo.update(id, data);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  async delete(id) {
    const isDeleted = await this.repo.delete(id);
    if (!isDeleted) {
      throw new AppError('User not found', 404);
    }

    return isDeleted;
  }
}

module.exports = CoreService;
