# API INTEGRATION PATTERNS

## Ecomm Admin Panel

This document provides comprehensive information about API integration patterns used in the Ecomm Admin Panel, including HTTP client configuration, request/response handling, error management, and performance optimization strategies.

## Architectural Design Credit and Contact Information

The architectural design of this API integration system is credited to Mindbricks Genesis Engine.

We encourage open communication and welcome any questions or discussions related to the architectural aspects of this API integration system.

## Documentation Scope

This guide covers the complete API integration patterns within the Ecomm Admin Panel. It includes HTTP client configuration, request/response handling, error management, caching strategies, and performance optimization techniques.

**Intended Audience**

This documentation is intended for frontend developers, API integrators, and system architects who need to understand, implement, or maintain API integration patterns within the admin panel.

## HTTP Client Architecture

### Service-Specific Axios Instances

**ProductCatalog Axios Configuration**

```javascript
import axios from "axios";
import { CONFIG } from "src/global-config";

const productCatalogAxiosInstance = axios.create({
  baseURL: CONFIG.productCatalogServiceUrl,
});

productCatalogAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default productCatalogAxiosInstance;
```

**Fetcher Utility**

```javascript
export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];
    const res = await productCatalogAxiosInstance.get(url, { ...config });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};
```

**Service Endpoints**

```javascript
export const productCatalogEndpoints = {
  product: {
    createProduct: "/v1/products",

    updateProduct: "/v1/products/:productId",

    deleteProduct: "/v1/products/:productId",

    getProduct: "/v1/products/:productId",

    listProducts: "/v1/products",
  },
};
```

**Cart Axios Configuration**

```javascript
import axios from "axios";
import { CONFIG } from "src/global-config";

const cartAxiosInstance = axios.create({
  baseURL: CONFIG.cartServiceUrl,
});

cartAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default cartAxiosInstance;
```

**Fetcher Utility**

```javascript
export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];
    const res = await cartAxiosInstance.get(url, { ...config });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};
```

**Service Endpoints**

```javascript
export const cartEndpoints = {
  cart: {
    createCart: "/v1/carts",

    getCart: "/v1/carts/:cartId",

    updateCart: "/v1/carts/:cartId",

    deleteCart: "/v1/carts/:cartId",

    listCarts: "/v1/carts",
  },

  cartItem: {},

  ko: {},

  bvf: {},
};
```

**OrderManagement Axios Configuration**

```javascript
import axios from "axios";
import { CONFIG } from "src/global-config";

const orderManagementAxiosInstance = axios.create({
  baseURL: CONFIG.orderManagementServiceUrl,
});

orderManagementAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default orderManagementAxiosInstance;
```

**Fetcher Utility**

```javascript
export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];
    const res = await orderManagementAxiosInstance.get(url, { ...config });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};
```

**Service Endpoints**

```javascript
export const orderManagementEndpoints = {
  order: {
    createOrder: "/v1/orders",

    getOrder: "/v1/orders/:orderId",

    updateOrder: "/v1/orders/:orderId",

    deleteOrder: "/v1/orders/:orderId",

    listOrders: "/v1/orders",

    checkoutStartOrder: "/v1/checkoutstartorder/:orderId",

    checkoutCompleteOrder: "/v1/checkoutcompleteorder/:orderId",

    checkoutRefreshOrder: "/v1/checkoutrefreshorder/:orderId",
  },

  orderItem: {},

  sys_orderPayment: {
    getOrderPayment2: "/v1/orderpayment2/:sys_orderPaymentId",

    listOrderPayments2: "/v1/orderpayments2",

    createOrderPayment: "/v1/orderpayment",

    updateOrderPayment: "/v1/orderpayment/:sys_orderPaymentId",

    deleteOrderPayment: "/v1/orderpayment/:sys_orderPaymentId",

    listOrderPayments2: "/v1/orderpayments2",

    getOrderPaymentByOrderId: "/v1/orderpaymentbyorderid/:sys_orderPaymentId",

    getOrderPaymentByPaymentId:
      "/v1/orderpaymentbypaymentid/:sys_orderPaymentId",

    getOrderPayment2: "/v1/orderpayment2/:sys_orderPaymentId",
  },

  sys_paymentCustomer: {
    getPaymentCustomerByUserId:
      "/v1/paymentcustomerbyuserid/:sys_paymentCustomerId",

    listPaymentCustomers: "/v1/paymentcustomers",
  },

  sys_paymentMethod: {
    listPaymentCustomerMethods: "/v1/paymentcustomermethods",
  },
};
```

**NotificationPreferences Axios Configuration**

```javascript
import axios from "axios";
import { CONFIG } from "src/global-config";

const notificationPreferencesAxiosInstance = axios.create({
  baseURL: CONFIG.notificationPreferencesServiceUrl,
});

notificationPreferencesAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default notificationPreferencesAxiosInstance;
```

**Fetcher Utility**

```javascript
export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];
    const res = await notificationPreferencesAxiosInstance.get(url, {
      ...config,
    });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};
```

**Service Endpoints**

```javascript
export const notificationPreferencesEndpoints = {
  userNotificationPreferences: {
    createUserNotificationPreferences: "/v1/usernotificationpreferencess",

    getUserNotificationPreferences:
      "/v1/usernotificationpreferencess/:userNotificationPreferencesId",

    updateUserNotificationPreferences:
      "/v1/usernotificationpreferencess/:userNotificationPreferencesId",

    deleteUserNotificationPreferences:
      "/v1/usernotificationpreferencess/:userNotificationPreferencesId",

    listUserNotificationPreferences: "/v1/usernotificationpreferencess",
  },

  adminNotificationConfig: {
    createAdminNotificationConfig: "/v1/adminnotificationconfigs",

    getAdminNotificationConfig:
      "/v1/adminnotificationconfigs/:adminNotificationConfigId",

    updateAdminNotificationConfig:
      "/v1/adminnotificationconfigs/:adminNotificationConfigId",

    deleteAdminNotificationConfig:
      "/v1/adminnotificationconfigs/:adminNotificationConfigId",

    listAdminNotificationConfigs: "/v1/adminnotificationconfigs",
  },
};
```

**Reporting Axios Configuration**

```javascript
import axios from "axios";
import { CONFIG } from "src/global-config";

const reportingAxiosInstance = axios.create({
  baseURL: CONFIG.reportingServiceUrl,
});

reportingAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default reportingAxiosInstance;
```

**Fetcher Utility**

```javascript
export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];
    const res = await reportingAxiosInstance.get(url, { ...config });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};
```

**Service Endpoints**

```javascript
export const reportingEndpoints = {
  salesReport: {
    createSalesReport: "/v1/salesreports",
  },

  exportJob: {
    createExportJob: "/v1/exportjobs",

    getExportJob: "/v1/exportjobs/:exportJobId",

    listExportJobs: "/v1/exportjobs",
  },

  reportingJobAudit: {},
};
```

**Auth Axios Configuration**

```javascript
import axios from "axios";
import { CONFIG } from "src/global-config";

const authAxiosInstance = axios.create({
  baseURL: CONFIG.authServiceUrl,
});

authAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    ),
);

export default authAxiosInstance;
```

**Fetcher Utility**

```javascript
export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];
    const res = await authAxiosInstance.get(url, { ...config });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
};
```

**Service Endpoints**

```javascript
export const authEndpoints = {
  login: "/login",
  me: "/v1/users/:userId",
  logout: "/logout",

  user: {
    getUser: "/v1/users/:userId",

    updateUser: "/v1/users/:userId",

    registerUser: "/v1/registeruser",

    deleteUser: "/v1/users/:userId",

    listUsers: "/v1/users",

    updateUserRole: "/v1/userrole/:userId",

    updateUserPassword: "/v1/userpassword/:userId",

    getBriefUser: "/v1/briefuser/:userId",
  },
};
```

### Service Integration

**ProductCatalog Service Integration**

The ProductCatalog service is integrated using:

- Service-specific Axios instance with base URL configuration
- Dynamic endpoint generation based on business logic
- Error handling through response interceptors
- Fetcher utility for data retrieval

**Available Endpoints:**

- `Product` data object management

**Cart Service Integration**

The Cart service is integrated using:

- Service-specific Axios instance with base URL configuration
- Dynamic endpoint generation based on business logic
- Error handling through response interceptors
- Fetcher utility for data retrieval

**Available Endpoints:**

- `Cart` data object management

- `CartItem` data object management

- `Ko` data object management

- `Bvf` data object management

**OrderManagement Service Integration**

The OrderManagement service is integrated using:

- Service-specific Axios instance with base URL configuration
- Dynamic endpoint generation based on business logic
- Error handling through response interceptors
- Fetcher utility for data retrieval

**Available Endpoints:**

- `Order` data object management

- `OrderItem` data object management

- `Sys_orderPayment` data object management

- `Sys_paymentCustomer` data object management

- `Sys_paymentMethod` data object management

**NotificationPreferences Service Integration**

The NotificationPreferences service is integrated using:

- Service-specific Axios instance with base URL configuration
- Dynamic endpoint generation based on business logic
- Error handling through response interceptors
- Fetcher utility for data retrieval

**Available Endpoints:**

- `UserNotificationPreferences` data object management

- `AdminNotificationConfig` data object management

**Reporting Service Integration**

The Reporting service is integrated using:

- Service-specific Axios instance with base URL configuration
- Dynamic endpoint generation based on business logic
- Error handling through response interceptors
- Fetcher utility for data retrieval

**Available Endpoints:**

- `SalesReport` data object management

- `ExportJob` data object management

- `ReportingJobAudit` data object management

**Auth Service Integration**

The Auth service is integrated using:

- Service-specific Axios instance with base URL configuration
- Dynamic endpoint generation based on business logic
- Error handling through response interceptors
- Fetcher utility for data retrieval

**Available Endpoints:**

- `User` data object management

## Request/Response Patterns

### Standard Request Format

**Request Structure**

```javascript
// Simple GET request
const response = await fetcher("/endpoint");

// GET request with parameters
const response = await fetcher(["/endpoint", { params: { id: 1 } }]);

// POST request

const response = await productCatalogAxiosInstance.post("/endpoint", data);
```

```javascript
// Simple GET request
const response = await fetcher("/endpoint");

// GET request with parameters
const response = await fetcher(["/endpoint", { params: { id: 1 } }]);

// POST request

const response = await cartAxiosInstance.post("/endpoint", data);
```

```javascript
// Simple GET request
const response = await fetcher("/endpoint");

// GET request with parameters
const response = await fetcher(["/endpoint", { params: { id: 1 } }]);

// POST request

const response = await orderManagementAxiosInstance.post("/endpoint", data);
```

```javascript
// Simple GET request
const response = await fetcher("/endpoint");

// GET request with parameters
const response = await fetcher(["/endpoint", { params: { id: 1 } }]);

// POST request

const response = await notificationPreferencesAxiosInstance.post(
  "/endpoint",
  data,
);
```

```javascript
// Simple GET request
const response = await fetcher("/endpoint");

// GET request with parameters
const response = await fetcher(["/endpoint", { params: { id: 1 } }]);

// POST request

const response = await reportingAxiosInstance.post("/endpoint", data);
```

```javascript
// Simple GET request
const response = await fetcher("/endpoint");

// GET request with parameters
const response = await fetcher(["/endpoint", { params: { id: 1 } }]);

// POST request

const response = await authAxiosInstance.post("/endpoint", data);
```

### Response Handling

**Standard Response Format**

```javascript
// Success response
const response = await fetcher("/endpoint");
// response contains the data directly

// Error handling
try {
  const response = await fetcher("/endpoint");
} catch (error) {
  console.error("API Error:", error);
  // Error is already processed by the interceptor
}
```

### Pagination Handling

**Pagination Implementation**

```javascript
// Pagination is handled by the data grid component
// The MUI DataGrid handles pagination automatically
```

## Error Handling Patterns

### Error Classification

**Error Types**

```javascript
// Basic error handling through Axios interceptors
// Errors are processed and simplified before reaching components
```

### Error Handler

**Centralized Error Handling**

```javascript
class APIErrorHandler {
  handleError(error) {
    if (error.response) {
      // Server responded with error status
      return this.handleServerError(error);
    } else if (error.request) {
      // Network error
      return this.handleNetworkError(error);
    } else {
      // Other error
      return this.handleUnknownError(error);
    }
  }

  handleServerError(error) {
    const { status, data } = error.response;

    switch (status) {
      case 400:
        return new ValidationError(
          data.message || "Validation failed",
          data.errors || [],
        );
      case 401:
        return new AuthenticationError(
          data.message || "Authentication required",
        );
      case 403:
        return new AuthorizationError(data.message || "Access denied");
      case 404:
        return new APIError(
          data.message || "Resource not found",
          404,
          "NOT_FOUND",
        );
      case 429:
        return new APIError(
          data.message || "Rate limit exceeded",
          429,
          "RATE_LIMIT",
        );
      case 500:
        return new APIError(
          data.message || "Internal server error",
          500,
          "SERVER_ERROR",
        );
      default:
        return new APIError(
          data.message || "Unknown server error",
          status,
          "UNKNOWN_ERROR",
        );
    }
  }

  handleNetworkError(error) {
    return new NetworkError("Network error occurred", error);
  }

  handleUnknownError(error) {
    return new APIError(
      error.message || "Unknown error occurred",
      0,
      "UNKNOWN_ERROR",
    );
  }
}
```

### Retry Mechanisms

**Exponential Backoff Retry**

```javascript
class RetryManager {
  constructor(options = {}) {
    this.maxRetries = options.maxRetries || 3;
    this.baseDelay = options.baseDelay || 1000;
    this.maxDelay = options.maxDelay || 10000;
    this.retryableStatusCodes = options.retryableStatusCodes || [
      408, 429, 500, 502, 503, 504,
    ];
  }

  async executeWithRetry(operation, context = {}) {
    let lastError;

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;

        if (attempt === this.maxRetries || !this.shouldRetry(error)) {
          break;
        }

        const delay = this.calculateDelay(attempt);
        await this.sleep(delay);
      }
    }

    throw lastError;
  }

  shouldRetry(error) {
    return false;
  }

  calculateDelay(attempt) {
    return 0;
  }

  sleep(ms) {
    return Promise.resolve();
  }
}
```

## Performance Optimization

### Request Batching

**Batch Request Manager**

```javascript
class BatchRequestManager {
  constructor(apiClient) {
    this.apiClient = apiClient;
    this.pendingRequests = new Map();
    this.batchTimeout = 100; // 100ms
  }

  async batchRequest(endpoint, data, options = {}) {
    const batchKey = this.generateBatchKey(endpoint, options);

    if (!this.pendingRequests.has(batchKey)) {
      this.pendingRequests.set(batchKey, []);
    }

    const request = {
      data: data,
      resolve: null,
      reject: null,
      timestamp: Date.now(),
    };

    const promise = new Promise((resolve, reject) => {
      request.resolve = resolve;
      request.reject = reject;
    });

    this.pendingRequests.get(batchKey).push(request);

    // Process batch after timeout
    setTimeout(() => this.processBatch(batchKey), this.batchTimeout);

    return promise;
  }

  async processBatch(batchKey) {
    const requests = this.pendingRequests.get(batchKey);
    if (!requests || requests.length === 0) return;

    this.pendingRequests.delete(batchKey);

    try {
      const [serviceName, endpoint] = batchKey.split(":");
      const batchData = requests.map((req) => req.data);

      const response = await this.apiClient.post(`/${endpoint}/batch`, {
        requests: batchData,
      });

      requests.forEach((request, index) => {
        if (response.data.results[index].success) {
          request.resolve(response.data.results[index].data);
        } else {
          request.reject(new Error(response.data.results[index].error));
        }
      });
    } catch (error) {
      requests.forEach((request) => {
        request.reject(error);
      });
    }
  }
}
```
