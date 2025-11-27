const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ erro: 'Token ausente' });
  }

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = verificado.id;
    next();

  } catch (error) {

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ erro: 'Token expirado' });
    }

    return res.status(401).json({ erro: 'Token inválido' });
  }
};
