# Service Design Specification - Object Design for order

**ecomm-ordermanagement-service** documentation

## Document Overview

This document outlines the object design for the `order` model in our application. It includes details about the model's attributes, relationships, and any specific validation or business logic that applies.

## order Data Object

### Object Overview

**Description:** A purchase order placed by a user, containing selected products, shipping info, total, and payment/lifecycle status. Integrated with Stripe for payment and refunds. Immutable after placed except for admin status/notes/stripe events.

This object represents a core data structure within the service and acts as the blueprint for database interaction, API generation, and business logic enforcement.
It is defined using the `ObjectSettings` pattern, which governs its behavior, access control, caching strategy, and integration points with other systems such as Stripe and Redis.

### Core Configuration

- **Soft Delete:** Enabled — Determines whether records are marked inactive (`isActive = false`) instead of being physically deleted.
- **Public Access:** accessPrivate — If enabled, anonymous users may access this object’s data depending on API-level rules.

### Redis Entity Caching

This data object is configured for Redis entity caching, which improves data retrieval performance by storing frequently accessed data in Redis.
Each time a new instance is created, updated or deleted, the cache is updated accordingly. Any get requests by id will first check the cache before querying the database.
If you want to use the cache by other select criteria, you can configure any data property as a Redis cluster.

- **Smart Caching is activated:**
  A data object instance will only be cached when it is accessed for the first time.
  TTL (time-to-live) is dynamically calculated based on access frequency, which is useful for large datasets with volatile usage patterns.
  Each data instance has 15 minutes of TTL and in each access, the TTL is extended by 15 minutes.
  If the data is not accessed for 15 minutes, it will be removed from the cache.

- **Cache Criteria:**

```js
{"status":"processing"}
```

This object is only cached if this criteria is met.

The criteria is checked during all operations, including read operations.
If your criteria is all about the data properties, you can use the `checkCriteriaOnlyInCreateAndUpdates` option to improve performance.

### Composite Indexes

- **userOrderHistIdx**: [userId, placedAt]
  This composite index is defined to optimize query performance for complex queries involving multiple fields.

The index also defines a conflict resolution strategy for duplicate key violations.

When a new record would violate this composite index, the following action will be taken:

**On Duplicate**: `doNothing`

The insert operation will be ignored, leaving the existing record unchanged. No error will be thrown.

### Stripe Integration

This data object is configured to integrate with Stripe for order management of `order`. It is designed to handle payment processing and order tracking.
To manage payments, Mindbricks will design additional Business API routes arround this data object, which will be used checkout orders and charge customers.

- **Order Name**: `order`

- **Order Id Property**: this.order.id
  This MScript expression is used to extract the order's unique identifier from the data object.
- **Order Amount Property**: this.order.totalAmount
  This MScript expression is used to determine the order amount for payment. It should return a numeric value representing the total amount to be charged.
- **Order Currency Property**: this.order.currency
  This MScript expression is used to determine the currency for the order. It should return a string representing the currency code (e.g., "USD", "EUR").
- **Order Description Property**: `Order #${this.order.id} by user ${this.order.userId}`
  This MScript expression is used to provide a description for the order, which will be shown in Stripe and on customer receipts. It should return a string that describes the order.
- **Order Status Property**: status
  This property is selected as the order status property, which will be used to track the current status of the order.
  It will be automatically updated based on payment results from Stripe.
- **Order Status Update Date Property**: updatedAt
  This property is selected to record the timestamp of the last order status update. It will be automatically managed during payment events to reflect when the status was last changed.
- **Order Owner Id Property**: userId
  This property is selected as the order owner property, which will be used to track the user who owns the order.
  It will be used to ensure correct access control in payment flows, allowing only the owner to manage their orders.
- **Map Payment Result to Order Status**:
  This configuration defines how Stripe's payment results (e.g., started, success, failed, canceled) map to internal order statuses.,
  `paymentResultStarted` status will be mapped to a local value using `0` and will be set to `status`property.
  `paymentResultCanceled` status will be mapped to a local value using `5` and will be set to `status` property.
  `paymentResultFailed` status will be mapped to a local value using `6` and will be set to `status` property.
  `paymentResultSuccess` status will be mapped to a local value using `1` and will be set to `status` property.
- **On Checkout Error**: continueRoute

if an error occurs during the checkout process, the API will continue to execute, allowing for custom error handling.
In this case, the payment error will ve recorded as a status update. To make a retry a new checkout, a new order will be created with the same data as the original order.

### Properties Schema

| Property                | Type    | Required | Description                                                                                                           |
| ----------------------- | ------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `userId`                | ID      | Yes      | User placing the order.                                                                                               |
| `items`                 | Object  | Yes      | Array of order items purchased (snapshot at time of order).                                                           |
| `shippingAddress`       | Object  | Yes      | Shipping address for the order (recipientName, addressLine1, addressLine2, city, region, postalCode, country, phone). |
| `totalAmount`           | Integer | Yes      | Total price (in cents) for all items + shipping, used for payment charging (stripeAmount).                            |
| `currency`              | String  | Yes      | Currency code (ISO 4217, e.g., USD, EUR) for payment/stripe.                                                          |
| `status`                | Enum    | Yes      | Order lifecycle status. 0: pending, 1: paid, 2: processing, 3: shipped, 4: delivered, 5: cancelled, 6: refunded.      |
| `paymentStatus`         | Enum    | Yes      | Payment status for Stripe: 0: unpaid, 1: paid, 2: refunded, 3: failed.                                                |
| `placedAt`              | Date    | Yes      | Timestamp when order was placed/created (for sorting/history).                                                        |
| `stripePaymentIntentId` | String  | No       | Reference to Stripe payment intent for this order. Used to track payment lifecycle and reconciliation.                |
| `refundRequested`       | Boolean | No       | Indicates customer/admin has requested a refund for this order.                                                       |
| `refundAmount`          | Integer | No       | Amount to refund (in cents). Present if refund is requested/processed. Optional - null if not used/full refund.       |
| `adminNotes`            | String  | No       | Notes about the order (visible/editable by admins only).                                                              |
| `orderHistory`          | Object  | No       | Event log of status/payment/history changes: array of {event:String, date:Date, note:String} for order audit trail.   |

- Required properties are mandatory for creating objects and must be provided in the request body if no default value is set.

### Array Properties

`items` `orderHistory`

Array properties can hold multiple values and are indicated by the `[]` suffix in their type. Avoid using arrays in properties that are used for relations, as they will not work correctly.
Note that using connection objects instead of arrays is recommended for relations, as they provide better performance and flexibility.

### Default Values

Default values are automatically assigned to properties when a new object is created, if no value is provided in the request body.
Since default values are applied on db level, they should be literal values, not expressions.If you want to use expressions, you can use transposed parameters in any business API to set default values dynamically.

- **userId**: '00000000-0000-0000-0000-000000000000'
- **items**: []
- **shippingAddress**: {}
- **totalAmount**: 0
- **currency**: 'default'
- **status**: pending
- **paymentStatus**: unpaid
- **placedAt**: new Date()

### Always Create with Default Values

Some of the default values are set to be always used when creating a new object, even if the property value is provided in the request body. It ensures that the property is always initialized with a default value when the object is created.

- **status**: Will be created with value `pending`

- **paymentStatus**: Will be created with value `unpaid`

### Constant Properties

`userId` `items` `shippingAddress` `totalAmount` `currency` `placedAt`

Constant properties are defined to be immutable after creation, meaning they cannot be updated or changed once set. They are typically used for properties that should remain constant throughout the object's lifecycle.
A property is set to be constant if the `Allow Update` option is set to `false`.

### Auto Update Properties

`userId` `status` `paymentStatus` `placedAt` `stripePaymentIntentId` `refundRequested` `refundAmount` `adminNotes` `orderHistory`

An update crud API created with the option `Auto Params` enabled will automatically update these properties with the provided values in the request body.
If you want to update any property in your own business logic not by user input, you can set the `Allow Auto Update` option to false.
These properties will be added to the update API's body parameters and can be updated by the user if any value is provided in the request body.

### Enum Properties

Enum properties are defined with a set of allowed values, ensuring that only valid options can be assigned to them.
The enum options value will be stored as strings in the database,
but when a data object is created an addtional property with the same name plus an idx suffix will be created, which will hold the index of the selected enum option.
You can use the index property to sort by the enum value or when your enum options represent a sequence of values.

- **status**: [pending, paid, processing, shipped, delivered, cancelled, refunded]

- **paymentStatus**: [unpaid, paid, refunded, failed]

### Elastic Search Indexing

`userId` `currency` `status` `placedAt`

Properties that are indexed in Elastic Search will be searchable via the Elastic Search API.
While all properties are stored in the elastic search index of the data object, only those marked for Elastic Search indexing will be available for search queries.

### Database Indexing

`userId` `status` `placedAt` `stripePaymentIntentId` `refundRequested`

Properties that are indexed in the database will be optimized for query performance, allowing for faster data retrieval.
Make a property indexed in the database if you want to use it frequently in query filters or sorting.

### Cache Select Properties

`status`

Cache select properties are used to collect data from Redis entity cache with a different key than the data object id.
This allows you to cache data that is not directly related to the data object id, but a frequently used filter.

### Relation Properties

`userId`

Mindbricks supports relations between data objects, allowing you to define how objects are linked together.
You can define relations in the data object properties, which will be used to create foreign key constraints in the database.
For complex joins operations, Mindbricks supportsa BFF pattern, where you can view dynamic and static views based on Elastic Search Indexes.
Use db level relations for simple one-to-one or one-to-many relationships, and use BFF views for complex joins that require multiple data objects to be joined together.

- **userId**: ID
  Relation to `user`.id

The target object is a parent object, meaning that the relation is a one-to-many relationship from target to this object.

On Delete: Set Null
Required: Yes

### Session Data Properties

`userId`

Session data properties are used to store data that is specific to the user session, allowing for personalized experiences and temporary data storage.
If a property is configured as session data, it will be automatically mapped to the related field in the user session during CRUD operations.
Note that session data properties can not be mutated by the user, but only by the system.

- **userId**: ID property will be mapped to the session parameter `userId`.

This property is also used to store the owner of the session data, allowing for ownership checks and access control.

### Filter Properties

`userId` `status` `placedAt`

Filter properties are used to define parameters that can be used in query filters, allowing for dynamic data retrieval based on user input or predefined criteria.
These properties are automatically mapped as API parameters in the listing API's that have "Auto Params" enabled.

- **userId**: ID has a filter named `userId`

- **status**: Enum has a filter named `status`

- **placedAt**: Date has a filter named `placedAt`
