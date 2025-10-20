# Service Design Specification - Object Design for cart

**ecomm-cart-service** documentation

## Document Overview

This document outlines the object design for the `cart` model in our application. It includes details about the model's attributes, relationships, and any specific validation or business logic that applies.

## cart Data Object

### Object Overview

**Description:** Represents a single user&#39;s shopping cart containing selected product items, their quantities, and state as of last update.

This object represents a core data structure within the service and acts as the blueprint for database interaction, API generation, and business logic enforcement.
It is defined using the `ObjectSettings` pattern, which governs its behavior, access control, caching strategy, and integration points with other systems such as Stripe and Redis.

### Core Configuration

- **Soft Delete:** Enabled — Determines whether records are marked inactive (`isActive = false`) instead of being physically deleted.
- **Public Access:** accessPrivate — If enabled, anonymous users may access this object’s data depending on API-level rules.

### Composite Indexes

- **uniqueUserCartIdx**: [userId]
  This composite index is defined to optimize query performance for complex queries involving multiple fields.

The index also defines a conflict resolution strategy for duplicate key violations.

When a new record would violate this composite index, the following action will be taken:

**On Duplicate**: `doUpdate`

The existing record will be updated with the new data.No error will be thrown.

### Properties Schema

| Property       | Type    | Required | Description                                                                               |
| -------------- | ------- | -------- | ----------------------------------------------------------------------------------------- |
| `userId`       | ID      | Yes      | User that owns the cart.                                                                  |
| `items`        | Object  | Yes      | List of items (cartItem) in the cart. Each represents a product selection at time of add. |
| `lastModified` | Date    | Yes      | Last time the cart was modified (any change to items).                                    |
| `yuy`          | Object  | Yes      | -                                                                                         |
| `OI`           | Boolean | Yes      | -                                                                                         |
| `frf`          | Integer | Yes      | -                                                                                         |
| `vrg`          | Boolean | Yes      | -                                                                                         |

- Required properties are mandatory for creating objects and must be provided in the request body if no default value is set.

### Array Properties

`items`

Array properties can hold multiple values and are indicated by the `[]` suffix in their type. Avoid using arrays in properties that are used for relations, as they will not work correctly.
Note that using connection objects instead of arrays is recommended for relations, as they provide better performance and flexibility.

### Default Values

Default values are automatically assigned to properties when a new object is created, if no value is provided in the request body.
Since default values are applied on db level, they should be literal values, not expressions.If you want to use expressions, you can use transposed parameters in any business API to set default values dynamically.

- **userId**: '00000000-0000-0000-0000-000000000000'
- **items**: []
- **lastModified**: new Date()
- **yuy**: {}
- **OI**: false
- **frf**: 0
- **vrg**: false

### Constant Properties

`userId`

Constant properties are defined to be immutable after creation, meaning they cannot be updated or changed once set. They are typically used for properties that should remain constant throughout the object's lifecycle.
A property is set to be constant if the `Allow Update` option is set to `false`.

### Auto Update Properties

`userId` `items` `lastModified` `yuy` `OI` `frf` `vrg`

An update crud API created with the option `Auto Params` enabled will automatically update these properties with the provided values in the request body.
If you want to update any property in your own business logic not by user input, you can set the `Allow Auto Update` option to false.
These properties will be added to the update API's body parameters and can be updated by the user if any value is provided in the request body.

### Elastic Search Indexing

`userId` `lastModified` `yuy` `OI` `frf` `vrg`

Properties that are indexed in Elastic Search will be searchable via the Elastic Search API.
While all properties are stored in the elastic search index of the data object, only those marked for Elastic Search indexing will be available for search queries.

### Database Indexing

`userId` `lastModified`

Properties that are indexed in the database will be optimized for query performance, allowing for faster data retrieval.
Make a property indexed in the database if you want to use it frequently in query filters or sorting.

### Unique Properties

`userId`

Unique properties are enforced to have distinct values across all instances of the data object, preventing duplicate entries.
Note that a unique property is automatically indexed in the database so you will not need to set the `Indexed in DB` option.

### Redis Cluster Properties

`userId`

Cluster properties are used to group related data in Redis, and used to invalidate the query cache more precisely.
If no cluster property is set, the data object query cache will be invalidated for all instances of the data object when any instance is created, updated or deleted.
For example, if you have a `userId` property that is used to cluster a task data query in Redis,
when a new task is created, the query caches which have different userId filters will be reserved, and only the queries that have the same userId filter or have no filter at all will be invalidated.

### Cache Select Properties

`userId`

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

### Formula Properties

`lastModified`

Formula properties are used to define calculated fields that derive their values from other properties or external data.
These properties are automatically calculated based on the defined formula and can be used for dynamic data retrieval.

- **lastModified**: Date
  - Formula: `LIB.nowISO()`
  - Update Formula: `LIB.nowISO()`
  - Calculate After Instance: No
  - Calculate When Input Has: [items]
