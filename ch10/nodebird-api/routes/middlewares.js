const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'jwtSecret';

exports.verifyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, JWT_SECRET);
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') { // 유효기간 초과
      return res.json({
        code: 419,
        message: '토큰이 만료되었습니다',
      });
    }
    return res.json({
      code: 401,
      message: '유효하지 않은 토큰입니다',
    });
  }
};
