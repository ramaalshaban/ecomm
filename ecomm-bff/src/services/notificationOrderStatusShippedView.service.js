const {
  getAllNotificationOrderStatusShippedView,
  getNotificationOrderStatusShippedView,
} = require("aggregates/notificationOrderStatusShippedView.aggregate");

const getAllAggNotificationOrderStatusShippedView = async () => {
  try {
    const data = await getAllNotificationOrderStatusShippedView();
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return [];
  }
};

const getAggNotificationOrderStatusShippedView = async (id) => {
  try {
    const data = await getNotificationOrderStatusShippedView(id);
    return data;
  } catch (err) {
    console.error("Error: ", err);
    //**errorLog
    return {};
  }
};

module.exports = {
  getAllAggNotificationOrderStatusShippedView,
  getAggNotificationOrderStatusShippedView,
};
