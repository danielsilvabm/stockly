const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
}

module.exports = authMiddleware;

