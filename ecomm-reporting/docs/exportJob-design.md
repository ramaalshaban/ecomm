# Service Design Specification - Object Design for exportJob

**ecomm-reporting-service** documentation

## Document Overview

This document outlines the object design for the `exportJob` model in our application. It includes details about the model's attributes, relationships, and any specific validation or business logic that applies.

## exportJob Data Object

### Object Overview

**Description:** Tracks an export operation for orders or product catalog (for CSV/JSON download by admin).

This object represents a core data structure within the service and acts as the blueprint for database interaction, API generation, and business logic enforcement.
It is defined using the `ObjectSettings` pattern, which governs its behavior, access control, caching strategy, and integration points with other systems such as Stripe and Redis.

### Core Configuration

- **Soft Delete:** Enabled — Determines whether records are marked inactive (`isActive = false`) instead of being physically deleted.
- **Public Access:** accessProtected — If enabled, anonymous users may access this object’s data depending on API-level rules.

### Properties Schema

| Property      | Type   | Required | Description                                       |
| ------------- | ------ | -------- | ------------------------------------------------- |
| `exportType`  | Enum   | Yes      | Export source: orders or products.                |
| `status`      | Enum   | Yes      | Export job status: pending, completed, failed.    |
| `requestedBy` | ID     | Yes      | User/admin who requested this export job.         |
| `startedAt`   | Date   | Yes      | When export job was started.                      |
| `completedAt` | Date   | No       | When export job completed (null if not yet).      |
| `downloadUrl` | String | No       | URL to download exported file; set on completion. |

- Required properties are mandatory for creating objects and must be provided in the request body if no default value is set.

### Default Values

Default values are automatically assigned to properties when a new object is created, if no value is provided in the request body.
Since default values are applied on db level, they should be literal values, not expressions.If you want to use expressions, you can use transposed parameters in any business API to set default values dynamically.

- **exportType**: orders
- **status**: pending
- **requestedBy**: '00000000-0000-0000-0000-000000000000'
- **startedAt**: new Date()

### Constant Properties

`exportType` `requestedBy` `startedAt`

Constant properties are defined to be immutable after creation, meaning they cannot be updated or changed once set. They are typically used for properties that should remain constant throughout the object's lifecycle.
A property is set to be constant if the `Allow Update` option is set to `false`.

### Auto Update Properties

`exportType` `status` `requestedBy` `startedAt` `completedAt` `downloadUrl`

An update crud API created with the option `Auto Params` enabled will automatically update these properties with the provided values in the request body.
If you want to update any property in your own business logic not by user input, you can set the `Allow Auto Update` option to false.
These properties will be added to the update API's body parameters and can be updated by the user if any value is provided in the request body.

### Enum Properties

Enum properties are defined with a set of allowed values, ensuring that only valid options can be assigned to them.
The enum options value will be stored as strings in the database,
but when a data object is created an addtional property with the same name plus an idx suffix will be created, which will hold the index of the selected enum option.
You can use the index property to sort by the enum value or when your enum options represent a sequence of values.

- **exportType**: [orders, products]

- **status**: [pending, completed, failed]

### Elastic Search Indexing

`exportType` `status` `requestedBy` `startedAt` `completedAt` `downloadUrl`

Properties that are indexed in Elastic Search will be searchable via the Elastic Search API.
While all properties are stored in the elastic search index of the data object, only those marked for Elastic Search indexing will be available for search queries.

### Relation Properties

`requestedBy`

Mindbricks supports relations between data objects, allowing you to define how objects are linked together.
You can define relations in the data object properties, which will be used to create foreign key constraints in the database.
For complex joins operations, Mindbricks supportsa BFF pattern, where you can view dynamic and static views based on Elastic Search Indexes.
Use db level relations for simple one-to-one or one-to-many relationships, and use BFF views for complex joins that require multiple data objects to be joined together.

- **requestedBy**: ID
  Relation to `user`.id

The target object is a sibling object, meaning that the relation is a many-to-one or one-to-one relationship from this object to the target.

On Delete: Set Null
Required: Yes

### Session Data Properties

`requestedBy`

Session data properties are used to store data that is specific to the user session, allowing for personalized experiences and temporary data storage.
If a property is configured as session data, it will be automatically mapped to the related field in the user session during CRUD operations.
Note that session data properties can not be mutated by the user, but only by the system.

- **requestedBy**: ID property will be mapped to the session parameter `userId`.

This property is also used to store the owner of the session data, allowing for ownership checks and access control.

### Formula Properties

`startedAt`

Formula properties are used to define calculated fields that derive their values from other properties or external data.
These properties are automatically calculated based on the defined formula and can be used for dynamic data retrieval.

- **startedAt**: Date
  - Formula: `new Date().toISOString()`
  - Calculate After Instance: No
