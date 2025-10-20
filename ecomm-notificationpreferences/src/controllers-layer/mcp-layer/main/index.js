module.exports = (headers) => {
  // main Database Crud Object Mcp Api Routers
  return {
    userNotificationPreferencesMcpRouter:
      require("./userNotificationPreferences")(headers),
    adminNotificationConfigMcpRouter: require("./adminNotificationConfig")(
      headers,
    ),
  };
};
