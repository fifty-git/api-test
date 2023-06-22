const BaseService = require('../../cores/base/base.service');
const OrderEntity = require('./order.entity');
const OrderRepo = require('./order.repo');
class OrderService extends BaseService {
  constructor() {
    super(new OrderRepo());
  }

  async create(order) {
    const newOrder = await this.repo.create({
      ...order,
      orderStatusId: 1,
    });

    return newOrder;
  }
}

module.exports = OrderService;
