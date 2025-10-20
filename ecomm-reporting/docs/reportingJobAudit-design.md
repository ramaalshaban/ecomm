# Service Design Specification - Object Design for reportingJobAudit

**ecomm-reporting-service** documentation

## Document Overview

This document outlines the object design for the `reportingJobAudit` model in our application. It includes details about the model's attributes, relationships, and any specific validation or business logic that applies.

## reportingJobAudit Data Object

### Object Overview

**Description:** (Optional: for extension) Audit log for reporting/export operations (who, when, what). Not exposed in CRUD for MVP.

This object represents a core data structure within the service and acts as the blueprint for database interaction, API generation, and business logic enforcement.
It is defined using the `ObjectSettings` pattern, which governs its behavior, access control, caching strategy, and integration points with other systems such as Stripe and Redis.

### Core Configuration

- **Soft Delete:** Enabled — Determines whether records are marked inactive (`isActive = false`) instead of being physically deleted.
- **Public Access:** accessProtected — If enabled, anonymous users may access this object’s data depending on API-level rules.

### Properties Schema

| Property      | Type   | Required | Description                                                                 |
| ------------- | ------ | -------- | --------------------------------------------------------------------------- |
| `exportJobId` | ID     | Yes      | Reference to exportJob this log is for.                                     |
| `action`      | String | Yes      | Audit action performed (e.g. exportStarted, exportFailed, reportGenerated). |
| `timestamp`   | Date   | Yes      | When audit action happened.                                                 |
| `details`     | Object | No       | Structured details/context for log entry.                                   |

- Required properties are mandatory for creating objects and must be provided in the request body if no default value is set.

### Default Values

Default values are automatically assigned to properties when a new object is created, if no value is provided in the request body.
Since default values are applied on db level, they should be literal values, not expressions.If you want to use expressions, you can use transposed parameters in any business API to set default values dynamically.

- **exportJobId**: '00000000-0000-0000-0000-000000000000'
- **action**: 'default'
- **timestamp**: new Date()

### Constant Properties

`exportJobId` `action` `timestamp` `details`

Constant properties are defined to be immutable after creation, meaning they cannot be updated or changed once set. They are typically used for properties that should remain constant throughout the object's lifecycle.
A property is set to be constant if the `Allow Update` option is set to `false`.

### Auto Update Properties

`exportJobId` `action` `timestamp` `details`

An update crud API created with the option `Auto Params` enabled will automatically update these properties with the provided values in the request body.
If you want to update any property in your own business logic not by user input, you can set the `Allow Auto Update` option to false.
These properties will be added to the update API's body parameters and can be updated by the user if any value is provided in the request body.

### Elastic Search Indexing

`exportJobId` `action` `timestamp`

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

The target object is a parent object, meaning that the relation is a one-to-many relationship from target to this object.

On Delete: Set Null
Required: Yes

### Formula Properties

`timestamp`

Formula properties are used to define calculated fields that derive their values from other properties or external data.
These properties are automatically calculated based on the defined formula and can be used for dynamic data retrieval.

- **timestamp**: Date
  - Formula: `new Date().toISOString()`
  - Calculate After Instance: No
