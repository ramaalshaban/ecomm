# EVENT GUIDE

## ecomm-cart-service

Manages each user&#39;s active shopping cart in the e-commerce platform, allowing product selection, cart review, and update operations prior to checkout.

## Architectural Design Credit and Contact Information

The architectural design of this microservice is credited to . For inquiries, feedback, or further information regarding the architecture, please direct your communication to:

Email:

We encourage open communication and welcome any questions or discussions related to the architectural aspects of this microservice.

# Documentation Scope

Welcome to the official documentation for the `Cart` Service Event descriptions. This guide is dedicated to detailing how to subscribe to and listen for state changes within the `Cart` Service, offering an exclusive focus on event subscription mechanisms.

**Intended Audience**

This documentation is aimed at developers and integrators looking to monitor `Cart` Service state changes. It is especially relevant for those wishing to implement or enhance business logic based on interactions with `Cart` objects.

**Overview**

This section provides detailed instructions on monitoring service events, covering payload structures and demonstrating typical use cases through examples.

# Authentication and Authorization

Access to the `Cart` service's events is facilitated through the project's Kafka server, which is not accessible to the public. Subscription to a Kafka topic requires being on the same network and possessing valid Kafka user credentials. This document presupposes that readers have existing access to the Kafka server.

Additionally, the service offers a public subscription option via REST for real-time data management in frontend applications, secured through REST API authentication and authorization mechanisms. To subscribe to service events via the REST API, please consult the Realtime REST API Guide.

# Database Events

Database events are triggered at the database layer, automatically and atomically, in response to any modifications at the data level. These events serve to notify subscribers about the creation, update, or deletion of objects within the database, distinct from any overarching business logic.

Listening to database events is particularly beneficial for those focused on tracking changes at the database level. A typical use case for subscribing to database events is to replicate the data store of one service within another service's scope, ensuring data consistency and syncronization across services.

For example, while a business operation such as "approve membership" might generate a high-level business event like `membership-approved`, the underlying database changes could involve multiple state updates to different entities. These might be published as separate events, such as `dbevent-member-updated` and `dbevent-user-updated`, reflecting the granular changes at the database level.

Such detailed eventing provides a robust foundation for building responsive, data-driven applications, enabling fine-grained observability and reaction to the dynamics of the data landscape. It also facilitates the architectural pattern of event sourcing, where state changes are captured as a sequence of events, allowing for high-fidelity data replication and history replay for analytical or auditing purposes.

## DbEvent cart-created

**Event topic**: `ecomm-cart-service-dbevent-cart-created`

This event is triggered upon the creation of a `cart` data object in the database. The event payload encompasses the newly created data, encapsulated within the root of the paylod.

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "userId": "ID",
  "items": "Object",
  "lastModified": "Date",
  "yuy": "Object",
  "OI": "Boolean",
  "frf": "Integer",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## DbEvent cart-updated

**Event topic**: `ecomm-cart-service-dbevent-cart-updated`

Activation of this event follows the update of a `cart` data object. The payload contains the updated information under the `cart` attribute, along with the original data prior to update, labeled as `old_cart`.

**Event payload**:

```json
{
  "old_cart": {
    "id": "ID",
    "_owner": "ID",
    "userId": "ID",
    "items": "Object",
    "lastModified": "Date",
    "yuy": "Object",
    "OI": "Boolean",
    "frf": "Integer",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  },
  "cart": {
    "id": "ID",
    "_owner": "ID",
    "userId": "ID",
    "items": "Object",
    "lastModified": "Date",
    "yuy": "Object",
    "OI": "Boolean",
    "frf": "Integer",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## DbEvent cart-deleted

**Event topic**: `ecomm-cart-service-dbevent-cart-deleted`

This event announces the deletion of a `cart` data object, covering both hard deletions (permanent removal) and soft deletions (where the `isActive` attribute is set to false). Regardless of the deletion type, the event payload will present the data as it was immediately before deletion, highlighting an `isActive` status of false for soft deletions.

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "userId": "ID",
  "items": "Object",
  "lastModified": "Date",
  "yuy": "Object",
  "OI": "Boolean",
  "frf": "Integer",
  "isActive": false,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## DbEvent cartItem-created

**Event topic**: `ecomm-cart-service-dbevent-cartitem-created`

This event is triggered upon the creation of a `cartItem` data object in the database. The event payload encompasses the newly created data, encapsulated within the root of the paylod.

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "productId": "ID",
  "productName": "String",
  "priceAtAdd": "Integer",
  "quantity": "Integer",
  "image": "String",
  "attributes": "Object",
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## DbEvent cartItem-updated

**Event topic**: `ecomm-cart-service-dbevent-cartitem-updated`

Activation of this event follows the update of a `cartItem` data object. The payload contains the updated information under the `cartItem` attribute, along with the original data prior to update, labeled as `old_cartItem`.

**Event payload**:

```json
{
  "old_cartItem": {
    "id": "ID",
    "_owner": "ID",
    "productId": "ID",
    "productName": "String",
    "priceAtAdd": "Integer",
    "quantity": "Integer",
    "image": "String",
    "attributes": "Object",
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  },
  "cartItem": {
    "id": "ID",
    "_owner": "ID",
    "productId": "ID",
    "productName": "String",
    "priceAtAdd": "Integer",
    "quantity": "Integer",
    "image": "String",
    "attributes": "Object",
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## DbEvent cartItem-deleted

**Event topic**: `ecomm-cart-service-dbevent-cartitem-deleted`

This event announces the deletion of a `cartItem` data object, covering both hard deletions (permanent removal) and soft deletions (where the `isActive` attribute is set to false). Regardless of the deletion type, the event payload will present the data as it was immediately before deletion, highlighting an `isActive` status of false for soft deletions.

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "productId": "ID",
  "productName": "String",
  "priceAtAdd": "Integer",
  "quantity": "Integer",
  "image": "String",
  "attributes": "Object",
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date",
  "isActive": false
}
```

## DbEvent ko-created

**Event topic**: `ecomm-cart-service-dbevent-ko-created`

This event is triggered upon the creation of a `ko` data object in the database. The event payload encompasses the newly created data, encapsulated within the root of the paylod.

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## DbEvent ko-updated

**Event topic**: `ecomm-cart-service-dbevent-ko-updated`

Activation of this event follows the update of a `ko` data object. The payload contains the updated information under the `ko` attribute, along with the original data prior to update, labeled as `old_ko`.

**Event payload**:

```json
{
  "old_ko": {
    "id": "ID",
    "_owner": "ID",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  },
  "ko": {
    "id": "ID",
    "_owner": "ID",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## DbEvent ko-deleted

**Event topic**: `ecomm-cart-service-dbevent-ko-deleted`

This event announces the deletion of a `ko` data object, covering both hard deletions (permanent removal) and soft deletions (where the `isActive` attribute is set to false). Regardless of the deletion type, the event payload will present the data as it was immediately before deletion, highlighting an `isActive` status of false for soft deletions.

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "isActive": false,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## DbEvent bvf-created

**Event topic**: `ecomm-cart-service-dbevent-bvf-created`

This event is triggered upon the creation of a `bvf` data object in the database. The event payload encompasses the newly created data, encapsulated within the root of the paylod.

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## DbEvent bvf-updated

**Event topic**: `ecomm-cart-service-dbevent-bvf-updated`

Activation of this event follows the update of a `bvf` data object. The payload contains the updated information under the `bvf` attribute, along with the original data prior to update, labeled as `old_bvf`.

**Event payload**:

```json
{
  "old_bvf": {
    "id": "ID",
    "_owner": "ID",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  },
  "bvf": {
    "id": "ID",
    "_owner": "ID",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## DbEvent bvf-deleted

**Event topic**: `ecomm-cart-service-dbevent-bvf-deleted`

This event announces the deletion of a `bvf` data object, covering both hard deletions (permanent removal) and soft deletions (where the `isActive` attribute is set to false). Regardless of the deletion type, the event payload will present the data as it was immediately before deletion, highlighting an `isActive` status of false for soft deletions.

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "isActive": false,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

# ElasticSearch Index Events

Within the `Cart` service, most data objects are mirrored in ElasticSearch indices, ensuring these indices remain syncronized with their database counterparts through creation, updates, and deletions. These indices serve dual purposes: they act as a data source for external services and furnish aggregated data tailored to enhance frontend user experiences. Consequently, an ElasticSearch index might encapsulate data in its original form or aggregate additional information from other data objects.

These aggregations can include both one-to-one and one-to-many relationships not only with database objects within the same service but also across different services. This capability allows developers to access comprehensive, aggregated data efficiently. By subscribing to ElasticSearch index events, developers are notified when an index is updated and can directly obtain the aggregated entity within the event payload, bypassing the need for separate ElasticSearch queries.

It's noteworthy that some services may augment another service's index by appending to the entity’s `extends` object. In such scenarios, an `*-extended` event will contain only the newly added data. Should you require the complete dataset, you would need to retrieve the full ElasticSearch index entity using the provided ID.

This approach to indexing and event handling facilitates a modular, interconnected architecture where services can seamlessly integrate and react to changes, enriching the overall data ecosystem and enabling more dynamic, responsive applications.

## Index Event cart-created

**Event topic**: `elastic-index-ecomm_cart-created`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "userId": "ID",
  "items": "Object",
  "lastModified": "Date",
  "yuy": "Object",
  "OI": "Boolean",
  "frf": "Integer",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event cart-updated

**Event topic**: `elastic-index-ecomm_cart-created`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "userId": "ID",
  "items": "Object",
  "lastModified": "Date",
  "yuy": "Object",
  "OI": "Boolean",
  "frf": "Integer",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event cart-deleted

**Event topic**: `elastic-index-ecomm_cart-deleted`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "userId": "ID",
  "items": "Object",
  "lastModified": "Date",
  "yuy": "Object",
  "OI": "Boolean",
  "frf": "Integer",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event cart-extended

**Event topic**: `elastic-index-ecomm_cart-extended`

**Event payload**:

```js
{
  id: id,
  extends: {
    [extendName]: "Object",
    [extendName + "_count"]: "Number",
  },
}
```

# Route Events

Route events are emitted following the successful execution of a route. While most routes perform CRUD (Create, Read, Update, Delete) operations on data objects, resulting in route events that closely resemble database events, there are distinctions worth noting. A single route execution might trigger multiple CRUD actions and ElasticSearch indexing operations. However, for those primarily concerned with the overarching business logic and its outcomes, listening to the consolidated route event, published once at the conclusion of the route's execution, is more pertinent.

Moreover, routes often deliver aggregated data beyond the primary database object, catering to specific client needs. For instance, creating a data object via a route might not only return the entity's data but also route-specific metrics, such as the executing user's permissions related to the entity. Alternatively, a route might automatically generate default child entities following the creation of a parent object. Consequently, the route event encapsulates a unified dataset encompassing both the parent and its children, in contrast to individual events triggered for each entity created. Therefore, subscribing to route events can offer a richer, more contextually relevant set of information aligned with business logic.

The payload of a route event mirrors the REST response JSON of the route, providing a direct and comprehensive reflection of the data and metadata communicated to the client. This ensures that subscribers to route events receive a payload that encapsulates both the primary data involved and any additional information deemed significant at the business level, facilitating a deeper understanding and integration of the service's functional outcomes.

## Route Event cart-created

**Event topic** : `ecomm-cart-service-cart-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `cart` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`cart`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{
  "status": "OK",
  "statusCode": "201",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "cart",
  "method": "POST",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "cart": {
    "id": "ID",
    "_owner": "ID",
    "userId": "ID",
    "items": "Object",
    "lastModified": "Date",
    "yuy": "Object",
    "OI": "Boolean",
    "frf": "Integer",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## Route Event cart-retrived

**Event topic** : `ecomm-cart-service-cart-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `cart` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`cart`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "cart",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "cart": {
    "id": "ID",
    "_owner": "ID",
    "userId": "ID",
    "items": "Object",
    "lastModified": "Date",
    "yuy": "Object",
    "OI": "Boolean",
    "frf": "Integer",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## Route Event cart-updated

**Event topic** : `ecomm-cart-service-cart-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `cart` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`cart`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "cart",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "cart": {
    "id": "ID",
    "_owner": "ID",
    "userId": "ID",
    "items": "Object",
    "lastModified": "Date",
    "yuy": "Object",
    "OI": "Boolean",
    "frf": "Integer",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## Route Event cart-deleted

**Event topic** : `ecomm-cart-service-cart-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `cart` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`cart`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "cart",
  "method": "DELETE",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "cart": {
    "id": "ID",
    "_owner": "ID",
    "userId": "ID",
    "items": "Object",
    "lastModified": "Date",
    "yuy": "Object",
    "OI": "Boolean",
    "frf": "Integer",
    "isActive": false,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## Route Event carts-listed

**Event topic** : `ecomm-cart-service-carts-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `carts` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`carts`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "carts",
  "method": "GET",
  "action": "list",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "carts": [
    {
      "id": "ID",
      "_owner": "ID",
      "userId": "ID",
      "items": "Object",
      "lastModified": "Date",
      "yuy": "Object",
      "OI": "Boolean",
      "frf": "Integer",
      "isActive": true,
      "recordVersion": "Integer",
      "createdAt": "Date",
      "updatedAt": "Date"
    },
    {},
    {}
  ],
  "paging": {
    "pageNumber": "Number",
    "pageRowCount": "NUmber",
    "totalRowCount": "Number",
    "pageCount": "Number"
  },
  "filters": [],
  "uiPermissions": []
}
```

## Index Event cartitem-created

**Event topic**: `elastic-index-ecomm_cartitem-created`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "productId": "ID",
  "productName": "String",
  "priceAtAdd": "Integer",
  "quantity": "Integer",
  "image": "String",
  "attributes": "Object",
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event cartitem-updated

**Event topic**: `elastic-index-ecomm_cartitem-created`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "productId": "ID",
  "productName": "String",
  "priceAtAdd": "Integer",
  "quantity": "Integer",
  "image": "String",
  "attributes": "Object",
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event cartitem-deleted

**Event topic**: `elastic-index-ecomm_cartitem-deleted`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "productId": "ID",
  "productName": "String",
  "priceAtAdd": "Integer",
  "quantity": "Integer",
  "image": "String",
  "attributes": "Object",
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event cartitem-extended

**Event topic**: `elastic-index-ecomm_cartitem-extended`

**Event payload**:

```js
{
  id: id,
  extends: {
    [extendName]: "Object",
    [extendName + "_count"]: "Number",
  },
}
```

# Route Events

Route events are emitted following the successful execution of a route. While most routes perform CRUD (Create, Read, Update, Delete) operations on data objects, resulting in route events that closely resemble database events, there are distinctions worth noting. A single route execution might trigger multiple CRUD actions and ElasticSearch indexing operations. However, for those primarily concerned with the overarching business logic and its outcomes, listening to the consolidated route event, published once at the conclusion of the route's execution, is more pertinent.

Moreover, routes often deliver aggregated data beyond the primary database object, catering to specific client needs. For instance, creating a data object via a route might not only return the entity's data but also route-specific metrics, such as the executing user's permissions related to the entity. Alternatively, a route might automatically generate default child entities following the creation of a parent object. Consequently, the route event encapsulates a unified dataset encompassing both the parent and its children, in contrast to individual events triggered for each entity created. Therefore, subscribing to route events can offer a richer, more contextually relevant set of information aligned with business logic.

The payload of a route event mirrors the REST response JSON of the route, providing a direct and comprehensive reflection of the data and metadata communicated to the client. This ensures that subscribers to route events receive a payload that encapsulates both the primary data involved and any additional information deemed significant at the business level, facilitating a deeper understanding and integration of the service's functional outcomes.

## Route Event cart-created

**Event topic** : `ecomm-cart-service-cart-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `cart` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`cart`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{
  "status": "OK",
  "statusCode": "201",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "cart",
  "method": "POST",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "cart": {
    "id": "ID",
    "_owner": "ID",
    "userId": "ID",
    "items": "Object",
    "lastModified": "Date",
    "yuy": "Object",
    "OI": "Boolean",
    "frf": "Integer",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## Route Event cart-retrived

**Event topic** : `ecomm-cart-service-cart-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `cart` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`cart`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "cart",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "cart": {
    "id": "ID",
    "_owner": "ID",
    "userId": "ID",
    "items": "Object",
    "lastModified": "Date",
    "yuy": "Object",
    "OI": "Boolean",
    "frf": "Integer",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## Route Event cart-updated

**Event topic** : `ecomm-cart-service-cart-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `cart` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`cart`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "cart",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "cart": {
    "id": "ID",
    "_owner": "ID",
    "userId": "ID",
    "items": "Object",
    "lastModified": "Date",
    "yuy": "Object",
    "OI": "Boolean",
    "frf": "Integer",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## Route Event cart-deleted

**Event topic** : `ecomm-cart-service-cart-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `cart` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`cart`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "cart",
  "method": "DELETE",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "cart": {
    "id": "ID",
    "_owner": "ID",
    "userId": "ID",
    "items": "Object",
    "lastModified": "Date",
    "yuy": "Object",
    "OI": "Boolean",
    "frf": "Integer",
    "isActive": false,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## Route Event carts-listed

**Event topic** : `ecomm-cart-service-carts-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `carts` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`carts`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "carts",
  "method": "GET",
  "action": "list",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "carts": [
    {
      "id": "ID",
      "_owner": "ID",
      "userId": "ID",
      "items": "Object",
      "lastModified": "Date",
      "yuy": "Object",
      "OI": "Boolean",
      "frf": "Integer",
      "isActive": true,
      "recordVersion": "Integer",
      "createdAt": "Date",
      "updatedAt": "Date"
    },
    {},
    {}
  ],
  "paging": {
    "pageNumber": "Number",
    "pageRowCount": "NUmber",
    "totalRowCount": "Number",
    "pageCount": "Number"
  },
  "filters": [],
  "uiPermissions": []
}
```

## Index Event ko-created

**Event topic**: `elastic-index-ecomm_ko-created`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event ko-updated

**Event topic**: `elastic-index-ecomm_ko-created`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event ko-deleted

**Event topic**: `elastic-index-ecomm_ko-deleted`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event ko-extended

**Event topic**: `elastic-index-ecomm_ko-extended`

**Event payload**:

```js
{
  id: id,
  extends: {
    [extendName]: "Object",
    [extendName + "_count"]: "Number",
  },
}
```

# Route Events

Route events are emitted following the successful execution of a route. While most routes perform CRUD (Create, Read, Update, Delete) operations on data objects, resulting in route events that closely resemble database events, there are distinctions worth noting. A single route execution might trigger multiple CRUD actions and ElasticSearch indexing operations. However, for those primarily concerned with the overarching business logic and its outcomes, listening to the consolidated route event, published once at the conclusion of the route's execution, is more pertinent.

Moreover, routes often deliver aggregated data beyond the primary database object, catering to specific client needs. For instance, creating a data object via a route might not only return the entity's data but also route-specific metrics, such as the executing user's permissions related to the entity. Alternatively, a route might automatically generate default child entities following the creation of a parent object. Consequently, the route event encapsulates a unified dataset encompassing both the parent and its children, in contrast to individual events triggered for each entity created. Therefore, subscribing to route events can offer a richer, more contextually relevant set of information aligned with business logic.

The payload of a route event mirrors the REST response JSON of the route, providing a direct and comprehensive reflection of the data and metadata communicated to the client. This ensures that subscribers to route events receive a payload that encapsulates both the primary data involved and any additional information deemed significant at the business level, facilitating a deeper understanding and integration of the service's functional outcomes.

## Route Event cart-created

**Event topic** : `ecomm-cart-service-cart-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `cart` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`cart`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{
  "status": "OK",
  "statusCode": "201",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "cart",
  "method": "POST",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "cart": {
    "id": "ID",
    "_owner": "ID",
    "userId": "ID",
    "items": "Object",
    "lastModified": "Date",
    "yuy": "Object",
    "OI": "Boolean",
    "frf": "Integer",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## Route Event cart-retrived

**Event topic** : `ecomm-cart-service-cart-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `cart` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`cart`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "cart",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "cart": {
    "id": "ID",
    "_owner": "ID",
    "userId": "ID",
    "items": "Object",
    "lastModified": "Date",
    "yuy": "Object",
    "OI": "Boolean",
    "frf": "Integer",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## Route Event cart-updated

**Event topic** : `ecomm-cart-service-cart-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `cart` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`cart`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "cart",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "cart": {
    "id": "ID",
    "_owner": "ID",
    "userId": "ID",
    "items": "Object",
    "lastModified": "Date",
    "yuy": "Object",
    "OI": "Boolean",
    "frf": "Integer",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## Route Event cart-deleted

**Event topic** : `ecomm-cart-service-cart-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `cart` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`cart`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "cart",
  "method": "DELETE",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "cart": {
    "id": "ID",
    "_owner": "ID",
    "userId": "ID",
    "items": "Object",
    "lastModified": "Date",
    "yuy": "Object",
    "OI": "Boolean",
    "frf": "Integer",
    "isActive": false,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## Route Event carts-listed

**Event topic** : `ecomm-cart-service-carts-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `carts` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`carts`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "carts",
  "method": "GET",
  "action": "list",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "carts": [
    {
      "id": "ID",
      "_owner": "ID",
      "userId": "ID",
      "items": "Object",
      "lastModified": "Date",
      "yuy": "Object",
      "OI": "Boolean",
      "frf": "Integer",
      "isActive": true,
      "recordVersion": "Integer",
      "createdAt": "Date",
      "updatedAt": "Date"
    },
    {},
    {}
  ],
  "paging": {
    "pageNumber": "Number",
    "pageRowCount": "NUmber",
    "totalRowCount": "Number",
    "pageCount": "Number"
  },
  "filters": [],
  "uiPermissions": []
}
```

## Index Event bvf-created

**Event topic**: `elastic-index-ecomm_bvf-created`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event bvf-updated

**Event topic**: `elastic-index-ecomm_bvf-created`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event bvf-deleted

**Event topic**: `elastic-index-ecomm_bvf-deleted`

**Event payload**:

```json
{
  "id": "ID",
  "_owner": "ID",
  "isActive": true,
  "recordVersion": "Integer",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Index Event bvf-extended

**Event topic**: `elastic-index-ecomm_bvf-extended`

**Event payload**:

```js
{
  id: id,
  extends: {
    [extendName]: "Object",
    [extendName + "_count"]: "Number",
  },
}
```

# Route Events

Route events are emitted following the successful execution of a route. While most routes perform CRUD (Create, Read, Update, Delete) operations on data objects, resulting in route events that closely resemble database events, there are distinctions worth noting. A single route execution might trigger multiple CRUD actions and ElasticSearch indexing operations. However, for those primarily concerned with the overarching business logic and its outcomes, listening to the consolidated route event, published once at the conclusion of the route's execution, is more pertinent.

Moreover, routes often deliver aggregated data beyond the primary database object, catering to specific client needs. For instance, creating a data object via a route might not only return the entity's data but also route-specific metrics, such as the executing user's permissions related to the entity. Alternatively, a route might automatically generate default child entities following the creation of a parent object. Consequently, the route event encapsulates a unified dataset encompassing both the parent and its children, in contrast to individual events triggered for each entity created. Therefore, subscribing to route events can offer a richer, more contextually relevant set of information aligned with business logic.

The payload of a route event mirrors the REST response JSON of the route, providing a direct and comprehensive reflection of the data and metadata communicated to the client. This ensures that subscribers to route events receive a payload that encapsulates both the primary data involved and any additional information deemed significant at the business level, facilitating a deeper understanding and integration of the service's functional outcomes.

## Route Event cart-created

**Event topic** : `ecomm-cart-service-cart-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `cart` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`cart`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{
  "status": "OK",
  "statusCode": "201",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "cart",
  "method": "POST",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "cart": {
    "id": "ID",
    "_owner": "ID",
    "userId": "ID",
    "items": "Object",
    "lastModified": "Date",
    "yuy": "Object",
    "OI": "Boolean",
    "frf": "Integer",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## Route Event cart-retrived

**Event topic** : `ecomm-cart-service-cart-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `cart` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`cart`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "cart",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "cart": {
    "id": "ID",
    "_owner": "ID",
    "userId": "ID",
    "items": "Object",
    "lastModified": "Date",
    "yuy": "Object",
    "OI": "Boolean",
    "frf": "Integer",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## Route Event cart-updated

**Event topic** : `ecomm-cart-service-cart-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `cart` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`cart`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "cart",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "cart": {
    "id": "ID",
    "_owner": "ID",
    "userId": "ID",
    "items": "Object",
    "lastModified": "Date",
    "yuy": "Object",
    "OI": "Boolean",
    "frf": "Integer",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## Route Event cart-deleted

**Event topic** : `ecomm-cart-service-cart-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `cart` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`cart`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "cart",
  "method": "DELETE",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "cart": {
    "id": "ID",
    "_owner": "ID",
    "userId": "ID",
    "items": "Object",
    "lastModified": "Date",
    "yuy": "Object",
    "OI": "Boolean",
    "frf": "Integer",
    "isActive": false,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

## Route Event carts-listed

**Event topic** : `ecomm-cart-service-carts-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `carts` data object itself.

The following JSON included in the payload illustrates the fullest representation of the **`carts`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "carts",
  "method": "GET",
  "action": "list",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "carts": [
    {
      "id": "ID",
      "_owner": "ID",
      "userId": "ID",
      "items": "Object",
      "lastModified": "Date",
      "yuy": "Object",
      "OI": "Boolean",
      "frf": "Integer",
      "isActive": true,
      "recordVersion": "Integer",
      "createdAt": "Date",
      "updatedAt": "Date"
    },
    {},
    {}
  ],
  "paging": {
    "pageNumber": "Number",
    "pageRowCount": "NUmber",
    "totalRowCount": "Number",
    "pageCount": "Number"
  },
  "filters": [],
  "uiPermissions": []
}
```

# Copyright

All sources, documents and other digital materials are copyright of .

# About Us

For more information please visit our website: .

.
.
