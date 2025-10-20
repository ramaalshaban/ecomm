const mainRouters = require("./main");

const sessionRouter = require("./session-router");

module.exports = {
  ...mainRouters,
  NotificationPreferencesServiceRestController: require("./NotificationPreferencesServiceRestController"),
  ...sessionRouter,
};
