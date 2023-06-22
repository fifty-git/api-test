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

  // Load JSON data from file
  loadData() {
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
  }

  // Save JSON data to file
  saveData() {
    fs.writeFileSync(dataPath, JSON.stringify(this.data, null, 2));
  }

  // Get all entities of a specific type
  findAll(entityName) {
    return this.data[entityName.toLowerCase()] || [];
  }

  // Get an entity by ID
  findById(entityName, entityId) {
    const entities = this.data[entityName.toLowerCase()];
    if (entities) {
      return entities.find(entity => entity.id === +entityId);
    }
    return null;
  }

  // Add a new entity
  create(entityName, entity) {
    const entities = this.data[entityName.toLowerCase()] || [];
    const newEntity = {
      id: entities.length + 1,
      ...entity,
    };
    entities.push(newEntity);
    this.data[entityName.toLowerCase()] = entities;
    this.saveData();
    return newEntity;
  }

  // Update an entity
  update(entityName, entityId, updatedEntity) {
    const entities = this.data[entityName.toLowerCase()];
    if (entities) {
      const entityIndex = entities.findIndex(entity => entity.id === +entityId);
      if (entityIndex !== -1) {
        entities[entityIndex] = {
          ...entities[entityIndex],
          ...updatedEntity,
        };
        this.saveData();
        return entities[entityIndex];
      }
    }
    return null;
  }

  // Delete an entity
  delete(entityName, entityId) {
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
