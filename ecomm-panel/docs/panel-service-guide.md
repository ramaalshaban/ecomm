# PANEL SERVICE GUIDE

## Ecomm Admin Panel

The Ecomm Admin Panel is a dynamic, auto-generated frontend application that provides a comprehensive management interface for all backend services and data objects within the Ecomm ecosystem. Built using React and Vite, it automatically adapts to the project's service architecture, providing intuitive CRUD operations and real-time data management capabilities.

## Architectural Design Credit and Contact Information

The architectural design of this admin panel is credited to Mindbricks Genesis Engine.

We encourage open communication and welcome any questions or discussions related to the architectural aspects of this admin panel.

## Documentation Scope

Welcome to the official documentation for the Ecomm Admin Panel. This document is designed to provide a comprehensive guide to understanding, configuring, and extending the admin panel's functionality.

**Intended Audience**

This documentation is intended for frontend developers, system administrators, and integrators who need to understand how the admin panel works, how to configure it for different environments, and how to extend its functionality for custom requirements.

**Overview**

Within these pages, you will find detailed information on the panel's architecture, service integration patterns, authentication flows, data object management, and API integration methods. The admin panel serves as a unified interface for managing all aspects of the Ecomm microservices ecosystem.

## Panel Architecture Overview

The Ecomm Admin Panel is built on a dynamic, pattern-driven architecture that automatically generates user interfaces based on the project's service definitions and data object schemas.

### Core Components

**Dynamic Service Integration**

- Automatically discovers and integrates with all backend services defined in the project
- Generates service-specific navigation and routing structures
- Provides unified authentication and session management across all services

**Data Object Management**

- Dynamically creates CRUD interfaces for each data object within services
- Supports complex data relationships and validation rules
- Provides real-time data synchronization with backend services

**Modular UI Framework**

- Built on React with Material-UI components for consistent user experience
- Responsive design that works across desktop and mobile devices
- Extensible component system for custom functionality

### Service Integration Architecture

The admin panel integrates with backend services through a standardized API communication layer:

**ProductCatalog Service Integration**

- **Service Name**: `productCatalog`
- **Service URL**: `VITE_PRODUCTCATALOG_SERVICE_URL`
- **Data Objects**: 1 objects
  - Product

**Cart Service Integration**

- **Service Name**: `cart`
- **Service URL**: `VITE_CART_SERVICE_URL`
- **Data Objects**: 4 objects
  - Cart, CartItem, Ko, Bvf

**OrderManagement Service Integration**

- **Service Name**: `orderManagement`
- **Service URL**: `VITE_ORDERMANAGEMENT_SERVICE_URL`
- **Data Objects**: 5 objects
  - Order, OrderItem, Sys_orderPayment, Sys_paymentCustomer, Sys_paymentMethod

**NotificationPreferences Service Integration**

- **Service Name**: `notificationPreferences`
- **Service URL**: `VITE_NOTIFICATIONPREFERENCES_SERVICE_URL`
- **Data Objects**: 2 objects
  - UserNotificationPreferences, AdminNotificationConfig

**Reporting Service Integration**

- **Service Name**: `reporting`
- **Service URL**: `VITE_REPORTING_SERVICE_URL`
- **Data Objects**: 3 objects
  - SalesReport, ExportJob, ReportingJobAudit

**Auth Service Integration**

- **Service Name**: `auth`
- **Service URL**: `VITE_AUTH_SERVICE_URL`
- **Data Objects**: 1 objects
  - User

## Authentication and Authorization

The admin panel implements a comprehensive authentication system that integrates with the project's authentication service.

### Authentication Flow

**Login Process**

1. User accesses the admin panel login page
2. Credentials are validated against the authentication service
3. JWT access token is received and stored securely
4. Session is established with proper permissions and tenant context

**Token Management**

- Access tokens are stored in secure HTTP-only cookies
- Automatic token refresh mechanisms prevent session expiration
- Multi-tenant support with tenant-specific token handling

### Authorization Levels

**Role-Based Access Control**

- Admin users have full access to all services and data objects
- Service-specific permissions control access to individual modules
- Data object permissions control CRUD operations on specific entities

**Permission Structure**

- `adminPanel.access` - Basic admin panel access

- `ecomm.productCatalog.manage` - Service management permissions

- `ecomm.productCatalog.product.crud` - Data object CRUD permissions

- `ecomm.cart.manage` - Service management permissions

- `ecomm.cart.cart.crud` - Data object CRUD permissions

- `ecomm.cart.cartItem.crud` - Data object CRUD permissions

- `ecomm.cart.ko.crud` - Data object CRUD permissions

- `ecomm.cart.bvf.crud` - Data object CRUD permissions

- `ecomm.orderManagement.manage` - Service management permissions

- `ecomm.orderManagement.order.crud` - Data object CRUD permissions

- `ecomm.orderManagement.orderItem.crud` - Data object CRUD permissions

- `ecomm.orderManagement.sys_orderPayment.crud` - Data object CRUD permissions

- `ecomm.orderManagement.sys_paymentCustomer.crud` - Data object CRUD permissions

- `ecomm.orderManagement.sys_paymentMethod.crud` - Data object CRUD permissions

- `ecomm.notificationPreferences.manage` - Service management permissions

- `ecomm.notificationPreferences.userNotificationPreferences.crud` - Data object CRUD permissions

- `ecomm.notificationPreferences.adminNotificationConfig.crud` - Data object CRUD permissions

- `ecomm.reporting.manage` - Service management permissions

- `ecomm.reporting.salesReport.crud` - Data object CRUD permissions

- `ecomm.reporting.exportJob.crud` - Data object CRUD permissions

- `ecomm.reporting.reportingJobAudit.crud` - Data object CRUD permissions

- `ecomm.auth.manage` - Service management permissions

- `ecomm.auth.user.crud` - Data object CRUD permissions

## Service Integration Guide

### Environment Configuration

The admin panel connects to backend services through environment-specific configuration:

**Development Environment**

```javascript
VITE_AUTH_SERVICE_URL=http://localhost:3001
VITE_USER_SERVICE_URL=http://localhost:3002
VITE_PRODUCT_SERVICE_URL=http://localhost:3003
```

**Staging Environment**

```javascript
VITE_AUTH_SERVICE_URL=https://auth-api.ecomm.staging.mindbricks.com
VITE_USER_SERVICE_URL=https://user-api.ecomm.staging.mindbricks.com
VITE_PRODUCT_SERVICE_URL=https://product-api.ecomm.staging.mindbricks.com
```

**Production Environment**

```javascript
VITE_AUTH_SERVICE_URL=https://auth-api.ecomm.prod.mindbricks.com
VITE_USER_SERVICE_URL=https://user-api.ecomm.prod.mindbricks.com
VITE_PRODUCT_SERVICE_URL=https://product-api.ecomm.prod.mindbricks.com
```

### API Communication Layer

**Axios Configuration**

```javascript
// Base configuration for all service communications
const apiClient = axios.create({
  baseURL: serviceUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});
```

**Request Interceptors**

- Automatic token attachment to all requests
- Error handling and retry logic for failed requests
- Request/response logging for debugging

**Response Interceptors**

- Automatic token refresh on 401 responses
- Error message standardization
- Loading state management

## Data Object Management

### Dynamic CRUD Interface Generation

The admin panel automatically generates complete CRUD interfaces for each data object based on the service definitions:

**ProductCatalog Service Data Objects**

**Product Management**

- **Object Name**: `product`
- **Component Name**: `ProductCatalogProductAppPage`
- **Available Operations**: Create, Read, Update, Delete, List
- **Route Path**: `/dashboard/productCatalog/product`

**Generated Components**

- List View: Displays paginated data with filtering and sorting
- Create Modal: Form for creating new product records
- Update Modal: Form for editing existing product records
- Delete Confirmation: Safe deletion with confirmation dialogs

**Cart Service Data Objects**

**Cart Management**

- **Object Name**: `cart`
- **Component Name**: `CartCartAppPage`
- **Available Operations**: Create, Read, Update, Delete, List
- **Route Path**: `/dashboard/cart/cart`

**Generated Components**

- List View: Displays paginated data with filtering and sorting
- Create Modal: Form for creating new cart records
- Update Modal: Form for editing existing cart records
- Delete Confirmation: Safe deletion with confirmation dialogs

**CartItem Management**

- **Object Name**: `cartItem`
- **Component Name**: `CartCartItemAppPage`
- **Available Operations**: Create, Read, Update, Delete, List
- **Route Path**: `/dashboard/cart/cartItem`

**Generated Components**

- List View: Displays paginated data with filtering and sorting
- Create Modal: Form for creating new cartItem records
- Update Modal: Form for editing existing cartItem records
- Delete Confirmation: Safe deletion with confirmation dialogs

**Ko Management**

- **Object Name**: `ko`
- **Component Name**: `CartKoAppPage`
- **Available Operations**: Create, Read, Update, Delete, List
- **Route Path**: `/dashboard/cart/ko`

**Generated Components**

- List View: Displays paginated data with filtering and sorting
- Create Modal: Form for creating new ko records
- Update Modal: Form for editing existing ko records
- Delete Confirmation: Safe deletion with confirmation dialogs

**Bvf Management**

- **Object Name**: `bvf`
- **Component Name**: `CartBvfAppPage`
- **Available Operations**: Create, Read, Update, Delete, List
- **Route Path**: `/dashboard/cart/bvf`

**Generated Components**

- List View: Displays paginated data with filtering and sorting
- Create Modal: Form for creating new bvf records
- Update Modal: Form for editing existing bvf records
- Delete Confirmation: Safe deletion with confirmation dialogs

**OrderManagement Service Data Objects**

**Order Management**

- **Object Name**: `order`
- **Component Name**: `OrderManagementOrderAppPage`
- **Available Operations**: Create, Read, Update, Delete, List
- **Route Path**: `/dashboard/orderManagement/order`

**Generated Components**

- List View: Displays paginated data with filtering and sorting
- Create Modal: Form for creating new order records
- Update Modal: Form for editing existing order records
- Delete Confirmation: Safe deletion with confirmation dialogs

**OrderItem Management**

- **Object Name**: `orderItem`
- **Component Name**: `OrderManagementOrderItemAppPage`
- **Available Operations**: Create, Read, Update, Delete, List
- **Route Path**: `/dashboard/orderManagement/orderItem`

**Generated Components**

- List View: Displays paginated data with filtering and sorting
- Create Modal: Form for creating new orderItem records
- Update Modal: Form for editing existing orderItem records
- Delete Confirmation: Safe deletion with confirmation dialogs

**Sys_orderPayment Management**

- **Object Name**: `sys_orderPayment`
- **Component Name**: `OrderManagementSys_orderPaymentAppPage`
- **Available Operations**: Create, Read, Update, Delete, List
- **Route Path**: `/dashboard/orderManagement/sys_orderPayment`

**Generated Components**

- List View: Displays paginated data with filtering and sorting
- Create Modal: Form for creating new sys_orderPayment records
- Update Modal: Form for editing existing sys_orderPayment records
- Delete Confirmation: Safe deletion with confirmation dialogs

**Sys_paymentCustomer Management**

- **Object Name**: `sys_paymentCustomer`
- **Component Name**: `OrderManagementSys_paymentCustomerAppPage`
- **Available Operations**: Create, Read, Update, Delete, List
- **Route Path**: `/dashboard/orderManagement/sys_paymentCustomer`

**Generated Components**

- List View: Displays paginated data with filtering and sorting
- Create Modal: Form for creating new sys_paymentCustomer records
- Update Modal: Form for editing existing sys_paymentCustomer records
- Delete Confirmation: Safe deletion with confirmation dialogs

**Sys_paymentMethod Management**

- **Object Name**: `sys_paymentMethod`
- **Component Name**: `OrderManagementSys_paymentMethodAppPage`
- **Available Operations**: Create, Read, Update, Delete, List
- **Route Path**: `/dashboard/orderManagement/sys_paymentMethod`

**Generated Components**

- List View: Displays paginated data with filtering and sorting
- Create Modal: Form for creating new sys_paymentMethod records
- Update Modal: Form for editing existing sys_paymentMethod records
- Delete Confirmation: Safe deletion with confirmation dialogs

**NotificationPreferences Service Data Objects**

**UserNotificationPreferences Management**

- **Object Name**: `userNotificationPreferences`
- **Component Name**: `NotificationPreferencesUserNotificationPreferencesAppPage`
- **Available Operations**: Create, Read, Update, Delete, List
- **Route Path**: `/dashboard/notificationPreferences/userNotificationPreferences`

**Generated Components**

- List View: Displays paginated data with filtering and sorting
- Create Modal: Form for creating new userNotificationPreferences records
- Update Modal: Form for editing existing userNotificationPreferences records
- Delete Confirmation: Safe deletion with confirmation dialogs

**AdminNotificationConfig Management**

- **Object Name**: `adminNotificationConfig`
- **Component Name**: `NotificationPreferencesAdminNotificationConfigAppPage`
- **Available Operations**: Create, Read, Update, Delete, List
- **Route Path**: `/dashboard/notificationPreferences/adminNotificationConfig`

**Generated Components**

- List View: Displays paginated data with filtering and sorting
- Create Modal: Form for creating new adminNotificationConfig records
- Update Modal: Form for editing existing adminNotificationConfig records
- Delete Confirmation: Safe deletion with confirmation dialogs

**Reporting Service Data Objects**

**SalesReport Management**

- **Object Name**: `salesReport`
- **Component Name**: `ReportingSalesReportAppPage`
- **Available Operations**: Create, Read, Update, Delete, List
- **Route Path**: `/dashboard/reporting/salesReport`

**Generated Components**

- List View: Displays paginated data with filtering and sorting
- Create Modal: Form for creating new salesReport records
- Update Modal: Form for editing existing salesReport records
- Delete Confirmation: Safe deletion with confirmation dialogs

**ExportJob Management**

- **Object Name**: `exportJob`
- **Component Name**: `ReportingExportJobAppPage`
- **Available Operations**: Create, Read, Update, Delete, List
- **Route Path**: `/dashboard/reporting/exportJob`

**Generated Components**

- List View: Displays paginated data with filtering and sorting
- Create Modal: Form for creating new exportJob records
- Update Modal: Form for editing existing exportJob records
- Delete Confirmation: Safe deletion with confirmation dialogs

**ReportingJobAudit Management**

- **Object Name**: `reportingJobAudit`
- **Component Name**: `ReportingReportingJobAuditAppPage`
- **Available Operations**: Create, Read, Update, Delete, List
- **Route Path**: `/dashboard/reporting/reportingJobAudit`

**Generated Components**

- List View: Displays paginated data with filtering and sorting
- Create Modal: Form for creating new reportingJobAudit records
- Update Modal: Form for editing existing reportingJobAudit records
- Delete Confirmation: Safe deletion with confirmation dialogs

**Auth Service Data Objects**

**User Management**

- **Object Name**: `user`
- **Component Name**: `AuthUserAppPage`
- **Available Operations**: Create, Read, Update, Delete, List
- **Route Path**: `/dashboard/auth/user`

**Generated Components**

- List View: Displays paginated data with filtering and sorting
- Create Modal: Form for creating new user records
- Update Modal: Form for editing existing user records
- Delete Confirmation: Safe deletion with confirmation dialogs

### Data Validation and Error Handling

**Client-Side Validation**

- Real-time validation based on data object property definitions
- Type checking and format validation
- Required field validation

**Server-Side Integration**

- API error response handling
- Validation error display
- Success/error notification system

## API Integration Patterns

### Standard CRUD Operations

**List Operations**

```javascript
// Get paginated list of data objects
const response = await apiClient.get(`/${dataObjectName}/list`, {
  params: {
    pageNumber: 1,
    pageRowCount: 25,
    getJoins: true,
    caching: true,
  },
});
```

**Create Operations**

```javascript
// Create new data object
const response = await apiClient.post(`/${dataObjectName}/create`, {
  // Data object properties
});
```

**Update Operations**

```javascript
// Update existing data object
const response = await apiClient.put(`/${dataObjectName}/update`, {
  id: objectId,
  // Updated properties
});
```

**Delete Operations**

```javascript
// Delete data object
const response = await apiClient.delete(`/${dataObjectName}/delete`, {
  params: { id: objectId },
});
```

### Advanced Query Features

**Filtering and Search**

- Dynamic filter generation based on data object properties
- Full-text search capabilities
- Date range filtering
- Multi-select filters for enum properties

**Sorting and Pagination**

- Multi-column sorting support
- Configurable page sizes
- Total count and page navigation
- Infinite scroll option

**Data Relationships**

- Automatic join handling for related data objects
- Lazy loading for performance optimization
- Relationship visualization in forms

## Navigation and Routing

### Dynamic Route Generation

The admin panel automatically generates routes based on the service and data object structure:

**Main Routes**

- `/` - Login page
- `/dashboard` - Main dashboard

- `/dashboard/productCatalog` - Service overview

- `/dashboard/productCatalog/product` - Data object management

- `/dashboard/cart` - Service overview

- `/dashboard/cart/cart` - Data object management

- `/dashboard/cart/cartItem` - Data object management

- `/dashboard/cart/ko` - Data object management

- `/dashboard/cart/bvf` - Data object management

- `/dashboard/orderManagement` - Service overview

- `/dashboard/orderManagement/order` - Data object management

- `/dashboard/orderManagement/orderItem` - Data object management

- `/dashboard/orderManagement/sys_orderPayment` - Data object management

- `/dashboard/orderManagement/sys_paymentCustomer` - Data object management

- `/dashboard/orderManagement/sys_paymentMethod` - Data object management

- `/dashboard/notificationPreferences` - Service overview

- `/dashboard/notificationPreferences/userNotificationPreferences` - Data object management

- `/dashboard/notificationPreferences/adminNotificationConfig` - Data object management

- `/dashboard/reporting` - Service overview

- `/dashboard/reporting/salesReport` - Data object management

- `/dashboard/reporting/exportJob` - Data object management

- `/dashboard/reporting/reportingJobAudit` - Data object management

- `/dashboard/auth` - Service overview

- `/dashboard/auth/user` - Data object management

**Route Configuration**

```javascript
// Automatically generated route structure
const dashboardRoutes = [
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <IndexPage /> },

      {
        path: "productCatalog",
        element: <DataObjectLayout />,
        children: [
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
            path: "user",
            element: <AuthUserAppPage />,
          },
        ],
      },
    ],
  },
];
```

### Navigation Structure

**Main Navigation**

- Dashboard overview
- Service modules (dynamically generated)
- User profile and settings
- Logout functionality

**Service Navigation**

- Service-specific data object management
- Service configuration and settings
- Service health and monitoring

## Error Handling and User Experience

### Error Management System

**API Error Handling**

- Standardized error response processing
- User-friendly error message display
- Automatic retry mechanisms for transient failures
- Offline detection and handling

**Validation Error Display**

- Field-specific error highlighting
- Inline error messages
- Form validation summary

**Loading States**

- Skeleton loading for data tables
- Progress indicators for long operations
- Optimistic updates for better UX

### Notification System

**Success Notifications**

- Operation completion confirmations
- Data synchronization status
- System health updates

**Error Notifications**

- API error alerts
- Validation error summaries
- Network connectivity issues

**Warning Notifications**

- Data loss prevention warnings
- Permission change alerts
- System maintenance notifications

## Deployment and Configuration

### Build Configuration

**Environment-Specific Builds**

- Development builds with debugging enabled
- Staging builds with production-like settings
- Production builds with optimization and minification

**Docker Support**

- Multi-stage Docker builds for different environments
- Environment variable injection
- Health check endpoints

### Performance Optimization

**Code Splitting**

- Route-based code splitting
- Component lazy loading
- Dynamic imports for heavy components

**Caching Strategies**

- API response caching
- Static asset caching
- Browser cache optimization

**Bundle Optimization**

- Tree shaking for unused code
- Asset compression
- CDN integration support

## Security Considerations

### Authentication Security

- Secure token storage and transmission
- Automatic token refresh
- Session timeout handling
- Multi-factor authentication support

### Data Protection

- Input sanitization and validation
- XSS prevention
- CSRF protection
- Secure API communication

### Access Control

- Role-based permission enforcement
- Tenant isolation in multi-tenant setups
- Audit logging for sensitive operations
- Secure logout and session cleanup

## Troubleshooting and Support

### Common Issues

**Authentication Problems**

- Token expiration handling
- Session restoration after page refresh
- Multi-tenant login issues

**API Integration Issues**

- Service connectivity problems
- Data synchronization errors
- Permission-related access denials

**UI/UX Issues**

- Component rendering problems
- Navigation routing issues
- Form validation errors

### Debugging Tools

**Development Tools**

- React Developer Tools integration
- Network request monitoring
- State management debugging
- Performance profiling

**Logging and Monitoring**

- Client-side error logging
- API request/response logging
- User interaction tracking
- Performance metrics collection
