const { Model } = require('../database');
class BaseRepo {
  constructor(nameEntity) {
    this.model = new Model(nameEntity);
  }

  async findAll() {
    return this.model.findAll();
  }

  async findById(id) {
    return this.model.findById(id);
  }

  async create(data) {
    return this.model.create(data);
  }

  async update(id, data) {
    return this.model.update(id, data);
  }

  async delete(id) {
    return this.model.delete(id);
  }
}

module.exports = BaseRepo;
