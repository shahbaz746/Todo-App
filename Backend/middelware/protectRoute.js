const jwt = require('jsonwebtoken');

// protect route middleware
const authMiddleware = (req, res, next) => {
  const authorizationHeader = req.get('authorization');
    const token = authorizationHeader?.startsWith('Bearer ') ? authorizationHeader.slice(7) : null;


    if (!token) {
        return res.status(401).json({ success: false, message: 'No token, authorization denied' });
    }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;