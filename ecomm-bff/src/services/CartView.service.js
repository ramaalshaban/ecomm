const {
  getAllCartView,
  getCartView,
} = require("aggregates/CartView.aggregate");

const getAllAggCartView = async () => {
  try {
    const data = await getAllCartView();
    return data;
  } catch (err) {
    console.error("Error: ", err);
    return [];
  }
};

const getAggCartView = async (id) => {
  try {
    const data = await getCartView(id);
    return data;
  } catch (err) {
    console.error("Error: ", err);
    //**errorLog
    return {};
  }
};

module.exports = { getAllAggCartView, getAggCartView };
