const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', '..', '..', 'data', 'db.json');

let instance = null;

class Database {
  constructor() {
    if (!instance) {
      instance = this;
      this.data = this.loadData();
    }

    return instance;
  }

  loadData() {
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
  }

  saveData() {
    fs.writeFileSync(dataPath, JSON.stringify(this.data, null, 2));
  }

  // Get all entities of a specific type
  findAll({ entityName }) {
    return this.data[entityName.toLowerCase()] || [];
  }

  findById({ entityName }, entityId) {
    const entities = this.data[entityName.toLowerCase()];
    if (entities) {
      return entities.find(entity => entity.id === +entityId);
    }
    return null;
  }

  create({ entityClass, entityName }, entity) {
    const entities = this.data[entityName.toLowerCase()] || [];
    const newEntity = new entityClass({
      id: entities.length + 1,
      ...entity,
    });
    entities.push(newEntity);
    this.data[entityName.toLowerCase()] = entities;
    this.saveData();
    return newEntity;
  }

  update({ entityClass, entityName }, entityId, updatedEntity) {
    const entities = this.data[entityName.toLowerCase()];
    if (entities) {
      const entityIndex = entities.findIndex(entity => entity.id === +entityId);
      if (entityIndex !== -1) {
        entities[entityIndex] = new entityClass({
          ...entities[entityIndex],
          ...updatedEntity,
        });
        this.saveData();
        return entities[entityIndex];
      }
    }

    return null;
  }

  delete({ entityName }, entityId) {
    const entities = this.data[entityName.toLowerCase()];
    if (entities) {
      const entityIndex = entities.findIndex(entity => entity.id === +entityId);
      if (entityIndex !== -1) {
        const deletedEntity = entities[entityIndex];
        entities.splice(entityIndex, 1);
        this.saveData();
        return deletedEntity;
      }
    }
    return null;
  }
}

module.exports = new Database();
