# Service Design Specification - Object Design for orderItem

**ecomm-ordermanagement-service** documentation

## Document Overview

This document outlines the object design for the `orderItem` model in our application. It includes details about the model's attributes, relationships, and any specific validation or business logic that applies.

## orderItem Data Object

### Object Overview

**Description:** Snapshot of a product at time of order: productId, name, sku, price per unit, quantity, image url, custom selection/attributes. Not updated after order placed.

This object represents a core data structure within the service and acts as the blueprint for database interaction, API generation, and business logic enforcement.
It is defined using the `ObjectSettings` pattern, which governs its behavior, access control, caching strategy, and integration points with other systems such as Stripe and Redis.

### Core Configuration

- **Soft Delete:** Disabled — Determines whether records are marked inactive (`isActive = false`) instead of being physically deleted.
- **Public Access:** accessPrivate — If enabled, anonymous users may access this object’s data depending on API-level rules.

### Properties Schema

| Property      | Type    | Required | Description                                                                                             |
| ------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `productId`   | ID      | Yes      | ID of product at time of order (relation to productCatalog), used for validation/reporting.             |
| `productName` | String  | Yes      | Product name at time of order, stored for audit and reference even if original product is renamed/lost. |
| `sku`         | String  | Yes      | Product SKU snapshot for later reference/analytics.                                                     |
| `price`       | Integer | Yes      | Unit price paid for product at order time (minor currency).                                             |
| `quantity`    | Integer | Yes      | Quantity of this item purchased in the order.                                                           |
| `image`       | String  | No       | Image URL of product at order time (audit/reference).                                                   |
| `attributes`  | Object  | No       | Flexible snapshot of selected product options/spec at time of order (color, size, etc.).                |

- Required properties are mandatory for creating objects and must be provided in the request body if no default value is set.

### Default Values

Default values are automatically assigned to properties when a new object is created, if no value is provided in the request body.
Since default values are applied on db level, they should be literal values, not expressions.If you want to use expressions, you can use transposed parameters in any business API to set default values dynamically.

- **productId**: '00000000-0000-0000-0000-000000000000'
- **productName**: 'default'
- **sku**: 'default'
- **price**: 0
- **quantity**: 0

### Constant Properties

`productId` `productName` `sku` `price` `quantity` `image` `attributes`

Constant properties are defined to be immutable after creation, meaning they cannot be updated or changed once set. They are typically used for properties that should remain constant throughout the object's lifecycle.
A property is set to be constant if the `Allow Update` option is set to `false`.

### Relation Properties

`productId`

Mindbricks supports relations between data objects, allowing you to define how objects are linked together.
You can define relations in the data object properties, which will be used to create foreign key constraints in the database.
For complex joins operations, Mindbricks supportsa BFF pattern, where you can view dynamic and static views based on Elastic Search Indexes.
Use db level relations for simple one-to-one or one-to-many relationships, and use BFF views for complex joins that require multiple data objects to be joined together.

- **productId**: ID
  Relation to `product`.id

The target object is a parent object, meaning that the relation is a one-to-many relationship from target to this object.

On Delete: Set Null
Required: No
