const asyncHandler = require('express-async-handler');
const {
  getOrders,
  getOrder,
  insertOrder,
  editOrder,
  removeOrder
} = require('../service/orderService');

module.exports = {
  get: asyncHandler(async (req, res) => {
    const result = await getOrder(req.params.id);
    if (result.error) {
      const { error } = result;
      res.status(400).json({ error });
    }
    res.status(200).json(result);
  }),

  all: asyncHandler(async (req, res) => {
    const result = getOrders();
    if (result.error) {
      const {error} = result;
      res.status(400).json({error});
    }
    res.status(200).json(result);
  }),
  post: asyncHandler(async (req, res) => {
    const { body } = req;
    const result = await insertOrder(body);
    if (result.error) {
      const { error } = result;
      res.status(400).json({ error });
    }
    res.status(200).json(result);
  }),
  put: asyncHandler(async (req, res) => {
    const { body } = req;
    const result = await editOrder(body);
    if (result.error) {
      const { error } = result;
      res.status(400).json({ error });
    }
    res.status(200).json(result);
  }),
  delete: asyncHandler(async (req, res) => {
    const result = await removeOrder(req.params.id);
    if (result.error) {
      const { error } = result;
      res.status(400).json({ error });
    }
    res.status(200).json(result);
  }),
};
