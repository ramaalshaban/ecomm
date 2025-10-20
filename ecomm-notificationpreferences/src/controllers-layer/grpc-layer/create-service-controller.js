const NotificationPreferencesServiceGrpcController = require("./NotificationPreferencesServiceGrpcController");

module.exports = (name, routeName, call, callback) => {
  const grpcController = new NotificationPreferencesServiceGrpcController(
    name,
    routeName,
    call,
    callback,
  );
  return grpcController;
};
