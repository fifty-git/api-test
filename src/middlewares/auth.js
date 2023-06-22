const jwt = require('jsonwebtoken');
const User = require('../modules/user/user.repo');
const { env } = require('../configs');
const Context = require('../helpers/context');

const AuthMiddleware = {
  verifyToken: async (req, res, next) => {
    const exclude = ['/login', '/register'];
    if (exclude.includes(req.path)) {
      return next();
    }
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) {
      return res.status(401).json({
        error: 'Unauthorized',
      });
    }

    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, env.auth.jwt_secret);
    if (!decoded) {
      return res.status(401).json({
        error: 'Unauthorized',
      });
    }

    const userRepo = new User();
    const user = await userRepo.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        error: 'Unauthorized',
      });
    }

    const context = new Context();
    context.currentUser = user;

    next();
  },
};

module.exports = AuthMiddleware;
