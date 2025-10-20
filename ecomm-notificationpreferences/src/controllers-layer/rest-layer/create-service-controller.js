const NotificationPreferencesServiceRestController = require("./NotificationPreferencesServiceRestController");

module.exports = (name, routeName, req, res) => {
  const restController = new NotificationPreferencesServiceRestController(
    name,
    routeName,
    req,
    res,
  );
  return restController;
};
