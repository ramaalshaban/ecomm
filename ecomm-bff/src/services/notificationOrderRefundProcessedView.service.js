const {
  getAllNotificationOrderRefundProcessedView,
  getNotificationOrderRefundProcessedView,
} = require("aggregates/notificationOrderRefundProcessedView.aggregate");

const getAllAggNotificationOrderRefundProcessedView = async () => {
  try {
    const data = await getAllNotificationOrderRefundProcessedView();
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return [];
  }
};

const getAggNotificationOrderRefundProcessedView = async (id) => {
  try {
    const data = await getNotificationOrderRefundProcessedView(id);
    return data;
  } catch (err) {
    console.error("Error: ", err);
    //**errorLog
    return {};
  }
};

module.exports = {
  getAllAggNotificationOrderRefundProcessedView,
  getAggNotificationOrderRefundProcessedView,
};
