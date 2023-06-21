import data from '../../../data/db.json';

export default class BaseRepo {
  constructor(key) {
    this.model = data[key];
  }

  async findAll() {
    return this.model;
  }

  async findById(id) {
    return this.model.find(item => item.id === id);
  }

  async create(data) {
    const id = this.model.length + 1;
    const item = { ...data, id };
    this.model.push(item);
    return item;
  }

  async update(id, data) {
    const index = this.model.findIndex(item => item.id === id);
    this.model[index] = { ...this.model[index], ...data };
    return this.model[index];
  }

  async delete(id) {
    const index = this.model.findIndex(item => item.id === id);
    this.model.splice(index, 1);
    return true;
  }
}
