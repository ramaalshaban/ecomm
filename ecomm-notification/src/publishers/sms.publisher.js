const kafkaPublish = require("../utils/publisher");

const sendSmsNotification = async (notification) => {
  try {
    console.log("sending sms notification", notification);
    await kafkaPublish(
      `ecomm-notification-service-notification-sms`,
      notification,
    );
  } catch (error) {
    //**errorLog
    console.error("Error publishing sms notification", error);
  }
};
module.exports = sendSmsNotification;
