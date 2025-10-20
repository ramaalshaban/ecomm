import { paths } from "src/routes/paths";

export const CONFIG = {
  appName: "Ecomm E-Commerce Platform",
  assetsDir: import.meta.env.VITE_ASSETS_DIR ?? "/panel",

  productCatalogServiceUrl:
    import.meta.env.VITE_PRODUCTCATALOG_SERVICE_URL ?? "",

  cartServiceUrl: import.meta.env.VITE_CART_SERVICE_URL ?? "",

  orderManagementServiceUrl:
    import.meta.env.VITE_ORDERMANAGEMENT_SERVICE_URL ?? "",

  notificationPreferencesServiceUrl:
    import.meta.env.VITE_NOTIFICATIONPREFERENCES_SERVICE_URL ?? "",

  reportingServiceUrl: import.meta.env.VITE_REPORTING_SERVICE_URL ?? "",

  authServiceUrl: import.meta.env.VITE_AUTH_SERVICE_URL ?? "",

  auth: {
    skip: false,
    redirectPath: "/" + paths.dashboard.root,
  },
};
