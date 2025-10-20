# DATA OBJECT MANAGEMENT

## Ecomm Admin Panel

This document provides comprehensive information about how the Ecomm Admin Panel manages data objects, including CRUD operations, validation, relationships, and user interface generation.

## Architectural Design Credit and Contact Information

The architectural design of this data object management system is credited to Mindbricks Genesis Engine.

We encourage open communication and welcome any questions or discussions related to the architectural aspects of this data object management system.

## Documentation Scope

This guide covers the complete data object management system within the Ecomm Admin Panel. It includes dynamic UI generation, CRUD operations, data validation, relationship management, and user experience patterns.

**Intended Audience**

This documentation is intended for frontend developers, UI/UX designers, and system administrators who need to understand how data objects are managed, displayed, and manipulated within the admin panel.

## Data Object Architecture

### Overview

The admin panel implements a basic data object management system that generates simple CRUD interfaces for data objects defined in the backend services. Each data object is represented by a data grid for listing and basic modal components for create/update/delete operations.

### Data Object Structure

**Core Data Object Properties**

- **Name**: Unique identifier for the data object
- **Display Name**: Human-readable name for UI display
- **Component Name**: React component name for rendering
- **Properties**: Array of data object properties with types

### Dynamic UI Generation

**Component Generation Pattern**

```javascript
// Data object component structure ProductCatalog product
const DataObjectComponentProductCatalogProduct = {
  // List view for displaying multiple records
  ListView: {
    component: "ProductCatalogProductAppPage",
    features: ["data-grid", "export", "filtering", "search"],
  },

  // Modal components for data manipulation
  CreateModal: {
    component: "ProductCatalogProductAppPageCreateModal",
    lazy: true,
  },

  UpdateModal: {
    component: "ProductCatalogProductAppPageUpdateModal",
    lazy: true,
  },

  // Action components
  DeleteModal: {
    component: "ProductCatalogProductAppPageDeleteModal",
    lazy: true,
  },
};

// Data object component structure Cart cart
const DataObjectComponentCartCart = {
  // List view for displaying multiple records
  ListView: {
    component: "CartCartAppPage",
    features: ["data-grid", "export", "filtering", "search"],
  },

  // Modal components for data manipulation
  CreateModal: {
    component: "CartCartAppPageCreateModal",
    lazy: true,
  },

  UpdateModal: {
    component: "CartCartAppPageUpdateModal",
    lazy: true,
  },

  // Action components
  DeleteModal: {
    component: "CartCartAppPageDeleteModal",
    lazy: true,
  },
};

// Data object component structure Cart cartItem
const DataObjectComponentCartCartItem = {
  // List view for displaying multiple records
  ListView: {
    component: "CartCartItemAppPage",
    features: ["data-grid", "export", "filtering", "search"],
  },

  // Modal components for data manipulation
  CreateModal: {
    component: "CartCartItemAppPageCreateModal",
    lazy: true,
  },

  UpdateModal: {
    component: "CartCartItemAppPageUpdateModal",
    lazy: true,
  },

  // Action components
  DeleteModal: {
    component: "CartCartItemAppPageDeleteModal",
    lazy: true,
  },
};

// Data object component structure Cart ko
const DataObjectComponentCartKo = {
  // List view for displaying multiple records
  ListView: {
    component: "CartKoAppPage",
    features: ["data-grid", "export", "filtering", "search"],
  },

  // Modal components for data manipulation
  CreateModal: {
    component: "CartKoAppPageCreateModal",
    lazy: true,
  },

  UpdateModal: {
    component: "CartKoAppPageUpdateModal",
    lazy: true,
  },

  // Action components
  DeleteModal: {
    component: "CartKoAppPageDeleteModal",
    lazy: true,
  },
};

// Data object component structure Cart bvf
const DataObjectComponentCartBvf = {
  // List view for displaying multiple records
  ListView: {
    component: "CartBvfAppPage",
    features: ["data-grid", "export", "filtering", "search"],
  },

  // Modal components for data manipulation
  CreateModal: {
    component: "CartBvfAppPageCreateModal",
    lazy: true,
  },

  UpdateModal: {
    component: "CartBvfAppPageUpdateModal",
    lazy: true,
  },

  // Action components
  DeleteModal: {
    component: "CartBvfAppPageDeleteModal",
    lazy: true,
  },
};

// Data object component structure OrderManagement order
const DataObjectComponentOrderManagementOrder = {
  // List view for displaying multiple records
  ListView: {
    component: "OrderManagementOrderAppPage",
    features: ["data-grid", "export", "filtering", "search"],
  },

  // Modal components for data manipulation
  CreateModal: {
    component: "OrderManagementOrderAppPageCreateModal",
    lazy: true,
  },

  UpdateModal: {
    component: "OrderManagementOrderAppPageUpdateModal",
    lazy: true,
  },

  // Action components
  DeleteModal: {
    component: "OrderManagementOrderAppPageDeleteModal",
    lazy: true,
  },
};

// Data object component structure OrderManagement orderItem
const DataObjectComponentOrderManagementOrderItem = {
  // List view for displaying multiple records
  ListView: {
    component: "OrderManagementOrderItemAppPage",
    features: ["data-grid", "export", "filtering", "search"],
  },

  // Modal components for data manipulation
  CreateModal: {
    component: "OrderManagementOrderItemAppPageCreateModal",
    lazy: true,
  },

  UpdateModal: {
    component: "OrderManagementOrderItemAppPageUpdateModal",
    lazy: true,
  },

  // Action components
  DeleteModal: {
    component: "OrderManagementOrderItemAppPageDeleteModal",
    lazy: true,
  },
};

// Data object component structure OrderManagement sys_orderPayment
const DataObjectComponentOrderManagementSys_orderPayment = {
  // List view for displaying multiple records
  ListView: {
    component: "OrderManagementSys_orderPaymentAppPage",
    features: ["data-grid", "export", "filtering", "search"],
  },

  // Modal components for data manipulation
  CreateModal: {
    component: "OrderManagementSys_orderPaymentAppPageCreateModal",
    lazy: true,
  },

  UpdateModal: {
    component: "OrderManagementSys_orderPaymentAppPageUpdateModal",
    lazy: true,
  },

  // Action components
  DeleteModal: {
    component: "OrderManagementSys_orderPaymentAppPageDeleteModal",
    lazy: true,
  },
};

// Data object component structure OrderManagement sys_paymentCustomer
const DataObjectComponentOrderManagementSys_paymentCustomer = {
  // List view for displaying multiple records
  ListView: {
    component: "OrderManagementSys_paymentCustomerAppPage",
    features: ["data-grid", "export", "filtering", "search"],
  },

  // Modal components for data manipulation
  CreateModal: {
    component: "OrderManagementSys_paymentCustomerAppPageCreateModal",
    lazy: true,
  },

  UpdateModal: {
    component: "OrderManagementSys_paymentCustomerAppPageUpdateModal",
    lazy: true,
  },

  // Action components
  DeleteModal: {
    component: "OrderManagementSys_paymentCustomerAppPageDeleteModal",
    lazy: true,
  },
};

// Data object component structure OrderManagement sys_paymentMethod
const DataObjectComponentOrderManagementSys_paymentMethod = {
  // List view for displaying multiple records
  ListView: {
    component: "OrderManagementSys_paymentMethodAppPage",
    features: ["data-grid", "export", "filtering", "search"],
  },

  // Modal components for data manipulation
  CreateModal: {
    component: "OrderManagementSys_paymentMethodAppPageCreateModal",
    lazy: true,
  },

  UpdateModal: {
    component: "OrderManagementSys_paymentMethodAppPageUpdateModal",
    lazy: true,
  },

  // Action components
  DeleteModal: {
    component: "OrderManagementSys_paymentMethodAppPageDeleteModal",
    lazy: true,
  },
};

// Data object component structure NotificationPreferences userNotificationPreferences
const DataObjectComponentNotificationPreferencesUserNotificationPreferences = {
  // List view for displaying multiple records
  ListView: {
    component: "NotificationPreferencesUserNotificationPreferencesAppPage",
    features: ["data-grid", "export", "filtering", "search"],
  },

  // Modal components for data manipulation
  CreateModal: {
    component:
      "NotificationPreferencesUserNotificationPreferencesAppPageCreateModal",
    lazy: true,
  },

  UpdateModal: {
    component:
      "NotificationPreferencesUserNotificationPreferencesAppPageUpdateModal",
    lazy: true,
  },

  // Action components
  DeleteModal: {
    component:
      "NotificationPreferencesUserNotificationPreferencesAppPageDeleteModal",
    lazy: true,
  },
};

// Data object component structure NotificationPreferences adminNotificationConfig
const DataObjectComponentNotificationPreferencesAdminNotificationConfig = {
  // List view for displaying multiple records
  ListView: {
    component: "NotificationPreferencesAdminNotificationConfigAppPage",
    features: ["data-grid", "export", "filtering", "search"],
  },

  // Modal components for data manipulation
  CreateModal: {
    component:
      "NotificationPreferencesAdminNotificationConfigAppPageCreateModal",
    lazy: true,
  },

  UpdateModal: {
    component:
      "NotificationPreferencesAdminNotificationConfigAppPageUpdateModal",
    lazy: true,
  },

  // Action components
  DeleteModal: {
    component:
      "NotificationPreferencesAdminNotificationConfigAppPageDeleteModal",
    lazy: true,
  },
};

// Data object component structure Reporting salesReport
const DataObjectComponentReportingSalesReport = {
  // List view for displaying multiple records
  ListView: {
    component: "ReportingSalesReportAppPage",
    features: ["data-grid", "export", "filtering", "search"],
  },

  // Modal components for data manipulation
  CreateModal: {
    component: "ReportingSalesReportAppPageCreateModal",
    lazy: true,
  },

  UpdateModal: {
    component: "ReportingSalesReportAppPageUpdateModal",
    lazy: true,
  },

  // Action components
  DeleteModal: {
    component: "ReportingSalesReportAppPageDeleteModal",
    lazy: true,
  },
};

// Data object component structure Reporting exportJob
const DataObjectComponentReportingExportJob = {
  // List view for displaying multiple records
  ListView: {
    component: "ReportingExportJobAppPage",
    features: ["data-grid", "export", "filtering", "search"],
  },

  // Modal components for data manipulation
  CreateModal: {
    component: "ReportingExportJobAppPageCreateModal",
    lazy: true,
  },

  UpdateModal: {
    component: "ReportingExportJobAppPageUpdateModal",
    lazy: true,
  },

  // Action components
  DeleteModal: {
    component: "ReportingExportJobAppPageDeleteModal",
    lazy: true,
  },
};

// Data object component structure Reporting reportingJobAudit
const DataObjectComponentReportingReportingJobAudit = {
  // List view for displaying multiple records
  ListView: {
    component: "ReportingReportingJobAuditAppPage",
    features: ["data-grid", "export", "filtering", "search"],
  },

  // Modal components for data manipulation
  CreateModal: {
    component: "ReportingReportingJobAuditAppPageCreateModal",
    lazy: true,
  },

  UpdateModal: {
    component: "ReportingReportingJobAuditAppPageUpdateModal",
    lazy: true,
  },

  // Action components
  DeleteModal: {
    component: "ReportingReportingJobAuditAppPageDeleteModal",
    lazy: true,
  },
};

// Data object component structure Auth user
const DataObjectComponentAuthUser = {
  // List view for displaying multiple records
  ListView: {
    component: "AuthUserAppPage",
    features: ["data-grid", "export", "filtering", "search"],
  },

  // Modal components for data manipulation
  CreateModal: {
    component: "AuthUserAppPageCreateModal",
    lazy: true,
  },

  UpdateModal: {
    component: "AuthUserAppPageUpdateModal",
    lazy: true,
  },

  // Action components
  DeleteModal: {
    component: "AuthUserAppPageDeleteModal",
    lazy: true,
  },
};
```

## Service Data Objects

### ProductCatalog Service Data Objects

**Service Overview**

- **Service Name**: `productCatalog`
- **Service Display Name**: `ProductCatalog`
- **Total Data Objects**: 1

**Data Objects**

#### Product Data Object

**Basic Information**

- **Object Name**: `product`
- **Display Name**: `Product`
- **Component Name**: `ProductCatalogProductAppPage`
- **Description**: Represents a product listed in the e-commerce catalog, with full searchable and filterable attributes including inventory, status, pricing, and dimensional details.

**Object Properties**

| Property Name | Type | Required | Default | Definition |
| ------------- | ---- | -------- | ------- | ---------- |

| **name** | String | | N/A | _Product&#39;s name, displayed in catalog, used for search and filtering._ |

| **description** | Text | | N/A | _Long form product description._ |

| **category** | String | | N/A | _Product category for filtering and organization._ |

| **price** | Integer | | N/A | _Product price in minor currency unit (cents)._ |

| **images** | String | | N/A | _Array of product image URLs._ |

| **availability** | Boolean | | N/A | _Derived: true if status == active and inventoryCount &gt; 0. Otherwise, false. Not directly settable; computed._ |

| **status** | Enum | | N/A | _Product status; &#39;active&#39; for available products, &#39;discontinued&#39; for non-sale._ |

| **inventoryCount** | Integer | | N/A | _Number of items in stock; 0 means out of stock._ |

| **sku** | String | | N/A | _Stock keeping unit—must be unique across products._ |

| **tags** | String | | N/A | _Optional array of tags for product search or grouping._ |

| **weight** | Float | | N/A | _Product weight, in grams._ |

| **dimensions** | Object | | N/A | _Object containing length, width, height (in cm or mm as schema decided by client/frontend)._ |

| **attributes** | Object | | N/A | _Flexible object for variant/specification key-value pairs (e.g., color, material, custom properties)._ |

**Enum Properties**

##### status Enum Property

_Enum Options_
| Name | Value | Index |
|------|-------|-------|

| **active** | `"active"` | 0 |

| **discontinued** | `"discontinued"` | 1 |

**Generated UI Components**

- **List Component**: `ProductCatalogProductAppPageList` - Displays paginated data with filtering and sorting
- **Create Modal**: `ProductCatalogProductAppPageCreateModal` - Form for creating new records
- **Update Modal**: `ProductCatalogProductAppPageUpdateModal` - Form for editing existing records
- **Delete Modal**: `ProductCatalogProductAppPageDeleteModal` - Confirmation dialog for deletion

**API Endpoints**

- **List**: `GET /product/list` - Retrieve paginated list of records
- **Get**: `GET /product/get` - Retrieve single record by ID
- **Create**: `POST /product/create` - Create new record
- **Update**: `PUT /product/update` - Update existing record
- **Delete**: `DELETE /product/delete` - Delete record by ID

**Route Configuration**

- **List Route**: `/dashboard/productCatalog/product`
- **Create Route**: `/dashboard/productCatalog/product/create`
- **Update Route**: `/dashboard/productCatalog/product/update/:id`
- **Delete Route**: `/dashboard/productCatalog/product/delete/:id`

### Cart Service Data Objects

**Service Overview**

- **Service Name**: `cart`
- **Service Display Name**: `Cart`
- **Total Data Objects**: 4

**Data Objects**

#### Cart Data Object

**Basic Information**

- **Object Name**: `cart`
- **Display Name**: `Cart`
- **Component Name**: `CartCartAppPage`
- **Description**: Represents a single user&#39;s shopping cart containing selected product items, their quantities, and state as of last update.

**Object Properties**

| Property Name | Type | Required | Default | Definition |
| ------------- | ---- | -------- | ------- | ---------- |

| **userId** | ID | | N/A | _User that owns the cart._ |

| **items** | Object | | N/A | _List of items (cartItem) in the cart. Each represents a product selection at time of add._ |

| **lastModified** | Date | | N/A | _Last time the cart was modified (any change to items)._ |

| **yuy** | Object | | N/A | \*\* |

| **OI** | Boolean | | N/A | \*\* |

| **frf** | Integer | | N/A | \*\* |

| **vrg** | Boolean | | N/A | \*\* |

**Generated UI Components**

- **List Component**: `CartCartAppPageList` - Displays paginated data with filtering and sorting
- **Create Modal**: `CartCartAppPageCreateModal` - Form for creating new records
- **Update Modal**: `CartCartAppPageUpdateModal` - Form for editing existing records
- **Delete Modal**: `CartCartAppPageDeleteModal` - Confirmation dialog for deletion

**API Endpoints**

- **List**: `GET /cart/list` - Retrieve paginated list of records
- **Get**: `GET /cart/get` - Retrieve single record by ID
- **Create**: `POST /cart/create` - Create new record
- **Update**: `PUT /cart/update` - Update existing record
- **Delete**: `DELETE /cart/delete` - Delete record by ID

**Route Configuration**

- **List Route**: `/dashboard/cart/cart`
- **Create Route**: `/dashboard/cart/cart/create`
- **Update Route**: `/dashboard/cart/cart/update/:id`
- **Delete Route**: `/dashboard/cart/cart/delete/:id`

#### CartItem Data Object

**Basic Information**

- **Object Name**: `cartItem`
- **Display Name**: `CartItem`
- **Component Name**: `CartCartItemAppPage`
- **Description**: Describes a product added to a cart with snapshot of its state at time of add—product, quantity, price, and selection attributes.

**Object Properties**

| Property Name | Type | Required | Default | Definition |
| ------------- | ---- | -------- | ------- | ---------- |

| **productId** | ID | | N/A | _Product being added to cart (refers to product catalog)._ |

| **productName** | String | | N/A | _Product name at time of add, cached for display/integrity if product is later removed or renamed._ |

| **priceAtAdd** | Integer | | N/A | _Product price (minor currency unit) at the time the item was added to the cart._ |

| **quantity** | Integer | | N/A | _Quantity of the product in cart._ |

| **image** | String | | N/A | _Product image URL (cached/copy at time of add)._ |

| **attributes** | Object | | N/A | _Flexible object storing selected product options (e.g., color, size, custom) at add time._ |

**Generated UI Components**

- **List Component**: `CartCartItemAppPageList` - Displays paginated data with filtering and sorting
- **Create Modal**: `CartCartItemAppPageCreateModal` - Form for creating new records
- **Update Modal**: `CartCartItemAppPageUpdateModal` - Form for editing existing records
- **Delete Modal**: `CartCartItemAppPageDeleteModal` - Confirmation dialog for deletion

**API Endpoints**

- **List**: `GET /cartItem/list` - Retrieve paginated list of records
- **Get**: `GET /cartItem/get` - Retrieve single record by ID
- **Create**: `POST /cartItem/create` - Create new record
- **Update**: `PUT /cartItem/update` - Update existing record
- **Delete**: `DELETE /cartItem/delete` - Delete record by ID

**Route Configuration**

- **List Route**: `/dashboard/cart/cartItem`
- **Create Route**: `/dashboard/cart/cartItem/create`
- **Update Route**: `/dashboard/cart/cartItem/update/:id`
- **Delete Route**: `/dashboard/cart/cartItem/delete/:id`

#### Ko Data Object

**Basic Information**

- **Object Name**: `ko`
- **Display Name**: `Ko`
- **Component Name**: `CartKoAppPage`
- **Description**: Data object for ko management

**Object Properties**

#### Bvf Data Object

**Basic Information**

- **Object Name**: `bvf`
- **Display Name**: `Bvf`
- **Component Name**: `CartBvfAppPage`
- **Description**: Data object for bvf management

**Object Properties**

### OrderManagement Service Data Objects

**Service Overview**

- **Service Name**: `orderManagement`
- **Service Display Name**: `OrderManagement`
- **Total Data Objects**: 5

**Data Objects**

#### Order Data Object

**Basic Information**

- **Object Name**: `order`
- **Display Name**: `Order`
- **Component Name**: `OrderManagementOrderAppPage`
- **Description**: A purchase order placed by a user, containing selected products, shipping info, total, and payment/lifecycle status. Integrated with Stripe for payment and refunds. Immutable after placed except for admin status/notes/stripe events.

**Object Properties**

| Property Name | Type | Required | Default | Definition |
| ------------- | ---- | -------- | ------- | ---------- |

| **userId** | ID | | N/A | _User placing the order._ |

| **items** | Object | | N/A | _Array of order items purchased (snapshot at time of order)._ |

| **shippingAddress** | Object | | N/A | _Shipping address for the order (recipientName, addressLine1, addressLine2, city, region, postalCode, country, phone)._ |

| **totalAmount** | Integer | | N/A | _Total price (in cents) for all items + shipping, used for payment charging (stripeAmount)._ |

| **currency** | String | | N/A | _Currency code (ISO 4217, e.g., USD, EUR) for payment/stripe._ |

| **status** | Enum | | N/A | _Order lifecycle status. 0: pending, 1: paid, 2: processing, 3: shipped, 4: delivered, 5: cancelled, 6: refunded._ |

| **paymentStatus** | Enum | | N/A | _Payment status for Stripe: 0: unpaid, 1: paid, 2: refunded, 3: failed._ |

| **placedAt** | Date | | N/A | _Timestamp when order was placed/created (for sorting/history)._ |

| **stripePaymentIntentId** | String | | N/A | _Reference to Stripe payment intent for this order. Used to track payment lifecycle and reconciliation._ |

| **refundRequested** | Boolean | | N/A | _Indicates customer/admin has requested a refund for this order._ |

| **refundAmount** | Integer | | N/A | _Amount to refund (in cents). Present if refund is requested/processed. Optional - null if not used/full refund._ |

| **adminNotes** | String | | N/A | _Notes about the order (visible/editable by admins only)._ |

| **orderHistory** | Object | | N/A | _Event log of status/payment/history changes: array of {event:String, date:Date, note:String} for order audit trail._ |

**Enum Properties**

##### status Enum Property

_Enum Options_
| Name | Value | Index |
|------|-------|-------|

| **pending** | `"pending"` | 0 |

| **paid** | `"paid"` | 1 |

| **processing** | `"processing"` | 2 |

| **shipped** | `"shipped"` | 3 |

| **delivered** | `"delivered"` | 4 |

| **cancelled** | `"cancelled"` | 5 |

| **refunded** | `"refunded"` | 6 |

##### paymentStatus Enum Property

_Enum Options_
| Name | Value | Index |
|------|-------|-------|

| **unpaid** | `"unpaid"` | 0 |

| **paid** | `"paid"` | 1 |

| **refunded** | `"refunded"` | 2 |

| **failed** | `"failed"` | 3 |

**Generated UI Components**

- **List Component**: `OrderManagementOrderAppPageList` - Displays paginated data with filtering and sorting
- **Create Modal**: `OrderManagementOrderAppPageCreateModal` - Form for creating new records
- **Update Modal**: `OrderManagementOrderAppPageUpdateModal` - Form for editing existing records
- **Delete Modal**: `OrderManagementOrderAppPageDeleteModal` - Confirmation dialog for deletion

**API Endpoints**

- **List**: `GET /order/list` - Retrieve paginated list of records
- **Get**: `GET /order/get` - Retrieve single record by ID
- **Create**: `POST /order/create` - Create new record
- **Update**: `PUT /order/update` - Update existing record
- **Delete**: `DELETE /order/delete` - Delete record by ID

**Route Configuration**

- **List Route**: `/dashboard/orderManagement/order`
- **Create Route**: `/dashboard/orderManagement/order/create`
- **Update Route**: `/dashboard/orderManagement/order/update/:id`
- **Delete Route**: `/dashboard/orderManagement/order/delete/:id`

#### OrderItem Data Object

**Basic Information**

- **Object Name**: `orderItem`
- **Display Name**: `OrderItem`
- **Component Name**: `OrderManagementOrderItemAppPage`
- **Description**: Snapshot of a product at time of order: productId, name, sku, price per unit, quantity, image url, custom selection/attributes. Not updated after order placed.

**Object Properties**

| Property Name | Type | Required | Default | Definition |
| ------------- | ---- | -------- | ------- | ---------- |

| **productId** | ID | | N/A | _ID of product at time of order (relation to productCatalog), used for validation/reporting._ |

| **productName** | String | | N/A | _Product name at time of order, stored for audit and reference even if original product is renamed/lost._ |

| **sku** | String | | N/A | _Product SKU snapshot for later reference/analytics._ |

| **price** | Integer | | N/A | _Unit price paid for product at order time (minor currency)._ |

| **quantity** | Integer | | N/A | _Quantity of this item purchased in the order._ |

| **image** | String | | N/A | _Image URL of product at order time (audit/reference)._ |

| **attributes** | Object | | N/A | _Flexible snapshot of selected product options/spec at time of order (color, size, etc.)._ |

**Generated UI Components**

- **List Component**: `OrderManagementOrderItemAppPageList` - Displays paginated data with filtering and sorting
- **Create Modal**: `OrderManagementOrderItemAppPageCreateModal` - Form for creating new records
- **Update Modal**: `OrderManagementOrderItemAppPageUpdateModal` - Form for editing existing records
- **Delete Modal**: `OrderManagementOrderItemAppPageDeleteModal` - Confirmation dialog for deletion

**API Endpoints**

- **List**: `GET /orderItem/list` - Retrieve paginated list of records
- **Get**: `GET /orderItem/get` - Retrieve single record by ID
- **Create**: `POST /orderItem/create` - Create new record
- **Update**: `PUT /orderItem/update` - Update existing record
- **Delete**: `DELETE /orderItem/delete` - Delete record by ID

**Route Configuration**

- **List Route**: `/dashboard/orderManagement/orderItem`
- **Create Route**: `/dashboard/orderManagement/orderItem/create`
- **Update Route**: `/dashboard/orderManagement/orderItem/update/:id`
- **Delete Route**: `/dashboard/orderManagement/orderItem/delete/:id`

#### Sys_orderPayment Data Object

**Basic Information**

- **Object Name**: `sys_orderPayment`
- **Display Name**: `Sys_orderPayment`
- **Component Name**: `OrderManagementSys_orderPaymentAppPage`
- **Description**: A payment storage object to store the payment life cyle of orders based on order object. It is autocreated based on the source object&#39;s checkout config

**Object Properties**

| Property Name | Type | Required | Default | Definition |
| ------------- | ---- | -------- | ------- | ---------- |

| **ownerId** | ID | | N/A | _ An ID value to represent owner user who created the order_ |

| **orderId** | ID | | N/A | _an ID value to represent the orderId which is the ID parameter of the source order object_ |

| **paymentId** | String | | N/A | _A String value to represent the paymentId which is generated on the Stripe gateway. This id may represent different objects due to the payment gateway and the chosen flow type_ |

| **paymentStatus** | String | | N/A | _A string value to represent the payment status which belongs to the lifecyle of a Stripe payment._ |

| **statusLiteral** | String | | N/A | _A string value to represent the logical payment status which belongs to the application lifecycle itself._ |

| **redirectUrl** | String | | N/A | _A string value to represent return page of the frontend to show the result of the payment, this is used when the callback is made to server not the client._ |

**Generated UI Components**

- **List Component**: `OrderManagementSys_orderPaymentAppPageList` - Displays paginated data with filtering and sorting
- **Create Modal**: `OrderManagementSys_orderPaymentAppPageCreateModal` - Form for creating new records
- **Update Modal**: `OrderManagementSys_orderPaymentAppPageUpdateModal` - Form for editing existing records
- **Delete Modal**: `OrderManagementSys_orderPaymentAppPageDeleteModal` - Confirmation dialog for deletion

**API Endpoints**

- **List**: `GET /sys_orderPayment/list` - Retrieve paginated list of records
- **Get**: `GET /sys_orderPayment/get` - Retrieve single record by ID
- **Create**: `POST /sys_orderPayment/create` - Create new record
- **Update**: `PUT /sys_orderPayment/update` - Update existing record
- **Delete**: `DELETE /sys_orderPayment/delete` - Delete record by ID

**Route Configuration**

- **List Route**: `/dashboard/orderManagement/sys_orderPayment`
- **Create Route**: `/dashboard/orderManagement/sys_orderPayment/create`
- **Update Route**: `/dashboard/orderManagement/sys_orderPayment/update/:id`
- **Delete Route**: `/dashboard/orderManagement/sys_orderPayment/delete/:id`

#### Sys_paymentCustomer Data Object

**Basic Information**

- **Object Name**: `sys_paymentCustomer`
- **Display Name**: `Sys_paymentCustomer`
- **Component Name**: `OrderManagementSys_paymentCustomerAppPage`
- **Description**: A payment storage object to store the customer values of the payment platform

**Object Properties**

| Property Name | Type | Required | Default | Definition |
| ------------- | ---- | -------- | ------- | ---------- |

| **userId** | ID | | N/A | _ An ID value to represent the user who is created as a stripe customer_ |

| **customerId** | String | | N/A | _A string value to represent the customer id which is generated on the Stripe gateway. This id is used to represent the customer in the Stripe gateway_ |

| **platform** | String | | N/A | _A String value to represent payment platform which is used to make the payment. It is stripe as default. It will be used to distinguesh the payment gateways in the future._ |

**Generated UI Components**

- **List Component**: `OrderManagementSys_paymentCustomerAppPageList` - Displays paginated data with filtering and sorting
- **Create Modal**: `OrderManagementSys_paymentCustomerAppPageCreateModal` - Form for creating new records
- **Update Modal**: `OrderManagementSys_paymentCustomerAppPageUpdateModal` - Form for editing existing records
- **Delete Modal**: `OrderManagementSys_paymentCustomerAppPageDeleteModal` - Confirmation dialog for deletion

**API Endpoints**

- **List**: `GET /sys_paymentCustomer/list` - Retrieve paginated list of records
- **Get**: `GET /sys_paymentCustomer/get` - Retrieve single record by ID
- **Create**: `POST /sys_paymentCustomer/create` - Create new record
- **Update**: `PUT /sys_paymentCustomer/update` - Update existing record
- **Delete**: `DELETE /sys_paymentCustomer/delete` - Delete record by ID

**Route Configuration**

- **List Route**: `/dashboard/orderManagement/sys_paymentCustomer`
- **Create Route**: `/dashboard/orderManagement/sys_paymentCustomer/create`
- **Update Route**: `/dashboard/orderManagement/sys_paymentCustomer/update/:id`
- **Delete Route**: `/dashboard/orderManagement/sys_paymentCustomer/delete/:id`

#### Sys_paymentMethod Data Object

**Basic Information**

- **Object Name**: `sys_paymentMethod`
- **Display Name**: `Sys_paymentMethod`
- **Component Name**: `OrderManagementSys_paymentMethodAppPage`
- **Description**: A payment storage object to store the payment methods of the platform customers

**Object Properties**

| Property Name | Type | Required | Default | Definition |
| ------------- | ---- | -------- | ------- | ---------- |

| **paymentMethodId** | String | | N/A | _A string value to represent the id of the payment method on the payment platform._ |

| **userId** | ID | | N/A | _ An ID value to represent the user who owns the payment method_ |

| **customerId** | String | | N/A | _A string value to represent the customer id which is generated on the payment gateway._ |

| **cardHolderName** | String | | N/A | _A string value to represent the name of the card holder. It can be different than the registered customer._ |

| **cardHolderZip** | String | | N/A | _A string value to represent the zip code of the card holder. It is used for address verification in specific countries._ |

| **platform** | String | | N/A | _A String value to represent payment platform which teh paymentMethod belongs. It is stripe as default. It will be used to distinguesh the payment gateways in the future._ |

| **cardInfo** | Object | | N/A | _A Json value to store the card details of the payment method._ |

**Generated UI Components**

- **List Component**: `OrderManagementSys_paymentMethodAppPageList` - Displays paginated data with filtering and sorting
- **Create Modal**: `OrderManagementSys_paymentMethodAppPageCreateModal` - Form for creating new records
- **Update Modal**: `OrderManagementSys_paymentMethodAppPageUpdateModal` - Form for editing existing records
- **Delete Modal**: `OrderManagementSys_paymentMethodAppPageDeleteModal` - Confirmation dialog for deletion

**API Endpoints**

- **List**: `GET /sys_paymentMethod/list` - Retrieve paginated list of records
- **Get**: `GET /sys_paymentMethod/get` - Retrieve single record by ID
- **Create**: `POST /sys_paymentMethod/create` - Create new record
- **Update**: `PUT /sys_paymentMethod/update` - Update existing record
- **Delete**: `DELETE /sys_paymentMethod/delete` - Delete record by ID

**Route Configuration**

- **List Route**: `/dashboard/orderManagement/sys_paymentMethod`
- **Create Route**: `/dashboard/orderManagement/sys_paymentMethod/create`
- **Update Route**: `/dashboard/orderManagement/sys_paymentMethod/update/:id`
- **Delete Route**: `/dashboard/orderManagement/sys_paymentMethod/delete/:id`

### NotificationPreferences Service Data Objects

**Service Overview**

- **Service Name**: `notificationPreferences`
- **Service Display Name**: `NotificationPreferences`
- **Total Data Objects**: 2

**Data Objects**

#### UserNotificationPreferences Data Object

**Basic Information**

- **Object Name**: `userNotificationPreferences`
- **Display Name**: `UserNotificationPreferences`
- **Component Name**: `NotificationPreferencesUserNotificationPreferencesAppPage`
- **Description**: Stores notification preferences for a user, indicating which event types (order, shipping, promo, payment, system) they wish to receive notifications for.

**Object Properties**

| Property Name | Type | Required | Default | Definition |
| ------------- | ---- | -------- | ------- | ---------- |

| **userId** | ID | | N/A | _User owner of these notification preferences._ |

| **orderUpdates** | Boolean | | N/A | _Receive notifications for order status changes._ |

| **shippingUpdates** | Boolean | | N/A | _Receive notifications for shipping/tracking events._ |

| **promoOptIn** | Boolean | | N/A | _Opt-in for receiving promotional or marketing notifications/emails._ |

| **paymentEvents** | Boolean | | N/A | _Receive notifications for payment events (e.g. payment received, failed)._ |

| **systemEvents** | Boolean | | N/A | _(Admin Only) Receive system/platform-level notifications. Ignored for regular users._ |

**Generated UI Components**

- **List Component**: `NotificationPreferencesUserNotificationPreferencesAppPageList` - Displays paginated data with filtering and sorting
- **Create Modal**: `NotificationPreferencesUserNotificationPreferencesAppPageCreateModal` - Form for creating new records
- **Update Modal**: `NotificationPreferencesUserNotificationPreferencesAppPageUpdateModal` - Form for editing existing records
- **Delete Modal**: `NotificationPreferencesUserNotificationPreferencesAppPageDeleteModal` - Confirmation dialog for deletion

**API Endpoints**

- **List**: `GET /userNotificationPreferences/list` - Retrieve paginated list of records
- **Get**: `GET /userNotificationPreferences/get` - Retrieve single record by ID
- **Create**: `POST /userNotificationPreferences/create` - Create new record
- **Update**: `PUT /userNotificationPreferences/update` - Update existing record
- **Delete**: `DELETE /userNotificationPreferences/delete` - Delete record by ID

**Route Configuration**

- **List Route**: `/dashboard/notificationPreferences/userNotificationPreferences`
- **Create Route**: `/dashboard/notificationPreferences/userNotificationPreferences/create`
- **Update Route**: `/dashboard/notificationPreferences/userNotificationPreferences/update/:id`
- **Delete Route**: `/dashboard/notificationPreferences/userNotificationPreferences/delete/:id`

#### AdminNotificationConfig Data Object

**Basic Information**

- **Object Name**: `adminNotificationConfig`
- **Display Name**: `AdminNotificationConfig`
- **Component Name**: `NotificationPreferencesAdminNotificationConfigAppPage`
- **Description**: Stores notification configuration for administrators, specifying which system events should trigger notifications, preferred delivery channels, and enablement status.

**Object Properties**

| Property Name | Type | Required | Default | Definition |
| ------------- | ---- | -------- | ------- | ---------- |

| **adminId** | ID | | N/A | _Admin owner of this notification config (must be an admin role user)._ |

| **triggerEvents** | String | | N/A | _Array of event code strings (e.g. orderPlaced, paymentFailed) that trigger admin notification._ |

| **notifyBy** | String | | N/A | _Array of preferred notification channels (e.g., email, inApp)._ |

| **enabled** | Boolean | | N/A | _If false, no notifications will be sent; acts as a master enable/disable flag._ |

**Generated UI Components**

- **List Component**: `NotificationPreferencesAdminNotificationConfigAppPageList` - Displays paginated data with filtering and sorting
- **Create Modal**: `NotificationPreferencesAdminNotificationConfigAppPageCreateModal` - Form for creating new records
- **Update Modal**: `NotificationPreferencesAdminNotificationConfigAppPageUpdateModal` - Form for editing existing records
- **Delete Modal**: `NotificationPreferencesAdminNotificationConfigAppPageDeleteModal` - Confirmation dialog for deletion

**API Endpoints**

- **List**: `GET /adminNotificationConfig/list` - Retrieve paginated list of records
- **Get**: `GET /adminNotificationConfig/get` - Retrieve single record by ID
- **Create**: `POST /adminNotificationConfig/create` - Create new record
- **Update**: `PUT /adminNotificationConfig/update` - Update existing record
- **Delete**: `DELETE /adminNotificationConfig/delete` - Delete record by ID

**Route Configuration**

- **List Route**: `/dashboard/notificationPreferences/adminNotificationConfig`
- **Create Route**: `/dashboard/notificationPreferences/adminNotificationConfig/create`
- **Update Route**: `/dashboard/notificationPreferences/adminNotificationConfig/update/:id`
- **Delete Route**: `/dashboard/notificationPreferences/adminNotificationConfig/delete/:id`

### Reporting Service Data Objects

**Service Overview**

- **Service Name**: `reporting`
- **Service Display Name**: `Reporting`
- **Total Data Objects**: 3

**Data Objects**

#### SalesReport Data Object

**Basic Information**

- **Object Name**: `salesReport`
- **Display Name**: `SalesReport`
- **Component Name**: `ReportingSalesReportAppPage`
- **Description**: Aggregated business/sales analytics snapshot for defined date range (on-demand for reporting/dashboard).

**Object Properties**

| Property Name | Type | Required | Default | Definition |
| ------------- | ---- | -------- | ------- | ---------- |

| **dateRange** | Object | | N/A | _Reporting interval: {start, end} Date fields._ |

| **totalRevenue** | Double | | N/A | _Sum of totalAmount for paid/completed orders in range._ |

| **orderCount** | Integer | | N/A | _Number of completed orders in the date range._ |

| **productCount** | Integer | | N/A | _Unique products ordered in period (based on sold counts in orders)._ |

| **bestsellers** | Object | | N/A | _Array of bestseller products in range: {productId, productName, soldCount}._ |

| **refundsTotal** | Double | | N/A | _Sum of all refunded order amounts (in minor unit) in date range._ |

| **exportJobId** | ID | | N/A | _Optional link: the export job this report is attached to (if exported/snapshotted)._ |

**Generated UI Components**

- **List Component**: `ReportingSalesReportAppPageList` - Displays paginated data with filtering and sorting
- **Create Modal**: `ReportingSalesReportAppPageCreateModal` - Form for creating new records
- **Update Modal**: `ReportingSalesReportAppPageUpdateModal` - Form for editing existing records
- **Delete Modal**: `ReportingSalesReportAppPageDeleteModal` - Confirmation dialog for deletion

**API Endpoints**

- **List**: `GET /salesReport/list` - Retrieve paginated list of records
- **Get**: `GET /salesReport/get` - Retrieve single record by ID
- **Create**: `POST /salesReport/create` - Create new record
- **Update**: `PUT /salesReport/update` - Update existing record
- **Delete**: `DELETE /salesReport/delete` - Delete record by ID

**Route Configuration**

- **List Route**: `/dashboard/reporting/salesReport`
- **Create Route**: `/dashboard/reporting/salesReport/create`
- **Update Route**: `/dashboard/reporting/salesReport/update/:id`
- **Delete Route**: `/dashboard/reporting/salesReport/delete/:id`

#### ExportJob Data Object

**Basic Information**

- **Object Name**: `exportJob`
- **Display Name**: `ExportJob`
- **Component Name**: `ReportingExportJobAppPage`
- **Description**: Tracks an export operation for orders or product catalog (for CSV/JSON download by admin).

**Object Properties**

| Property Name | Type | Required | Default | Definition |
| ------------- | ---- | -------- | ------- | ---------- |

| **exportType** | Enum | | N/A | _Export source: orders or products._ |

| **status** | Enum | | N/A | _Export job status: pending, completed, failed._ |

| **requestedBy** | ID | | N/A | _User/admin who requested this export job._ |

| **startedAt** | Date | | N/A | _When export job was started._ |

| **completedAt** | Date | | N/A | _When export job completed (null if not yet)._ |

| **downloadUrl** | String | | N/A | _URL to download exported file; set on completion._ |

**Enum Properties**

##### exportType Enum Property

_Enum Options_
| Name | Value | Index |
|------|-------|-------|

| **orders** | `"orders"` | 0 |

| **products** | `"products"` | 1 |

##### status Enum Property

_Enum Options_
| Name | Value | Index |
|------|-------|-------|

| **pending** | `"pending"` | 0 |

| **completed** | `"completed"` | 1 |

| **failed** | `"failed"` | 2 |

**Generated UI Components**

- **List Component**: `ReportingExportJobAppPageList` - Displays paginated data with filtering and sorting
- **Create Modal**: `ReportingExportJobAppPageCreateModal` - Form for creating new records
- **Update Modal**: `ReportingExportJobAppPageUpdateModal` - Form for editing existing records
- **Delete Modal**: `ReportingExportJobAppPageDeleteModal` - Confirmation dialog for deletion

**API Endpoints**

- **List**: `GET /exportJob/list` - Retrieve paginated list of records
- **Get**: `GET /exportJob/get` - Retrieve single record by ID
- **Create**: `POST /exportJob/create` - Create new record
- **Update**: `PUT /exportJob/update` - Update existing record
- **Delete**: `DELETE /exportJob/delete` - Delete record by ID

**Route Configuration**

- **List Route**: `/dashboard/reporting/exportJob`
- **Create Route**: `/dashboard/reporting/exportJob/create`
- **Update Route**: `/dashboard/reporting/exportJob/update/:id`
- **Delete Route**: `/dashboard/reporting/exportJob/delete/:id`

#### ReportingJobAudit Data Object

**Basic Information**

- **Object Name**: `reportingJobAudit`
- **Display Name**: `ReportingJobAudit`
- **Component Name**: `ReportingReportingJobAuditAppPage`
- **Description**: (Optional: for extension) Audit log for reporting/export operations (who, when, what). Not exposed in CRUD for MVP.

**Object Properties**

| Property Name | Type | Required | Default | Definition |
| ------------- | ---- | -------- | ------- | ---------- |

| **exportJobId** | ID | | N/A | _Reference to exportJob this log is for._ |

| **action** | String | | N/A | _Audit action performed (e.g. exportStarted, exportFailed, reportGenerated)._ |

| **timestamp** | Date | | N/A | _When audit action happened._ |

| **details** | Object | | N/A | _Structured details/context for log entry._ |

**Generated UI Components**

- **List Component**: `ReportingReportingJobAuditAppPageList` - Displays paginated data with filtering and sorting
- **Create Modal**: `ReportingReportingJobAuditAppPageCreateModal` - Form for creating new records
- **Update Modal**: `ReportingReportingJobAuditAppPageUpdateModal` - Form for editing existing records
- **Delete Modal**: `ReportingReportingJobAuditAppPageDeleteModal` - Confirmation dialog for deletion

**API Endpoints**

- **List**: `GET /reportingJobAudit/list` - Retrieve paginated list of records
- **Get**: `GET /reportingJobAudit/get` - Retrieve single record by ID
- **Create**: `POST /reportingJobAudit/create` - Create new record
- **Update**: `PUT /reportingJobAudit/update` - Update existing record
- **Delete**: `DELETE /reportingJobAudit/delete` - Delete record by ID

**Route Configuration**

- **List Route**: `/dashboard/reporting/reportingJobAudit`
- **Create Route**: `/dashboard/reporting/reportingJobAudit/create`
- **Update Route**: `/dashboard/reporting/reportingJobAudit/update/:id`
- **Delete Route**: `/dashboard/reporting/reportingJobAudit/delete/:id`

### Auth Service Data Objects

**Service Overview**

- **Service Name**: `auth`
- **Service Display Name**: `Auth`
- **Total Data Objects**: 1

**Data Objects**

#### User Data Object

**Basic Information**

- **Object Name**: `user`
- **Display Name**: `User`
- **Component Name**: `AuthUserAppPage`
- **Description**: A data object that stores the user information and handles login settings.

**Object Properties**

| Property Name | Type | Required | Default | Definition |
| ------------- | ---- | -------- | ------- | ---------- |

| **email** | String | | N/A | _ A string value to represent the user&#39;s email._ |

| **password** | String | | N/A | _ A string value to represent the user&#39;s password. It will be stored as hashed._ |

| **fullname** | String | | N/A | _A string value to represent the fullname of the user_ |

| **avatar** | String | | N/A | _The avatar url of the user. A random avatar will be generated if not provided_ |

| **roleId** | String | | N/A | _A string value to represent the roleId of the user._ |

| **emailVerified** | Boolean | | N/A | _A boolean value to represent the email verification status of the user._ |

**Generated UI Components**

- **List Component**: `AuthUserAppPageList` - Displays paginated data with filtering and sorting
- **Create Modal**: `AuthUserAppPageCreateModal` - Form for creating new records
- **Update Modal**: `AuthUserAppPageUpdateModal` - Form for editing existing records
- **Delete Modal**: `AuthUserAppPageDeleteModal` - Confirmation dialog for deletion

**API Endpoints**

- **List**: `GET /user/list` - Retrieve paginated list of records
- **Get**: `GET /user/get` - Retrieve single record by ID
- **Create**: `POST /user/create` - Create new record
- **Update**: `PUT /user/update` - Update existing record
- **Delete**: `DELETE /user/delete` - Delete record by ID

**Route Configuration**

- **List Route**: `/dashboard/auth/user`
- **Create Route**: `/dashboard/auth/user/create`
- **Update Route**: `/dashboard/auth/user/update/:id`
- **Delete Route**: `/dashboard/auth/user/delete/:id`

## CRUD Operations

### Create Operations

**Create Form Implementation**

```javascript
// Create forms are generated as lazy-loaded modal components
// Basic form fields are rendered based on data object properties
```

**Create API Integration**

```javascript
// Create operations are handled through service-specific API calls
// Basic validation is performed client-side
```

### Read Operations

**List View Implementation**

```javascript
// List views are implemented using MUI DataGrid
// Data is fetched through service-specific API calls
```

### Update Operations

**Update Form Implementation**

```javascript
// Update forms are generated as lazy-loaded modal components
// Basic form fields are pre-populated with existing data
```

**Update API Integration**

```javascript
// Update operations are handled through service-specific API calls
// Basic validation is performed client-side
```

### Delete Operations

**Delete Implementation**

```javascript
// Delete operations are handled through service-specific API calls
// Confirmation dialogs are implemented as modal components
```

## Data Validation

### Client-Side Validation

**Validation Implementation**

```javascript
// Basic validation is performed on form fields
// Required fields are validated before submission
```

### Server-Side Validation Integration

**API Error Handling**

```javascript
// Server validation errors are displayed to users
// Error messages are shown in the UI components
```

## Data Relationships

### Relationship Management

**Relationship Implementation**

```javascript
// Basic data relationships are handled through form fields
// Related data is displayed in select components
```

## User Experience Patterns

### Loading States

**Loading Implementation**

```javascript
// Loading states are handled by MUI DataGrid
// Skeleton loading is provided by the data grid component
```

### Error States

**Error Handling UI**

```javascript
// Error states are displayed through UI components
// Error messages are shown to users
```

### Empty States

**Empty State UI**

```javascript
// Empty states are handled by MUI DataGrid
// Empty content is displayed when no data is available
```

## Performance Optimization

### Data Pagination

**Pagination Implementation**

```javascript
// Pagination is handled by MUI DataGrid
// Data is loaded in pages as needed
```
