const { config } = require("dotenv");
config();

module.exports = {
  PORT: process.env.REACT_APP_PORT,
  SERVER_URL: process.env.REACT_APP_SERVER_URL,
  CLIENT_URL: process.env.REACT_APP_CLIENT_URL,
  SECRET: process.env.REACT_APP_SECRET,
};
