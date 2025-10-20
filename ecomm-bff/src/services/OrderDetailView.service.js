const {
  getAllOrderDetailView,
  getOrderDetailView,
} = require("aggregates/OrderDetailView.aggregate");

const getAllAggOrderDetailView = async () => {
  try {
    const data = await getAllOrderDetailView();
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return [];
  }
};

const getAggOrderDetailView = async (id) => {
  try {
    const data = await getOrderDetailView(id);
    return data;
  } catch (err) {
    console.error("Error: ", err);
    //**errorLog
    return {};
  }
};

module.exports = { getAllAggOrderDetailView, getAggOrderDetailView };
