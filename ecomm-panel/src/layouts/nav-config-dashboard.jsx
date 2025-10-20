import { paths } from "src/routes/paths";

import { CONFIG } from "src/global-config";

import { SvgColor } from "src/components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  folder: icon("ic-folder"),
  dashboard: icon("ic-dashboard"),
};

// ----------------------------------------------------------------------

export const navData = [
  {
    items: [
      {
        title: "Admin Panel",
        path: paths.dashboard.root,
        icon: ICONS.dashboard,
      },
    ],
  },
  {
    subheader: "Modules",
    items: [
      {
        title: "ProductCatalog Module",
        path: paths.dashboard.productCatalog.root,
        icon: ICONS.folder,

        children: [
          {
            title: "Product Data",
            path: paths.dashboard.productCatalog.product,
          },
        ],
      },

      {
        title: "Cart Module",
        path: paths.dashboard.cart.root,
        icon: ICONS.folder,

        children: [
          {
            title: "Cart Data",
            path: paths.dashboard.cart.cart,
          },

          {
            title: "CartItem Data",
            path: paths.dashboard.cart.cartItem,
          },

          {
            title: "Ko Data",
            path: paths.dashboard.cart.ko,
          },

          {
            title: "Bvf Data",
            path: paths.dashboard.cart.bvf,
          },
        ],
      },

      {
        title: "OrderManagement Module",
        path: paths.dashboard.orderManagement.root,
        icon: ICONS.folder,

        children: [
          {
            title: "Order Data",
            path: paths.dashboard.orderManagement.order,
          },

          {
            title: "OrderItem Data",
            path: paths.dashboard.orderManagement.orderItem,
          },

          {
            title: "Sys_orderPayment Data",
            path: paths.dashboard.orderManagement.sys_orderPayment,
          },

          {
            title: "Sys_paymentCustomer Data",
            path: paths.dashboard.orderManagement.sys_paymentCustomer,
          },

          {
            title: "Sys_paymentMethod Data",
            path: paths.dashboard.orderManagement.sys_paymentMethod,
          },
        ],
      },

      {
        title: "NotificationPreferences Module",
        path: paths.dashboard.notificationPreferences.root,
        icon: ICONS.folder,

        children: [
          {
            title: "UserNotificationPreferences Data",
            path: paths.dashboard.notificationPreferences
              .userNotificationPreferences,
          },

          {
            title: "AdminNotificationConfig Data",
            path: paths.dashboard.notificationPreferences
              .adminNotificationConfig,
          },
        ],
      },

      {
        title: "Reporting Module",
        path: paths.dashboard.reporting.root,
        icon: ICONS.folder,

        children: [
          {
            title: "SalesReport Data",
            path: paths.dashboard.reporting.salesReport,
          },

          {
            title: "ExportJob Data",
            path: paths.dashboard.reporting.exportJob,
          },

          {
            title: "ReportingJobAudit Data",
            path: paths.dashboard.reporting.reportingJobAudit,
          },
        ],
      },

      {
        title: "Auth Module",
        path: paths.dashboard.auth.root,
        icon: ICONS.folder,

        children: [
          {
            title: "User Data",
            path: paths.dashboard.auth.user,
          },
        ],
      },
    ],
  },
];
