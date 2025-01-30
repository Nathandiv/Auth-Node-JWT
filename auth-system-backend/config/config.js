const dotenv = require ('dotenv');

dotenv.config();

const JWT_SECRET = proccess.env.JWT_SECRET;

module.exports = JWT_SECRET;