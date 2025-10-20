const runCreateListener = require("./create.listener");
const runUpdateListener = require("./update.listener");
const runDeleteListener = require("./delete.listener");

const startItemsListener = require("./items");

const startUserListener = require("./user");

const startCustomerOrderListViewListener = async () => {
  console.log("Starting CustomerOrderListView listeners");
  await runCreateListener();
  await runUpdateListener();
  await runDeleteListener();

  await startItemsListener();

  await startUserListener();
};

module.exports = startCustomerOrderListViewListener;
