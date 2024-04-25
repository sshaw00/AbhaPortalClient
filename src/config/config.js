const config = {
    clientURL: process.env.REACT_APP_CLIENT_URL,
    serverURL: process.env.REACT_APP_SERVER_URL,
    baseAddress : process.env.REACT_APP_URL,

    engine: {
      auth: '/auth',
      student: '/student',
    }
  };

  module.exports = {
    config
  };