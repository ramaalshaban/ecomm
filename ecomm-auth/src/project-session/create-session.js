module.exports = {
  createSession: () => {
    const SessionManager = require("./ecomm-login-session");
    return new SessionManager();
  },
};
