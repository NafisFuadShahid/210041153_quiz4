//middleware/auth.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  //extract token from header
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; //contains user id and role
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
module.exports = verifyToken;
