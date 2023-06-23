const asyncHandler = require('express-async-handler');

const authController = jwt => {
  const getToken = () => {
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        name: 'batchsmsjwt',
      },
      process.env.JWT_SECRET,
      { algorithm: 'HS256' },
    );
    return token;
  };

  const get = asyncHandler(async (req, res, next) => {
    const token = await getToken();
    if (token) {
      res.json({ jwt: token });
    } else {
      res.status(500).json({
        error: true,
        message: 'JWT token not generated',
      });
    }
  });
  return { get, getToken };
};

module.exports = authController;
