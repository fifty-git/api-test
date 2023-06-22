const db = require('./database');

class Model {
  constructor(entityClass, entityName) {
    this.entityName = entityName;
    this.entityClass = entityClass;
  }

  async findAll() {
    return db.findAll(this);
  }

  async findById(id) {
    return db.findById(this, id);
  }

  async create(data) {
    return db.create(this, data);
  }

  async update(id, data) {
    return db.update(this, id, data);
  }

  async delete(id) {
    return db.delete(this, id);
  }
}

module.exports = Model;
