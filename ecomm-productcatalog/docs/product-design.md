# Service Design Specification - Object Design for product

**ecomm-productcatalog-service** documentation

## Document Overview

This document outlines the object design for the `product` model in our application. It includes details about the model's attributes, relationships, and any specific validation or business logic that applies.

## product Data Object

### Object Overview

**Description:** Represents a product listed in the e-commerce catalog, with full searchable and filterable attributes including inventory, status, pricing, and dimensional details.

This object represents a core data structure within the service and acts as the blueprint for database interaction, API generation, and business logic enforcement.
It is defined using the `ObjectSettings` pattern, which governs its behavior, access control, caching strategy, and integration points with other systems such as Stripe and Redis.

### Core Configuration

- **Soft Delete:** Disabled — Determines whether records are marked inactive (`isActive = false`) instead of being physically deleted.
- **Public Access:** accessProtected — If enabled, anonymous users may access this object’s data depending on API-level rules.

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
{"isActive":true,"status":0}
```

This object is only cached if this criteria is met.

The criteria is checked during all operations, including read operations.
If your criteria is all about the data properties, you can use the `checkCriteriaOnlyInCreateAndUpdates` option to improve performance.

### Composite Indexes

- **skuUniqueIndex**: [sku]
  This composite index is defined to optimize query performance for complex queries involving multiple fields.

The index also defines a conflict resolution strategy for duplicate key violations.

When a new record would violate this composite index, the following action will be taken:

**On Duplicate**: `throwError`

An error will be thrown, preventing the insertion of conflicting data.

- **nameCategoryIndex**: [name, category]
  This composite index is defined to optimize query performance for complex queries involving multiple fields.

The index also defines a conflict resolution strategy for duplicate key violations.

When a new record would violate this composite index, the following action will be taken:

**On Duplicate**: `doInsert`

The new record will be inserted without checking for duplicates. This means that the composite index is designed for search purposes only.

### Properties Schema

| Property         | Type    | Required | Description                                                                                                     |
| ---------------- | ------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `name`           | String  | Yes      | Product&#39;s name, displayed in catalog, used for search and filtering.                                        |
| `description`    | Text    | No       | Long form product description.                                                                                  |
| `category`       | String  | Yes      | Product category for filtering and organization.                                                                |
| `price`          | Integer | Yes      | Product price in minor currency unit (cents).                                                                   |
| `images`         | String  | Yes      | Array of product image URLs.                                                                                    |
| `availability`   | Boolean | No       | Derived: true if status == active and inventoryCount &gt; 0. Otherwise, false. Not directly settable; computed. |
| `status`         | Enum    | Yes      | Product status; &#39;active&#39; for available products, &#39;discontinued&#39; for non-sale.                   |
| `inventoryCount` | Integer | Yes      | Number of items in stock; 0 means out of stock.                                                                 |
| `sku`            | String  | Yes      | Stock keeping unit—must be unique across products.                                                              |
| `tags`           | String  | No       | Optional array of tags for product search or grouping.                                                          |
| `weight`         | Float   | No       | Product weight, in grams.                                                                                       |
| `dimensions`     | Object  | No       | Object containing length, width, height (in cm or mm as schema decided by client/frontend).                     |
| `attributes`     | Object  | No       | Flexible object for variant/specification key-value pairs (e.g., color, material, custom properties).           |

- Required properties are mandatory for creating objects and must be provided in the request body if no default value is set.

### Array Properties

`images` `tags`

Array properties can hold multiple values and are indicated by the `[]` suffix in their type. Avoid using arrays in properties that are used for relations, as they will not work correctly.
Note that using connection objects instead of arrays is recommended for relations, as they provide better performance and flexibility.

### Default Values

Default values are automatically assigned to properties when a new object is created, if no value is provided in the request body.
Since default values are applied on db level, they should be literal values, not expressions.If you want to use expressions, you can use transposed parameters in any business API to set default values dynamically.

- **name**: 'default'
- **category**: 'default'
- **price**: 0
- **images**: []
- **status**: active
- **sku**: 'default'

### Constant Properties

`availability`

Constant properties are defined to be immutable after creation, meaning they cannot be updated or changed once set. They are typically used for properties that should remain constant throughout the object's lifecycle.
A property is set to be constant if the `Allow Update` option is set to `false`.

### Auto Update Properties

`name` `description` `category` `price` `images` `status` `inventoryCount` `sku` `tags` `weight` `dimensions` `attributes`

An update crud API created with the option `Auto Params` enabled will automatically update these properties with the provided values in the request body.
If you want to update any property in your own business logic not by user input, you can set the `Allow Auto Update` option to false.
These properties will be added to the update API's body parameters and can be updated by the user if any value is provided in the request body.

### Enum Properties

Enum properties are defined with a set of allowed values, ensuring that only valid options can be assigned to them.
The enum options value will be stored as strings in the database,
but when a data object is created an addtional property with the same name plus an idx suffix will be created, which will hold the index of the selected enum option.
You can use the index property to sort by the enum value or when your enum options represent a sequence of values.

- **status**: [active, discontinued]

### Elastic Search Indexing

`name` `description` `category` `price` `availability` `status` `inventoryCount` `sku` `tags`

Properties that are indexed in Elastic Search will be searchable via the Elastic Search API.
While all properties are stored in the elastic search index of the data object, only those marked for Elastic Search indexing will be available for search queries.

### Database Indexing

`name` `category` `price` `availability` `status` `inventoryCount` `sku`

Properties that are indexed in the database will be optimized for query performance, allowing for faster data retrieval.
Make a property indexed in the database if you want to use it frequently in query filters or sorting.

### Unique Properties

`sku`

Unique properties are enforced to have distinct values across all instances of the data object, preventing duplicate entries.
Note that a unique property is automatically indexed in the database so you will not need to set the `Indexed in DB` option.

### Cache Select Properties

`name` `category` `status` `sku`

Cache select properties are used to collect data from Redis entity cache with a different key than the data object id.
This allows you to cache data that is not directly related to the data object id, but a frequently used filter.

### Secondary Key Properties

`sku`

Secondary key properties are used to create an additional indexed identifiers for the data object, allowing for alternative access patterns.
Different than normal indexed properties, secondary keys will act as primary keys and Mindbricks will provide automatic secondary key db utility functions to access the data object by the secondary key.

### Formula Properties

`availability`

Formula properties are used to define calculated fields that derive their values from other properties or external data.
These properties are automatically calculated based on the defined formula and can be used for dynamic data retrieval.

- **availability**: Boolean
  - Formula: `this.status === 0 &amp;&amp; this.inventoryCount &gt; 0`
  - Calculate After Instance: No
  - Calculate When Input Has: [status, inventoryCount]

### Filter Properties

`name` `category` `price` `availability` `status` `inventoryCount` `sku` `tags`

Filter properties are used to define parameters that can be used in query filters, allowing for dynamic data retrieval based on user input or predefined criteria.
These properties are automatically mapped as API parameters in the listing API's that have "Auto Params" enabled.

- **name**: String has a filter named `name`

- **category**: String has a filter named `category`

- **price**: Integer has a filter named `price`

- **availability**: Boolean has a filter named `availability`

- **status**: Enum has a filter named `status`

- **inventoryCount**: Integer has a filter named `inventoryCount`

- **sku**: String has a filter named `sku`

- **tags**: String has a filter named `tags`
