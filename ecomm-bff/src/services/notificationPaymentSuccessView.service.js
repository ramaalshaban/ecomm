const {
  getAllNotificationPaymentSuccessView,
  getNotificationPaymentSuccessView,
} = require("aggregates/notificationPaymentSuccessView.aggregate");

const getAllAggNotificationPaymentSuccessView = async () => {
  try {
    const data = await getAllNotificationPaymentSuccessView();
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return [];
  }
};

const getAggNotificationPaymentSuccessView = async (id) => {
  try {
    const data = await getNotificationPaymentSuccessView(id);
    return data;
  } catch (err) {
    console.error("Error: ", err);
    //**errorLog
    return {};
  }
};

module.exports = {
  getAllAggNotificationPaymentSuccessView,
  getAggNotificationPaymentSuccessView,
};
