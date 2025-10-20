# Service Design Specification - Object Design for salesReport

**ecomm-reporting-service** documentation

## Document Overview

This document outlines the object design for the `salesReport` model in our application. It includes details about the model's attributes, relationships, and any specific validation or business logic that applies.

## salesReport Data Object

### Object Overview

**Description:** Aggregated business/sales analytics snapshot for defined date range (on-demand for reporting/dashboard).

This object represents a core data structure within the service and acts as the blueprint for database interaction, API generation, and business logic enforcement.
It is defined using the `ObjectSettings` pattern, which governs its behavior, access control, caching strategy, and integration points with other systems such as Stripe and Redis.

### Core Configuration

- **Soft Delete:** Disabled — Determines whether records are marked inactive (`isActive = false`) instead of being physically deleted.
- **Public Access:** accessProtected — If enabled, anonymous users may access this object’s data depending on API-level rules.

### Properties Schema

| Property       | Type    | Required | Description                                                                         |
| -------------- | ------- | -------- | ----------------------------------------------------------------------------------- |
| `dateRange`    | Object  | Yes      | Reporting interval: {start, end} Date fields.                                       |
| `totalRevenue` | Double  | Yes      | Sum of totalAmount for paid/completed orders in range.                              |
| `orderCount`   | Integer | Yes      | Number of completed orders in the date range.                                       |
| `productCount` | Integer | Yes      | Unique products ordered in period (based on sold counts in orders).                 |
| `bestsellers`  | Object  | Yes      | Array of bestseller products in range: {productId, productName, soldCount}.         |
| `refundsTotal` | Double  | Yes      | Sum of all refunded order amounts (in minor unit) in date range.                    |
| `exportJobId`  | ID      | No       | Optional link: the export job this report is attached to (if exported/snapshotted). |

- Required properties are mandatory for creating objects and must be provided in the request body if no default value is set.

### Array Properties

`bestsellers`

Array properties can hold multiple values and are indicated by the `[]` suffix in their type. Avoid using arrays in properties that are used for relations, as they will not work correctly.
Note that using connection objects instead of arrays is recommended for relations, as they provide better performance and flexibility.

### Default Values

Default values are automatically assigned to properties when a new object is created, if no value is provided in the request body.
Since default values are applied on db level, they should be literal values, not expressions.If you want to use expressions, you can use transposed parameters in any business API to set default values dynamically.

- **dateRange**: {}
- **totalRevenue**: 0.0
- **orderCount**: 0
- **productCount**: 0
- **bestsellers**: []
- **refundsTotal**: 0.0

### Auto Update Properties

`dateRange` `totalRevenue` `orderCount` `productCount` `bestsellers` `refundsTotal` `exportJobId`

An update crud API created with the option `Auto Params` enabled will automatically update these properties with the provided values in the request body.
If you want to update any property in your own business logic not by user input, you can set the `Allow Auto Update` option to false.
These properties will be added to the update API's body parameters and can be updated by the user if any value is provided in the request body.

### Elastic Search Indexing

`dateRange` `totalRevenue` `orderCount` `productCount` `refundsTotal`

Properties that are indexed in Elastic Search will be searchable via the Elastic Search API.
While all properties are stored in the elastic search index of the data object, only those marked for Elastic Search indexing will be available for search queries.

### Relation Properties

`exportJobId`

Mindbricks supports relations between data objects, allowing you to define how objects are linked together.
You can define relations in the data object properties, which will be used to create foreign key constraints in the database.
For complex joins operations, Mindbricks supportsa BFF pattern, where you can view dynamic and static views based on Elastic Search Indexes.
Use db level relations for simple one-to-one or one-to-many relationships, and use BFF views for complex joins that require multiple data objects to be joined together.

- **exportJobId**: ID
  Relation to `exportJob`.id

The target object is a sibling object, meaning that the relation is a many-to-one or one-to-one relationship from this object to the target.

On Delete: Set Null
Required: No
