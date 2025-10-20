module.exports = (headers) => {
  // UserNotificationPreferences Db Object Rest Api Router
  const userNotificationPreferencesMcpRouter = [];

  // createUserNotificationPreferences controller
  userNotificationPreferencesMcpRouter.push(
    require("./create-usernotificationpreferences-api")(headers),
  );
  // getUserNotificationPreferences controller
  userNotificationPreferencesMcpRouter.push(
    require("./get-usernotificationpreferences-api")(headers),
  );
  // updateUserNotificationPreferences controller
  userNotificationPreferencesMcpRouter.push(
    require("./update-usernotificationpreferences-api")(headers),
  );
  // deleteUserNotificationPreferences controller
  userNotificationPreferencesMcpRouter.push(
    require("./delete-usernotificationpreferences-api")(headers),
  );
  // listUserNotificationPreferences controller
  userNotificationPreferencesMcpRouter.push(
    require("./list-usernotificationpreferences-api")(headers),
  );

  return userNotificationPreferencesMcpRouter;
};
