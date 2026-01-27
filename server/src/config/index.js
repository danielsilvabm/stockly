const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'super_secret_jwt_key_dev_only',
  jwtExpiresIn: process.env.JWT_EXPIRE || '1d',
  env: process.env.NODE_ENV || 'development',
};
