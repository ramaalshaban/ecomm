const {
  getAllNotificationOrderPlacedView,
  getNotificationOrderPlacedView,
} = require("aggregates/notificationOrderPlacedView.aggregate");

const getAllAggNotificationOrderPlacedView = async () => {
  try {
    const data = await getAllNotificationOrderPlacedView();
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return [];
  }
};

const getAggNotificationOrderPlacedView = async (id) => {
  try {
    const data = await getNotificationOrderPlacedView(id);
    return data;
  } catch (err) {
    console.error("Error: ", err);
    //**errorLog
    return {};
  }
};

module.exports = {
  getAllAggNotificationOrderPlacedView,
  getAggNotificationOrderPlacedView,
};
