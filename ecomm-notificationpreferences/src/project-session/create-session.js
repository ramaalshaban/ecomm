module.exports = {
  createSession: () => {
    const SessionManager = require("./ecomm-session");
    return new SessionManager();
  },
};
