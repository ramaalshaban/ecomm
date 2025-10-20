const express = require("express");
const router = express.Router();

const httpLogsRoute = require("./httpLogs.route.js");
router.use("/logs", httpLogsRoute);

const CustomerOrderListViewRoute = require("./CustomerOrderListView.route.js");
router.use("/CustomerOrderListView", CustomerOrderListViewRoute);

const OrderDetailViewRoute = require("./OrderDetailView.route.js");
router.use("/OrderDetailView", OrderDetailViewRoute);

const CartViewRoute = require("./CartView.route.js");
router.use("/CartView", CartViewRoute);

const ProductListViewRoute = require("./ProductListView.route.js");
router.use("/ProductListView", ProductListViewRoute);

const SalesDashboardViewRoute = require("./SalesDashboardView.route.js");
router.use("/SalesDashboardView", SalesDashboardViewRoute);

const NotificationTriggerOrderViewRoute = require("./NotificationTriggerOrderView.route.js");
router.use("/NotificationTriggerOrderView", NotificationTriggerOrderViewRoute);

const NotificationExportJobViewRoute = require("./NotificationExportJobView.route.js");
router.use("/NotificationExportJobView", NotificationExportJobViewRoute);

const exportJobDetailViewRoute = require("./exportJobDetailView.route.js");
router.use("/exportJobDetailView", exportJobDetailViewRoute);

const AdminExportJobViewRoute = require("./AdminExportJobView.route.js");
router.use("/AdminExportJobView", AdminExportJobViewRoute);

const SalesReportDashboardViewRoute = require("./SalesReportDashboardView.route.js");
router.use("/SalesReportDashboardView", SalesReportDashboardViewRoute);

const notificationOrderPlacedViewRoute = require("./notificationOrderPlacedView.route.js");
router.use("/notificationOrderPlacedView", notificationOrderPlacedViewRoute);

const notificationOrderStatusShippedViewRoute = require("./notificationOrderStatusShippedView.route.js");
router.use(
  "/notificationOrderStatusShippedView",
  notificationOrderStatusShippedViewRoute,
);

const notificationPaymentSuccessViewRoute = require("./notificationPaymentSuccessView.route.js");
router.use(
  "/notificationPaymentSuccessView",
  notificationPaymentSuccessViewRoute,
);

const notificationOrderRefundProcessedViewRoute = require("./notificationOrderRefundProcessedView.route.js");
router.use(
  "/notificationOrderRefundProcessedView",
  notificationOrderRefundProcessedViewRoute,
);

const dynamicRoute = require("./dynamic.route.js");
router.use("/", dynamicRoute);

module.exports = router;
