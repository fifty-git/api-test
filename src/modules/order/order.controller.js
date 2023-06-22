const OrderService = require('./order.service');

class OrderController {
  constructor() {
    this.service = new OrderService();
  }

  async getAll(req, res, next) {
    try {
      const orders = await this.service.getAll();
      return res.json(orders);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const order = await this.service.getById(id);
      return res.json(order);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const order = await this.service.create(req.body);
      return res.json(order);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const order = await this.service.update(id, req.body);
      return res.json(order);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const order = await this.service.delete(id);
      return res.json(order);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrderController;
