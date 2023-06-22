const UserController = require('../modules/user/user.controller');

module.exports = app => {
  app.get('/', (req, res, next) => {
    return res.status(200).json({
      message: 'Hello world!',
    });
  });

  const userController = new UserController();
  app.post('/login', userController.login.bind(userController));
};
