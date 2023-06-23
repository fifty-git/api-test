const asyncHandler = require('express-async-handler');
const {
  getUser,
  getAllUser,
  saveUser,
  editUser,
  removeUser,
} = require('../service/userService');

module.exports = {
  get: asyncHandler(async (req, res) => {
    const result = await getUser(req.params.id);
    if (result.error) {
      const { error } = result;
      res.status(400).json({ error });
    }
    res.status(200).json(result);
  }),

  all: asyncHandler(async (req, res) => {
    const result = getAllUser();
    if (result.error) {
      const {error} = result;
      res.status(400).json({error});
    }
    res.status(200).json(result);
  }),

  post: asyncHandler(async (req, res) => {
    const { body } = req;
    const result = await saveUser(body);
    if (result.error) {
      const { error } = result;
      res.status(400).json({ error });
    }
    res.status(200).json(result);
  }),

  put: asyncHandler(async (req, res) => {
    const { body } = req;
    const result = await editUser(body);
    if (result.error) {
      const { error } = result;
      res.status(400).json({ error });
    }
    res.status(200).json(result);
  }),

  delete: asyncHandler(async (req, res) => {
    const result = await removeUser(req.params.id);
    if (result.error) {
      const { error } = result;
      res.status(400).json({ error });
    }
    res.status(200).json(result);
  }),
};
