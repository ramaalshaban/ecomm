const mainFunctions = require("./main");

module.exports = {
  // main Database
  createOrder: mainFunctions.createOrder,
  getIdListOfOrderByField: mainFunctions.getIdListOfOrderByField,
  getOrderById: mainFunctions.getOrderById,
  getOrderAggById: mainFunctions.getOrderAggById,
  getOrderListByQuery: mainFunctions.getOrderListByQuery,
  getOrderStatsByQuery: mainFunctions.getOrderStatsByQuery,
  getOrderByQuery: mainFunctions.getOrderByQuery,
  updateOrderById: mainFunctions.updateOrderById,
  updateOrderByIdList: mainFunctions.updateOrderByIdList,
  updateOrderByQuery: mainFunctions.updateOrderByQuery,
  deleteOrderById: mainFunctions.deleteOrderById,
  deleteOrderByQuery: mainFunctions.deleteOrderByQuery,
  updateOrderOrderStatusById: mainFunctions.updateOrderOrderStatusById,
  dbScriptCreateOrder: mainFunctions.dbScriptCreateOrder,
  dbScriptGetOrder: mainFunctions.dbScriptGetOrder,
  dbScriptUpdateOrder: mainFunctions.dbScriptUpdateOrder,
  dbScriptDeleteOrder: mainFunctions.dbScriptDeleteOrder,
  dbScriptListOrders: mainFunctions.dbScriptListOrders,
  dbScriptCheckoutStartorder: mainFunctions.dbScriptCheckoutStartorder,
  dbScriptCheckoutCompleteorder: mainFunctions.dbScriptCheckoutCompleteorder,
  dbScriptCheckoutRefreshorder: mainFunctions.dbScriptCheckoutRefreshorder,
  createOrderItem: mainFunctions.createOrderItem,
  getIdListOfOrderItemByField: mainFunctions.getIdListOfOrderItemByField,
  getOrderItemById: mainFunctions.getOrderItemById,
  getOrderItemAggById: mainFunctions.getOrderItemAggById,
  getOrderItemListByQuery: mainFunctions.getOrderItemListByQuery,
  getOrderItemStatsByQuery: mainFunctions.getOrderItemStatsByQuery,
  getOrderItemByQuery: mainFunctions.getOrderItemByQuery,
  updateOrderItemById: mainFunctions.updateOrderItemById,
  updateOrderItemByIdList: mainFunctions.updateOrderItemByIdList,
  updateOrderItemByQuery: mainFunctions.updateOrderItemByQuery,
  deleteOrderItemById: mainFunctions.deleteOrderItemById,
  deleteOrderItemByQuery: mainFunctions.deleteOrderItemByQuery,

  createSys_orderPayment: mainFunctions.createSys_orderPayment,
  getIdListOfSys_orderPaymentByField:
    mainFunctions.getIdListOfSys_orderPaymentByField,
  getSys_orderPaymentById: mainFunctions.getSys_orderPaymentById,
  getSys_orderPaymentAggById: mainFunctions.getSys_orderPaymentAggById,
  getSys_orderPaymentListByQuery: mainFunctions.getSys_orderPaymentListByQuery,
  getSys_orderPaymentStatsByQuery:
    mainFunctions.getSys_orderPaymentStatsByQuery,
  getSys_orderPaymentByQuery: mainFunctions.getSys_orderPaymentByQuery,
  updateSys_orderPaymentById: mainFunctions.updateSys_orderPaymentById,
  updateSys_orderPaymentByIdList: mainFunctions.updateSys_orderPaymentByIdList,
  updateSys_orderPaymentByQuery: mainFunctions.updateSys_orderPaymentByQuery,
  deleteSys_orderPaymentById: mainFunctions.deleteSys_orderPaymentById,
  deleteSys_orderPaymentByQuery: mainFunctions.deleteSys_orderPaymentByQuery,
  getSys_orderPaymentByOrderId: mainFunctions.getSys_orderPaymentByOrderId,
  dbScriptGetOrderpayment2: mainFunctions.dbScriptGetOrderpayment2,
  dbScriptListOrderpayments2: mainFunctions.dbScriptListOrderpayments2,
  dbScriptCreateOrderpayment: mainFunctions.dbScriptCreateOrderpayment,
  dbScriptUpdateOrderpayment: mainFunctions.dbScriptUpdateOrderpayment,
  dbScriptDeleteOrderpayment: mainFunctions.dbScriptDeleteOrderpayment,
  dbScriptListOrderpayments2: mainFunctions.dbScriptListOrderpayments2,
  dbScriptGetOrderpaymentbyorderid:
    mainFunctions.dbScriptGetOrderpaymentbyorderid,
  dbScriptGetOrderpaymentbypaymentid:
    mainFunctions.dbScriptGetOrderpaymentbypaymentid,
  dbScriptGetOrderpayment2: mainFunctions.dbScriptGetOrderpayment2,
  createSys_paymentCustomer: mainFunctions.createSys_paymentCustomer,
  getIdListOfSys_paymentCustomerByField:
    mainFunctions.getIdListOfSys_paymentCustomerByField,
  getSys_paymentCustomerById: mainFunctions.getSys_paymentCustomerById,
  getSys_paymentCustomerAggById: mainFunctions.getSys_paymentCustomerAggById,
  getSys_paymentCustomerListByQuery:
    mainFunctions.getSys_paymentCustomerListByQuery,
  getSys_paymentCustomerStatsByQuery:
    mainFunctions.getSys_paymentCustomerStatsByQuery,
  getSys_paymentCustomerByQuery: mainFunctions.getSys_paymentCustomerByQuery,
  updateSys_paymentCustomerById: mainFunctions.updateSys_paymentCustomerById,
  updateSys_paymentCustomerByIdList:
    mainFunctions.updateSys_paymentCustomerByIdList,
  updateSys_paymentCustomerByQuery:
    mainFunctions.updateSys_paymentCustomerByQuery,
  deleteSys_paymentCustomerById: mainFunctions.deleteSys_paymentCustomerById,
  deleteSys_paymentCustomerByQuery:
    mainFunctions.deleteSys_paymentCustomerByQuery,
  getSys_paymentCustomerByUserId: mainFunctions.getSys_paymentCustomerByUserId,
  getSys_paymentCustomerByCustomerId:
    mainFunctions.getSys_paymentCustomerByCustomerId,
  dbScriptGetPaymentcustomerbyuserid:
    mainFunctions.dbScriptGetPaymentcustomerbyuserid,
  dbScriptListPaymentcustomers: mainFunctions.dbScriptListPaymentcustomers,
  createSys_paymentMethod: mainFunctions.createSys_paymentMethod,
  getIdListOfSys_paymentMethodByField:
    mainFunctions.getIdListOfSys_paymentMethodByField,
  getSys_paymentMethodById: mainFunctions.getSys_paymentMethodById,
  getSys_paymentMethodAggById: mainFunctions.getSys_paymentMethodAggById,
  getSys_paymentMethodListByQuery:
    mainFunctions.getSys_paymentMethodListByQuery,
  getSys_paymentMethodStatsByQuery:
    mainFunctions.getSys_paymentMethodStatsByQuery,
  getSys_paymentMethodByQuery: mainFunctions.getSys_paymentMethodByQuery,
  updateSys_paymentMethodById: mainFunctions.updateSys_paymentMethodById,
  updateSys_paymentMethodByIdList:
    mainFunctions.updateSys_paymentMethodByIdList,
  updateSys_paymentMethodByQuery: mainFunctions.updateSys_paymentMethodByQuery,
  deleteSys_paymentMethodById: mainFunctions.deleteSys_paymentMethodById,
  deleteSys_paymentMethodByQuery: mainFunctions.deleteSys_paymentMethodByQuery,
  getSys_paymentMethodByPaymentMethodId:
    mainFunctions.getSys_paymentMethodByPaymentMethodId,
  getSys_paymentMethodByUserId: mainFunctions.getSys_paymentMethodByUserId,
  getSys_paymentMethodByCustomerId:
    mainFunctions.getSys_paymentMethodByCustomerId,
  dbScriptListPaymentcustomermethods:
    mainFunctions.dbScriptListPaymentcustomermethods,
};
