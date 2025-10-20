const {
  getAllNotificationExportJobView,
  getNotificationExportJobView,
} = require("aggregates/NotificationExportJobView.aggregate");

const getAllAggNotificationExportJobView = async () => {
  try {
    const data = await getAllNotificationExportJobView();
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return [];
  }
};

const getAggNotificationExportJobView = async (id) => {
  try {
    const data = await getNotificationExportJobView(id);
    return data;
  } catch (err) {
    console.error("Error: ", err);
    //**errorLog
    return {};
  }
};

module.exports = {
  getAllAggNotificationExportJobView,
  getAggNotificationExportJobView,
};
