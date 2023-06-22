const BaseRepo = require('../../cores/base/base.repo');
const OrderEntity = require('./order.entity');

class OrderRepo extends BaseRepo {
  constructor() {
    super(OrderEntity, 'orders');
  }
}

module.exports = OrderRepo;
