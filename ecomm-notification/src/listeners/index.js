const startBaseListeners = require("./base");
const userRegistrationVerificationListeners = require("./userRegistrationVerification.listener");
const passwordResetRequestListeners = require("./passwordResetRequest.listener");
const orderPlacedCustomerListeners = require("./orderPlacedCustomer.listener");
const orderPlacedAdminListeners = require("./orderPlacedAdmin.listener");
const orderShippedCustomerListeners = require("./orderShippedCustomer.listener");
const orderShippedAdminListeners = require("./orderShippedAdmin.listener");
const paymentSuccessCustomerListeners = require("./paymentSuccessCustomer.listener");
const paymentSuccessAdminListeners = require("./paymentSuccessAdmin.listener");
const paymentFailedCustomerListeners = require("./paymentFailedCustomer.listener");
const paymentFailedAdminListeners = require("./paymentFailedAdmin.listener");
const orderRefundedCustomerListeners = require("./orderRefundedCustomer.listener");
const orderRefundedAdminListeners = require("./orderRefundedAdmin.listener");
const exportJobCompletedAdminListeners = require("./exportJobCompletedAdmin.listener");
const userVerificationListeners = require("./userVerification.listener");
const userResetPasswordListeners = require("./userResetPassword.listener");

const startListener = async () => {
  try {
    await startBaseListeners();
    await userRegistrationVerificationListeners();
    await passwordResetRequestListeners();
    await orderPlacedCustomerListeners();
    await orderPlacedAdminListeners();
    await orderShippedCustomerListeners();
    await orderShippedAdminListeners();
    await paymentSuccessCustomerListeners();
    await paymentSuccessAdminListeners();
    await paymentFailedCustomerListeners();
    await paymentFailedAdminListeners();
    await orderRefundedCustomerListeners();
    await orderRefundedAdminListeners();
    await exportJobCompletedAdminListeners();
    await userVerificationListeners();
    await userResetPasswordListeners();
  } catch (error) {
    //**errorLog
  }
};

module.exports = startListener;
