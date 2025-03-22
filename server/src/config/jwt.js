if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '24h';

module.exports = {
  secret: JWT_SECRET,
  options: {
    expiresIn: JWT_EXPIRES_IN,
    issuer: 'marketplace-api',
  },
}; 