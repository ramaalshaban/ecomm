import { Outlet } from "react-router";
import { lazy, Suspense } from "react";

import { CONFIG } from "src/global-config";
import { DashboardLayout, DataObjectLayout } from "src/layouts/dashboard";

import { LoadingScreen } from "src/components/loading-screen";

import { AuthGuard } from "src/auth/guard";

import { usePathname } from "../hooks";

const IndexPage = lazy(() => import("src/pages/dashboard"));

const ProductCatalogProductAppPage = lazy(
  () => import("src/pages/dashboard/productcatalog/product"),
);

const CartCartAppPage = lazy(() => import("src/pages/dashboard/cart/cart"));

const CartCartItemAppPage = lazy(
  () => import("src/pages/dashboard/cart/cartitem"),
);

const CartKoAppPage = lazy(() => import("src/pages/dashboard/cart/ko"));

const CartBvfAppPage = lazy(() => import("src/pages/dashboard/cart/bvf"));

const OrderManagementOrderAppPage = lazy(
  () => import("src/pages/dashboard/ordermanagement/order"),
);

const OrderManagementOrderItemAppPage = lazy(
  () => import("src/pages/dashboard/ordermanagement/orderitem"),
);

const OrderManagementSys_orderPaymentAppPage = lazy(
  () => import("src/pages/dashboard/ordermanagement/sys_orderpayment"),
);

const OrderManagementSys_paymentCustomerAppPage = lazy(
  () => import("src/pages/dashboard/ordermanagement/sys_paymentcustomer"),
);

const OrderManagementSys_paymentMethodAppPage = lazy(
  () => import("src/pages/dashboard/ordermanagement/sys_paymentmethod"),
);

const NotificationPreferencesUserNotificationPreferencesAppPage = lazy(
  () =>
    import(
      "src/pages/dashboard/notificationpreferences/usernotificationpreferences"
    ),
);

const NotificationPreferencesAdminNotificationConfigAppPage = lazy(
  () =>
    import(
      "src/pages/dashboard/notificationpreferences/adminnotificationconfig"
    ),
);

const ReportingSalesReportAppPage = lazy(
  () => import("src/pages/dashboard/reporting/salesreport"),
);

const ReportingExportJobAppPage = lazy(
  () => import("src/pages/dashboard/reporting/exportjob"),
);

const ReportingReportingJobAuditAppPage = lazy(
  () => import("src/pages/dashboard/reporting/reportingjobaudit"),
);

const AuthUserAppPage = lazy(() => import("src/pages/dashboard/auth/user"));

function SuspenseOutlet() {
  const pathname = usePathname();
  return (
    <Suspense key={pathname} fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  );
}

const dashboardLayout = () => (
  <DashboardLayout>
    <SuspenseOutlet />
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: "dashboard",
    element: CONFIG.auth.skip ? (
      dashboardLayout()
    ) : (
      <AuthGuard>{dashboardLayout()}</AuthGuard>
    ),
    children: [
      { index: true, element: <IndexPage /> },

      {
        path: "productCatalog",
        element: <DataObjectLayout />,
        children: [
          {
            index: true,
            element: <ProductCatalogProductAppPage />,
          },

          {
            path: "product",
            element: <ProductCatalogProductAppPage />,
          },
        ],
      },

      {
        path: "cart",
        element: <DataObjectLayout />,
        children: [
          {
            index: true,
            element: <CartCartAppPage />,
          },

          {
            path: "cart",
            element: <CartCartAppPage />,
          },

          {
            path: "cartItem",
            element: <CartCartItemAppPage />,
          },

          {
            path: "ko",
            element: <CartKoAppPage />,
          },

          {
            path: "bvf",
            element: <CartBvfAppPage />,
          },
        ],
      },

      {
        path: "orderManagement",
        element: <DataObjectLayout />,
        children: [
          {
            index: true,
            element: <OrderManagementOrderAppPage />,
          },

          {
            path: "order",
            element: <OrderManagementOrderAppPage />,
          },

          {
            path: "orderItem",
            element: <OrderManagementOrderItemAppPage />,
          },

          {
            path: "sys_orderPayment",
            element: <OrderManagementSys_orderPaymentAppPage />,
          },

          {
            path: "sys_paymentCustomer",
            element: <OrderManagementSys_paymentCustomerAppPage />,
          },

          {
            path: "sys_paymentMethod",
            element: <OrderManagementSys_paymentMethodAppPage />,
          },
        ],
      },

      {
        path: "notificationPreferences",
        element: <DataObjectLayout />,
        children: [
          {
            index: true,
            element: (
              <NotificationPreferencesUserNotificationPreferencesAppPage />
            ),
          },

          {
            path: "userNotificationPreferences",
            element: (
              <NotificationPreferencesUserNotificationPreferencesAppPage />
            ),
          },

          {
            path: "adminNotificationConfig",
            element: <NotificationPreferencesAdminNotificationConfigAppPage />,
          },
        ],
      },

      {
        path: "reporting",
        element: <DataObjectLayout />,
        children: [
          {
            index: true,
            element: <ReportingSalesReportAppPage />,
          },

          {
            path: "salesReport",
            element: <ReportingSalesReportAppPage />,
          },

          {
            path: "exportJob",
            element: <ReportingExportJobAppPage />,
          },

          {
            path: "reportingJobAudit",
            element: <ReportingReportingJobAuditAppPage />,
          },
        ],
      },

      {
        path: "auth",
        element: <DataObjectLayout />,
        children: [
          {
            index: true,
            element: <AuthUserAppPage />,
          },

          {
            path: "user",
            element: <AuthUserAppPage />,
          },
        ],
      },
    ],
  },
];
