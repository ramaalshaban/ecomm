const {
  getAllNotificationTriggerOrderView,
  getNotificationTriggerOrderView,
} = require("aggregates/NotificationTriggerOrderView.aggregate");

const getAllAggNotificationTriggerOrderView = async () => {
  try {
    const data = await getAllNotificationTriggerOrderView();
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return [];
  }
};

const getAggNotificationTriggerOrderView = async (id) => {
  try {
    const data = await getNotificationTriggerOrderView(id);
    return data;
  } catch (err) {
    console.error("Error: ", err);
    //**errorLog
    return {};
  }
};

module.exports = {
  getAllAggNotificationTriggerOrderView,
  getAggNotificationTriggerOrderView,
};
