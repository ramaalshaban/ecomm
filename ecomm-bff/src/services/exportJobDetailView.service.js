const {
  getAllExportJobDetailView,
  getExportJobDetailView,
} = require("aggregates/exportJobDetailView.aggregate");

const getAllAggExportJobDetailView = async () => {
  try {
    const data = await getAllExportJobDetailView();
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return [];
  }
};

const getAggExportJobDetailView = async (id) => {
  try {
    const data = await getExportJobDetailView(id);
    return data;
  } catch (err) {
    console.error("Error: ", err);
    //**errorLog
    return {};
  }
};

module.exports = { getAllAggExportJobDetailView, getAggExportJobDetailView };
