const asyncHandler = require('express-async-handler');
const {
  getAllAddress,
  getAddress,
  insertAddress,
  editAddress,
  deleteAddress
} = require('../service/addressService');

module.exports = {
  get: asyncHandler(async (req, res) => {
    const result = await getAddress(req.params.id);
    if (result.error) {
      const { error } = result;
      res.status(400).json({ error });
    }
    res.status(200).json(result);
  }),

  all: asyncHandler(async (req, res) => {
    const result = getAllAddress();
    if (result.error) {
      const {error} = result;
      res.status(400).json({error});
    }
    res.status(200).json(result);
  }),
  post: asyncHandler(async (req, res) => {
    const { body } = req;
    const result = await insertAddress(body);
    if (result.error) {
      const { error } = result;
      res.status(400).json({ error });
    }
    res.status(200).json(result);
  }),
  put: asyncHandler(async (req, res) => {
    const { body } = req;
    const result = await editAddress(body);
    if (result.error) {
      const { error } = result;
      res.status(400).json({ error });
    }
    res.status(200).json(result);
  }),
  delete: asyncHandler(async (req, res) => {
    const result = await deleteAddress(req.params.id);
    if (result.error) {
      const { error } = result;
      res.status(400).json({ error });
    }
    res.status(200).json(result);
  }),
};
