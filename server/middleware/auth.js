const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer '))
    return res.status(401).json({ message: 'Not authenticated' });
  try {
    req.user = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Token invalid or expired' });
  }
};

const artisanOnly = (req, res, next) => {
  if (req.user?.role !== 'artisan')
    return res.status(403).json({ message: 'Artisan account required' });
  next();
};

module.exports = { protect, artisanOnly };
