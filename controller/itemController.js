const asyncHandler = require('express-async-handler');
const {
  getAllItems,
  getItem,

} = require('../service/itemService');

module.exports = {
  get: asyncHandler(async (req, res) => {
    const result = await getItem(req.params.id);
    if (result.error) {
      const { error } = result;
      res.status(400).json({ error });
    }
    res.status(200).json(result);
  }),

  all: asyncHandler(async (req, res) => {
    const result = getAllItems();
    if (result.error) {
      const {error} = result;
      res.status(400).json({error});
    }
    res.status(200).json(result);
  }),
};
