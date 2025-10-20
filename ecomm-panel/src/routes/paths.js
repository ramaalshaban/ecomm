const ROOTS = {
  AUTH: "/auth",
  DASHBOARD: "/dashboard",
};

export const paths = {
  auth: {
    login: `/`,
  },

  dashboard: {
    root: ROOTS.DASHBOARD,

    productCatalog: {
      root: `${ROOTS.DASHBOARD}/productCatalog`,

      product: `${ROOTS.DASHBOARD}/productCatalog/product`,
    },

    cart: {
      root: `${ROOTS.DASHBOARD}/cart`,

      cart: `${ROOTS.DASHBOARD}/cart/cart`,

      cartItem: `${ROOTS.DASHBOARD}/cart/cartItem`,

      ko: `${ROOTS.DASHBOARD}/cart/ko`,

      bvf: `${ROOTS.DASHBOARD}/cart/bvf`,
    },

    orderManagement: {
      root: `${ROOTS.DASHBOARD}/orderManagement`,

      order: `${ROOTS.DASHBOARD}/orderManagement/order`,

      orderItem: `${ROOTS.DASHBOARD}/orderManagement/orderItem`,

      sys_orderPayment: `${ROOTS.DASHBOARD}/orderManagement/sys_orderPayment`,

      sys_paymentCustomer: `${ROOTS.DASHBOARD}/orderManagement/sys_paymentCustomer`,

      sys_paymentMethod: `${ROOTS.DASHBOARD}/orderManagement/sys_paymentMethod`,
    },

    notificationPreferences: {
      root: `${ROOTS.DASHBOARD}/notificationPreferences`,

      userNotificationPreferences: `${ROOTS.DASHBOARD}/notificationPreferences/userNotificationPreferences`,

      adminNotificationConfig: `${ROOTS.DASHBOARD}/notificationPreferences/adminNotificationConfig`,
    },

    reporting: {
      root: `${ROOTS.DASHBOARD}/reporting`,

      salesReport: `${ROOTS.DASHBOARD}/reporting/salesReport`,

      exportJob: `${ROOTS.DASHBOARD}/reporting/exportJob`,

      reportingJobAudit: `${ROOTS.DASHBOARD}/reporting/reportingJobAudit`,
    },

    auth: {
      root: `${ROOTS.DASHBOARD}/auth`,

      user: `${ROOTS.DASHBOARD}/auth/user`,
    },
  },
};
