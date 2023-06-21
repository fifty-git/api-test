import Context from '../../helpers/context';
import { BaseRepo } from './base.repo';
import { AppError } from '../errors';

export default class CoreService {
  constructor(repo) {
    if (!(repo instanceof BaseRepo)) {
      throw new AppError('Wrong Repo Type', 500);
    }

    this.repo = repo;
    this.context = new Context();
  }

  async findAll() {
    return this.repo.findAll();
  }

  async findById(id) {
    return this.repo.findById(id);
  }

  async create(data) {
    return this.repo.create(data);
  }

  async update(id, data) {
    return this.repo.update(id, data);
  }

  async delete(id) {
    return this.repo.delete(id);
  }
}
