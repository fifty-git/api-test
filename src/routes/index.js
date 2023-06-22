const { AuthMiddleware, ErrorMiddleware } = require('../middlewares');
const userRouter = require('../modules/user/user.route');
const authRouter = require('../modules/auth/auth.route');
const orderRouter = require('../modules/order/order.route');

module.exports = app => {
  // Middleware
  app.use(AuthMiddleware.verifyToken);
  app.use(ErrorMiddleware.serverError);

  app.get('/', (req, res, next) => {
    return res.status(200).json({
      message: 'Hello world!',
    });
  });

  app.use('/', authRouter);
  app.use('/users', userRouter);
  app.use('/orders', orderRouter);
};
