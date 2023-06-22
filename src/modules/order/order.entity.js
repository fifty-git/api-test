const AppError = require('../../cores/errors/app.error');
class OrderEntity {
  constructor({
    orderStatusId,
    userId,
    shippingAddress,
    billingAddress,
    itemIds,
  }) {
    if (!userId) {
      throw new AppError('User id is required', 400);
    }

    if (!shippingAddress) {
      throw new AppError('Shipping address is required', 400);
    }

    if (!billingAddress) {
      throw new AppError('Billing address is required', 400);
    }

    if (!itemIds || !itemIds.length) {
      throw new AppError('Item ids is required', 400);
    }

    if (!Array.isArray(itemIds)) {
      throw new AppError('Item ids must be an array', 400);
    }

    this.orderStatusId = orderStatusId;
    this.userId = userId;
    this.shippingAddress = shippingAddress;
    this.billingAddress = billingAddress;
    this.itemIds = itemIds;
  }
}

module.exports = OrderEntity;
