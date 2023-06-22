const UserController = require('../modules/user/user.controller');
const { AuthMiddleware, ErrorMiddleware } = require('../middlewares');

module.exports = app => {
  // Middleware
  app.use(AuthMiddleware.verifyToken);
  app.use(ErrorMiddleware.serverError);
  app.get('/', (req, res, next) => {
    return res.status(200).json({
      message: 'Hello world!',
    });
  });

  const userController = new UserController();
  app.post('/login', userController.login.bind(userController));
};
