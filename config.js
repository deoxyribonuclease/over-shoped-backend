const dotenv = require('dotenv');
const result = dotenv.config();

if (result.error) {
  throw result.error;
}

const PORT = process.env.PORT;
const IP = process.env.IP;
const BASE_URL = `http://${IP}}:${PORT}/`;

console.log(result.parsed);

module.exports = {
  saltRounds: 2,
  jwtSecret: process.env.SECRET,
  tokenExpireTime: '24h',
  port: process.env.PORT,
  ip: process.env.IP,
  baseUrl: BASE_URL,
  email: process.env.EMAIL,
  pass: process.env.PASS,
  session_secret: process.env.SESSION_SECRET
};