# SERVICE INTEGRATION GUIDE

## Ecomm Admin Panel

This document provides detailed information about how the Ecomm Admin Panel integrates with backend services, including configuration, API communication patterns, and service-specific implementation details.

## Architectural Design Credit and Contact Information

The architectural design of this service integration is credited to Mindbricks Genesis Engine.

We encourage open communication and welcome any questions or discussions related to the architectural aspects of this service integration.

## Documentation Scope

This guide covers the complete integration architecture between the Ecomm Admin Panel and its backend services. It includes configuration management, API communication patterns, authentication flows, and service-specific implementation details.

**Intended Audience**

This documentation is intended for frontend developers, DevOps engineers, and system integrators who need to understand, configure, or extend the admin panel's service integration capabilities.

## Service Integration Architecture

### Overview

The admin panel integrates with backend services through service-specific HTTP clients. Each service is configured via environment variables and uses its own Axios instance for API communication.

### Integration Components

**Service Configuration**

- Service URLs configured via environment variables
- Service-specific Axios instances for API communication

**API Communication**

- Basic HTTP client instances per service
- Simple error handling through response interceptors

## Service Configuration

### Environment Variables

The admin panel uses environment variables to configure service endpoints and integration settings:

**Core Configuration**

```bash
# Application Configuration
VITE_APP_NAME="Ecomm Admin Panel"
VITE_APP_VERSION="1.0.72"
VITE_ASSETS_DIR="/assets"

# Authentication Configuration
VITE_AUTH_SKIP=false
VITE_AUTH_REDIRECT_PATH="/panel/dashboard"
```

**Service Endpoints**

````bash
# ProductCatalog Service
VITE_PRODUCTCATALOG_SERVICE_URL="https://productCatalog-api.ecomm.prod.mindbricks.com"

```bash
# Cart Service
VITE_CART_SERVICE_URL="https://cart-api.ecomm.prod.mindbricks.com"

```bash
# OrderManagement Service
VITE_ORDERMANAGEMENT_SERVICE_URL="https://orderManagement-api.ecomm.prod.mindbricks.com"

```bash
# NotificationPreferences Service
VITE_NOTIFICATIONPREFERENCES_SERVICE_URL="https://notificationPreferences-api.ecomm.prod.mindbricks.com"

```bash
# Reporting Service
VITE_REPORTING_SERVICE_URL="https://reporting-api.ecomm.prod.mindbricks.com"

```bash
# Auth Service
VITE_AUTH_SERVICE_URL="https://auth-api.ecomm.prod.mindbricks.com"

````

## API Communication Patterns

### HTTP Client Configuration

**Service-Specific Axios Instances**

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

### Service Endpoints

**ProductCatalog Service Endpoints**

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

**Cart Service Endpoints**

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

**OrderManagement Service Endpoints**

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

**NotificationPreferences Service Endpoints**

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

**Reporting Service Endpoints**

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

**Auth Service Endpoints**

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

## Authentication Integration

### JWT Token Management

**Basic Token Handling**

```javascript
// Authentication is handled through the AuthProvider context
// Tokens are managed by the JWT authentication system
```

### Multi-Service Authentication

**Service Authentication Implementation**

```javascript
// Basic JWT authentication is used across all services
// Authentication context is shared between services
```

## Data Synchronization

### Real-Time Updates

**Data Synchronization Implementation**

```javascript
// Data is fetched on-demand through API calls
// No real-time synchronization is required
```

### Optimistic Updates

**Update Strategy Implementation**

```javascript
// Data is updated directly through API calls
// Changes are reflected immediately after successful API response
```

## Error Handling and Resilience

### Error Handling

**Error Handling Implementation**

```javascript
// Basic error handling through Axios response interceptors
// Errors are logged and simplified for display
```

### Retry Mechanisms

**Retry Implementation**

```javascript
// Basic error handling through Axios interceptors
// Errors are logged and displayed to users
```

## Service-Specific Integration Details

### ProductCatalog Service Integration

**Service Overview**

- **Service Name**: `productCatalog`
- **Display Name**: `ProductCatalog`
- **Primary Purpose**: Microservice for managing the master product catalog: crud, searching, filtering, and realtime product availability for ecommerce...

**Integration Features**

- Basic CRUD operations for data objects
- Simple error handling

**Data Object Management**

- **Product**: Represents a product listed in the e-commerce catalog, with full searchable and filterable attributes including inventory, status, pricing, and dimensional details.

**API Endpoints**

- Data Operations: Service-specific CRUD endpoints based on business logic

**Configuration Requirements**

```bash
VITE_PRODUCTCATALOG_SERVICE_URL=https://productCatalog-api.ecomm.prod.mindbricks.com
```

### Cart Service Integration

**Service Overview**

- **Service Name**: `cart`
- **Display Name**: `Cart`
- **Primary Purpose**: Manages each user&#39;s active shopping cart in the e-commerce platform, allowing product selection, cart review, and update operations prior to checkout.

**Integration Features**

- Basic CRUD operations for data objects
- Simple error handling

**Data Object Management**

- **Cart**: Represents a single user&#39;s shopping cart containing selected product items, their quantities, and state as of last update.

- **CartItem**: Describes a product added to a cart with snapshot of its state at time of add—product, quantity, price, and selection attributes.

- **Ko**: Data object for ko management

- **Bvf**: Data object for bvf management

**API Endpoints**

- Data Operations: Service-specific CRUD endpoints based on business logic

**Configuration Requirements**

```bash
VITE_CART_SERVICE_URL=https://cart-api.ecomm.prod.mindbricks.com
```

### OrderManagement Service Integration

**Service Overview**

- **Service Name**: `orderManagement`
- **Display Name**: `OrderManagement`
- **Primary Purpose**: Handles creation, status/lifecycle updates, and storage of e-commerce orders. Integrates with Stripe for payments/refunds. Allows customers to view order history and admins to manage all orders. Captures shipping details, order items, and maintains an event log per order...

**Integration Features**

- Basic CRUD operations for data objects
- Simple error handling

**Data Object Management**

- **Order**: A purchase order placed by a user, containing selected products, shipping info, total, and payment/lifecycle status. Integrated with Stripe for payment and refunds. Immutable after placed except for admin status/notes/stripe events.

- **OrderItem**: Snapshot of a product at time of order: productId, name, sku, price per unit, quantity, image url, custom selection/attributes. Not updated after order placed.

- **Sys_orderPayment**: A payment storage object to store the payment life cyle of orders based on order object. It is autocreated based on the source object&#39;s checkout config

- **Sys_paymentCustomer**: A payment storage object to store the customer values of the payment platform

- **Sys_paymentMethod**: A payment storage object to store the payment methods of the platform customers

**API Endpoints**

- Data Operations: Service-specific CRUD endpoints based on business logic

**Configuration Requirements**

```bash
VITE_ORDERMANAGEMENT_SERVICE_URL=https://orderManagement-api.ecomm.prod.mindbricks.com
```

### NotificationPreferences Service Integration

**Service Overview**

- **Service Name**: `notificationPreferences`
- **Display Name**: `NotificationPreferences`
- **Primary Purpose**: Manages user and admin notification preferences, controlling which types of notification events are delivered and how, with strong ownership enforcement and session-driven integrity.

**Integration Features**

- Basic CRUD operations for data objects
- Simple error handling

**Data Object Management**

- **UserNotificationPreferences**: Stores notification preferences for a user, indicating which event types (order, shipping, promo, payment, system) they wish to receive notifications for.

- **AdminNotificationConfig**: Stores notification configuration for administrators, specifying which system events should trigger notifications, preferred delivery channels, and enablement status.

**API Endpoints**

- Data Operations: Service-specific CRUD endpoints based on business logic

**Configuration Requirements**

```bash
VITE_NOTIFICATIONPREFERENCES_SERVICE_URL=https://notificationPreferences-api.ecomm.prod.mindbricks.com
```

### Reporting Service Integration

**Service Overview**

- **Service Name**: `reporting`
- **Display Name**: `Reporting`
- **Primary Purpose**: Aggregates business and sales analytics from orders and products. Provides report datasets for revenue, orders, and product performance and supports data exports (CSV/JSON).

**Integration Features**

- Basic CRUD operations for data objects
- Simple error handling

**Data Object Management**

- **SalesReport**: Aggregated business/sales analytics snapshot for defined date range (on-demand for reporting/dashboard).

- **ExportJob**: Tracks an export operation for orders or product catalog (for CSV/JSON download by admin).

- **ReportingJobAudit**: (Optional: for extension) Audit log for reporting/export operations (who, when, what). Not exposed in CRUD for MVP.

**API Endpoints**

- Data Operations: Service-specific CRUD endpoints based on business logic

**Configuration Requirements**

```bash
VITE_REPORTING_SERVICE_URL=https://reporting-api.ecomm.prod.mindbricks.com
```

### Auth Service Integration

**Service Overview**

- **Service Name**: `auth`
- **Display Name**: `Auth`
- **Primary Purpose**: Authentication service for the project

**Integration Features**

- Basic CRUD operations for data objects
- Simple error handling

**Data Object Management**

- **User**: A data object that stores the user information and handles login settings.

**API Endpoints**

- Data Operations: Service-specific CRUD endpoints based on business logic

**Configuration Requirements**

```bash
VITE_AUTH_SERVICE_URL=https://auth-api.ecomm.prod.mindbricks.com
```

## Performance Optimization

### Caching Strategies

**Caching Implementation**

```javascript
// Data is fetched on-demand through API calls
// No caching is required for current use cases
```

### Request Batching

**Request Batching Implementation**

```javascript
// Individual API calls are made as needed
// Each operation is handled independently
```

## Monitoring and Logging

### Service Monitoring

**Monitoring Implementation**

```javascript
// Basic error logging through console.error
// Service health is monitored through API responses
```

### Error Logging

**Error Logging Implementation**

```javascript
// Basic error logging through console.error
// Errors are displayed to users through UI components
```
