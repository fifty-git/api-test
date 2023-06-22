const db = require('./database');

class Model {
  constructor(nameEntity) {
    this.nameEntity = nameEntity;
  }

  async findAll() {
    return db.findAll(this.nameEntity);
  }

  async findById(id) {
    return db.findById(this.nameEntity, id);
  }

  async create(data) {
    return db.create(this.nameEntity, data);
  }

  async update(id, data) {
    return db.update(this.nameEntity, id, data);
  }

  async delete(id) {
    return db.delete(this.nameEntity, id);
  }
}

module.exports = Model;
