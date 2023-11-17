const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});

function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token,  process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.user = decoded;
    console.log("token:", decoded)
    next();
  });
}

module.exports = authMiddleware;
