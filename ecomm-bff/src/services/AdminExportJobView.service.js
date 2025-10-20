const {
  getAllAdminExportJobView,
  getAdminExportJobView,
} = require("aggregates/AdminExportJobView.aggregate");

const getAllAggAdminExportJobView = async () => {
  try {
    const data = await getAllAdminExportJobView();
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return [];
  }
};

const getAggAdminExportJobView = async (id) => {
  try {
    const data = await getAdminExportJobView(id);
    return data;
  } catch (err) {
    console.error("Error: ", err);
    //**errorLog
    return {};
  }
};

module.exports = { getAllAggAdminExportJobView, getAggAdminExportJobView };
