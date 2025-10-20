import { lazy } from "react";

import { useDataObjectContext } from "../nav-section/data/context/index.js";

const ProductCatalogCreateProductApiPage = lazy(
  () => import("src/pages/dashboard/productcatalog/product/createProduct-api"),
);

const ProductCatalogUpdateProductApiPage = lazy(
  () => import("src/pages/dashboard/productcatalog/product/updateProduct-api"),
);

const ProductCatalogDeleteProductApiPage = lazy(
  () => import("src/pages/dashboard/productcatalog/product/deleteProduct-api"),
);

const ProductCatalogGetProductApiPage = lazy(
  () => import("src/pages/dashboard/productcatalog/product/getProduct-api"),
);

const ProductCatalogListProductsApiPage = lazy(
  () => import("src/pages/dashboard/productcatalog/product/listProducts-api"),
);

const CartCreateCartApiPage = lazy(
  () => import("src/pages/dashboard/cart/cart/createCart-api"),
);

const CartGetCartApiPage = lazy(
  () => import("src/pages/dashboard/cart/cart/getCart-api"),
);

const CartUpdateCartApiPage = lazy(
  () => import("src/pages/dashboard/cart/cart/updateCart-api"),
);

const CartDeleteCartApiPage = lazy(
  () => import("src/pages/dashboard/cart/cart/deleteCart-api"),
);

const CartListCartsApiPage = lazy(
  () => import("src/pages/dashboard/cart/cart/listCarts-api"),
);

const OrderManagementCreateOrderApiPage = lazy(
  () => import("src/pages/dashboard/ordermanagement/order/createOrder-api"),
);

const OrderManagementGetOrderApiPage = lazy(
  () => import("src/pages/dashboard/ordermanagement/order/getOrder-api"),
);

const OrderManagementUpdateOrderApiPage = lazy(
  () => import("src/pages/dashboard/ordermanagement/order/updateOrder-api"),
);

const OrderManagementDeleteOrderApiPage = lazy(
  () => import("src/pages/dashboard/ordermanagement/order/deleteOrder-api"),
);

const OrderManagementListOrdersApiPage = lazy(
  () => import("src/pages/dashboard/ordermanagement/order/listOrders-api"),
);

const OrderManagementGetOrderPayment2ApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/ordermanagement/sys_orderpayment/getOrderPayment2-api"
    ),
);

const OrderManagementListOrderPayments2ApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/ordermanagement/sys_orderpayment/listOrderPayments2-api"
    ),
);

const OrderManagementCreateOrderPaymentApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/ordermanagement/sys_orderpayment/createOrderPayment-api"
    ),
);

const OrderManagementUpdateOrderPaymentApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/ordermanagement/sys_orderpayment/updateOrderPayment-api"
    ),
);

const OrderManagementDeleteOrderPaymentApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/ordermanagement/sys_orderpayment/deleteOrderPayment-api"
    ),
);

const OrderManagementGetOrderPaymentByOrderIdApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/ordermanagement/sys_orderpayment/getOrderPaymentByOrderId-api"
    ),
);

const OrderManagementGetOrderPaymentByPaymentIdApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/ordermanagement/sys_orderpayment/getOrderPaymentByPaymentId-api"
    ),
);

const OrderManagementCheckoutStartOrderApiPage = lazy(
  () =>
    import("src/pages/dashboard/ordermanagement/order/checkoutStartOrder-api"),
);

const OrderManagementCheckoutCompleteOrderApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/ordermanagement/order/checkoutCompleteOrder-api"
    ),
);

const OrderManagementCheckoutRefreshOrderApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/ordermanagement/order/checkoutRefreshOrder-api"
    ),
);

const OrderManagementGetPaymentCustomerByUserIdApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/ordermanagement/sys_paymentcustomer/getPaymentCustomerByUserId-api"
    ),
);

const OrderManagementListPaymentCustomersApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/ordermanagement/sys_paymentcustomer/listPaymentCustomers-api"
    ),
);

const OrderManagementListPaymentCustomerMethodsApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/ordermanagement/sys_paymentmethod/listPaymentCustomerMethods-api"
    ),
);

const NotificationPreferencesCreateUserNotificationPreferencesApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/notificationpreferences/usernotificationpreferences/createUserNotificationPreferences-api"
    ),
);

const NotificationPreferencesGetUserNotificationPreferencesApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/notificationpreferences/usernotificationpreferences/getUserNotificationPreferences-api"
    ),
);

const NotificationPreferencesUpdateUserNotificationPreferencesApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/notificationpreferences/usernotificationpreferences/updateUserNotificationPreferences-api"
    ),
);

const NotificationPreferencesDeleteUserNotificationPreferencesApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/notificationpreferences/usernotificationpreferences/deleteUserNotificationPreferences-api"
    ),
);

const NotificationPreferencesListUserNotificationPreferencesApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/notificationpreferences/usernotificationpreferences/listUserNotificationPreferences-api"
    ),
);

const NotificationPreferencesCreateAdminNotificationConfigApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/notificationpreferences/adminnotificationconfig/createAdminNotificationConfig-api"
    ),
);

const NotificationPreferencesGetAdminNotificationConfigApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/notificationpreferences/adminnotificationconfig/getAdminNotificationConfig-api"
    ),
);

const NotificationPreferencesUpdateAdminNotificationConfigApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/notificationpreferences/adminnotificationconfig/updateAdminNotificationConfig-api"
    ),
);

const NotificationPreferencesDeleteAdminNotificationConfigApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/notificationpreferences/adminnotificationconfig/deleteAdminNotificationConfig-api"
    ),
);

const NotificationPreferencesListAdminNotificationConfigsApiPage = lazy(
  () =>
    import(
      "src/pages/dashboard/notificationpreferences/adminnotificationconfig/listAdminNotificationConfigs-api"
    ),
);

const ReportingCreateSalesReportApiPage = lazy(
  () =>
    import("src/pages/dashboard/reporting/salesreport/createSalesReport-api"),
);

const ReportingCreateExportJobApiPage = lazy(
  () => import("src/pages/dashboard/reporting/exportjob/createExportJob-api"),
);

const ReportingGetExportJobApiPage = lazy(
  () => import("src/pages/dashboard/reporting/exportjob/getExportJob-api"),
);

const ReportingListExportJobsApiPage = lazy(
  () => import("src/pages/dashboard/reporting/exportjob/listExportJobs-api"),
);

const AuthGetUserApiPage = lazy(
  () => import("src/pages/dashboard/auth/user/getUser-api"),
);

const AuthUpdateUserApiPage = lazy(
  () => import("src/pages/dashboard/auth/user/updateUser-api"),
);

const AuthRegisterUserApiPage = lazy(
  () => import("src/pages/dashboard/auth/user/registerUser-api"),
);

const AuthDeleteUserApiPage = lazy(
  () => import("src/pages/dashboard/auth/user/deleteUser-api"),
);

const AuthListUsersApiPage = lazy(
  () => import("src/pages/dashboard/auth/user/listUsers-api"),
);

const AuthUpdateUserRoleApiPage = lazy(
  () => import("src/pages/dashboard/auth/user/updateUserRole-api"),
);

const AuthUpdateUserPasswordApiPage = lazy(
  () => import("src/pages/dashboard/auth/user/updateUserPassword-api"),
);

const AuthGetBriefUserApiPage = lazy(
  () => import("src/pages/dashboard/auth/user/getBriefUser-api"),
);

const APIComponents = {
  ProductCatalogCreateProductApiPage: <ProductCatalogCreateProductApiPage />,

  ProductCatalogUpdateProductApiPage: <ProductCatalogUpdateProductApiPage />,

  ProductCatalogDeleteProductApiPage: <ProductCatalogDeleteProductApiPage />,

  ProductCatalogGetProductApiPage: <ProductCatalogGetProductApiPage />,

  ProductCatalogListProductsApiPage: <ProductCatalogListProductsApiPage />,

  CartCreateCartApiPage: <CartCreateCartApiPage />,

  CartGetCartApiPage: <CartGetCartApiPage />,

  CartUpdateCartApiPage: <CartUpdateCartApiPage />,

  CartDeleteCartApiPage: <CartDeleteCartApiPage />,

  CartListCartsApiPage: <CartListCartsApiPage />,

  OrderManagementCreateOrderApiPage: <OrderManagementCreateOrderApiPage />,

  OrderManagementGetOrderApiPage: <OrderManagementGetOrderApiPage />,

  OrderManagementUpdateOrderApiPage: <OrderManagementUpdateOrderApiPage />,

  OrderManagementDeleteOrderApiPage: <OrderManagementDeleteOrderApiPage />,

  OrderManagementListOrdersApiPage: <OrderManagementListOrdersApiPage />,

  OrderManagementGetOrderPayment2ApiPage: (
    <OrderManagementGetOrderPayment2ApiPage />
  ),

  OrderManagementListOrderPayments2ApiPage: (
    <OrderManagementListOrderPayments2ApiPage />
  ),

  OrderManagementCreateOrderPaymentApiPage: (
    <OrderManagementCreateOrderPaymentApiPage />
  ),

  OrderManagementUpdateOrderPaymentApiPage: (
    <OrderManagementUpdateOrderPaymentApiPage />
  ),

  OrderManagementDeleteOrderPaymentApiPage: (
    <OrderManagementDeleteOrderPaymentApiPage />
  ),

  OrderManagementGetOrderPaymentByOrderIdApiPage: (
    <OrderManagementGetOrderPaymentByOrderIdApiPage />
  ),

  OrderManagementGetOrderPaymentByPaymentIdApiPage: (
    <OrderManagementGetOrderPaymentByPaymentIdApiPage />
  ),

  OrderManagementCheckoutStartOrderApiPage: (
    <OrderManagementCheckoutStartOrderApiPage />
  ),

  OrderManagementCheckoutCompleteOrderApiPage: (
    <OrderManagementCheckoutCompleteOrderApiPage />
  ),

  OrderManagementCheckoutRefreshOrderApiPage: (
    <OrderManagementCheckoutRefreshOrderApiPage />
  ),

  OrderManagementGetPaymentCustomerByUserIdApiPage: (
    <OrderManagementGetPaymentCustomerByUserIdApiPage />
  ),

  OrderManagementListPaymentCustomersApiPage: (
    <OrderManagementListPaymentCustomersApiPage />
  ),

  OrderManagementListPaymentCustomerMethodsApiPage: (
    <OrderManagementListPaymentCustomerMethodsApiPage />
  ),

  NotificationPreferencesCreateUserNotificationPreferencesApiPage: (
    <NotificationPreferencesCreateUserNotificationPreferencesApiPage />
  ),

  NotificationPreferencesGetUserNotificationPreferencesApiPage: (
    <NotificationPreferencesGetUserNotificationPreferencesApiPage />
  ),

  NotificationPreferencesUpdateUserNotificationPreferencesApiPage: (
    <NotificationPreferencesUpdateUserNotificationPreferencesApiPage />
  ),

  NotificationPreferencesDeleteUserNotificationPreferencesApiPage: (
    <NotificationPreferencesDeleteUserNotificationPreferencesApiPage />
  ),

  NotificationPreferencesListUserNotificationPreferencesApiPage: (
    <NotificationPreferencesListUserNotificationPreferencesApiPage />
  ),

  NotificationPreferencesCreateAdminNotificationConfigApiPage: (
    <NotificationPreferencesCreateAdminNotificationConfigApiPage />
  ),

  NotificationPreferencesGetAdminNotificationConfigApiPage: (
    <NotificationPreferencesGetAdminNotificationConfigApiPage />
  ),

  NotificationPreferencesUpdateAdminNotificationConfigApiPage: (
    <NotificationPreferencesUpdateAdminNotificationConfigApiPage />
  ),

  NotificationPreferencesDeleteAdminNotificationConfigApiPage: (
    <NotificationPreferencesDeleteAdminNotificationConfigApiPage />
  ),

  NotificationPreferencesListAdminNotificationConfigsApiPage: (
    <NotificationPreferencesListAdminNotificationConfigsApiPage />
  ),

  ReportingCreateSalesReportApiPage: <ReportingCreateSalesReportApiPage />,

  ReportingCreateExportJobApiPage: <ReportingCreateExportJobApiPage />,

  ReportingGetExportJobApiPage: <ReportingGetExportJobApiPage />,

  ReportingListExportJobsApiPage: <ReportingListExportJobsApiPage />,

  AuthGetUserApiPage: <AuthGetUserApiPage />,

  AuthUpdateUserApiPage: <AuthUpdateUserApiPage />,

  AuthRegisterUserApiPage: <AuthRegisterUserApiPage />,

  AuthDeleteUserApiPage: <AuthDeleteUserApiPage />,

  AuthListUsersApiPage: <AuthListUsersApiPage />,

  AuthUpdateUserRoleApiPage: <AuthUpdateUserRoleApiPage />,

  AuthUpdateUserPasswordApiPage: <AuthUpdateUserPasswordApiPage />,

  AuthGetBriefUserApiPage: <AuthGetBriefUserApiPage />,
};

export function DataObjectApi() {
  const { state } = useDataObjectContext();

  if (!state.selectedApi) return <h2>{state.name} API</h2>;

  return <>{state.selectedApi && APIComponents[state.selectedApi]}</>;
}
