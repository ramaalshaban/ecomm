const NotificationPreferencesServiceMcpController = require("./NotificationPreferencesServiceMcpController");

module.exports = (name, routeName, params) => {
  const mcpController = new NotificationPreferencesServiceMcpController(
    name,
    routeName,
    params,
  );
  return mcpController;
};
