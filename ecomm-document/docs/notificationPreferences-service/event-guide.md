# EVENT GUIDE
## ecomm-notificationpreferences-service

Manages user and admin notification preferences, controlling which types of notification events are delivered and how, with strong ownership enforcement and session-driven integrity.

## Architectural Design Credit and Contact Information

The architectural design of this microservice is credited to . For inquiries, feedback, or further information regarding the architecture, please direct your communication to:

Email: 

We encourage open communication and welcome any questions or discussions related to the architectural aspects of this microservice.

# Documentation Scope

Welcome to the official documentation for the `NotificationPreferences` Service Event descriptions. This guide is dedicated to detailing how to subscribe to and listen for state changes within the `NotificationPreferences` Service, offering an exclusive focus on event subscription mechanisms.

**Intended Audience**

This documentation is aimed at developers and integrators looking to monitor `NotificationPreferences` Service state changes. It is especially relevant for those wishing to implement or enhance business logic based on interactions with `NotificationPreferences` objects.

**Overview**

This section provides detailed instructions on monitoring service events, covering payload structures and demonstrating typical use cases through examples.

# Authentication and Authorization

Access to the `NotificationPreferences` service's events is facilitated through the project's Kafka server, which is not accessible to the public. Subscription to a Kafka topic requires being on the same network and possessing valid Kafka user credentials.  This document presupposes that readers have existing access to the Kafka server.

Additionally, the service offers a public subscription option via REST for real-time data management in frontend applications, secured through REST API authentication and authorization mechanisms. To subscribe to service events via the REST API, please consult the Realtime REST API Guide.

# Database Events

Database events are triggered at the database layer, automatically and atomically, in response to any modifications at the data level. These events serve to notify subscribers about the creation, update, or deletion of objects within the database, distinct from any overarching business logic. 

Listening to database events is particularly beneficial for those focused on tracking changes at the database level. A typical use case for subscribing to database events is to replicate the data store of one service within another service's scope, ensuring data consistency and syncronization across services.

For example, while a business operation such as "approve membership" might generate a high-level business event like `membership-approved`, the underlying database changes could involve multiple state updates to different entities. These might be published as separate events, such as `dbevent-member-updated` and `dbevent-user-updated`, reflecting the granular changes at the database level.

Such detailed eventing provides a robust foundation for building responsive, data-driven applications, enabling fine-grained observability and reaction to the dynamics of the data landscape. It also facilitates the architectural pattern of event sourcing, where state changes are captured as a sequence of events, allowing for high-fidelity data replication and history replay for analytical or auditing purposes.

## DbEvent userNotificationPreferences-created

**Event topic**: `ecomm-notificationpreferences-service-dbevent-usernotificationpreferences-created`

This event is triggered upon the creation of a `userNotificationPreferences` data object in the database. The event payload encompasses the newly created data, encapsulated within the root of the paylod.

**Event payload**: 
```json
{"id":"ID","_owner":"ID","userId":"ID","orderUpdates":"Boolean","shippingUpdates":"Boolean","promoOptIn":"Boolean","paymentEvents":"Boolean","systemEvents":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  
## DbEvent userNotificationPreferences-updated

**Event topic**: `ecomm-notificationpreferences-service-dbevent-usernotificationpreferences-updated`

Activation of this event follows the update of a `userNotificationPreferences` data object. The payload contains the updated information under the `userNotificationPreferences` attribute, along with the original data prior to update, labeled as `old_userNotificationPreferences`.

**Event payload**: 
```json
{
old_userNotificationPreferences:{"id":"ID","_owner":"ID","userId":"ID","orderUpdates":"Boolean","shippingUpdates":"Boolean","promoOptIn":"Boolean","paymentEvents":"Boolean","systemEvents":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},
userNotificationPreferences:{"id":"ID","_owner":"ID","userId":"ID","orderUpdates":"Boolean","shippingUpdates":"Boolean","promoOptIn":"Boolean","paymentEvents":"Boolean","systemEvents":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},
}
``` 
## DbEvent userNotificationPreferences-deleted

**Event topic**: `ecomm-notificationpreferences-service-dbevent-usernotificationpreferences-deleted`

This event announces the deletion of a `userNotificationPreferences` data object, covering both hard deletions (permanent removal) and soft deletions (where the `isActive` attribute is set to false). Regardless of the deletion type, the event payload will present the data as it was immediately before deletion, highlighting an `isActive` status of false for soft deletions.

**Event payload**: 
```json
{"id":"ID","_owner":"ID","userId":"ID","orderUpdates":"Boolean","shippingUpdates":"Boolean","promoOptIn":"Boolean","paymentEvents":"Boolean","systemEvents":"Boolean","isActive":false,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  
## DbEvent adminNotificationConfig-created

**Event topic**: `ecomm-notificationpreferences-service-dbevent-adminnotificationconfig-created`

This event is triggered upon the creation of a `adminNotificationConfig` data object in the database. The event payload encompasses the newly created data, encapsulated within the root of the paylod.

**Event payload**: 
```json
{"id":"ID","_owner":"ID","adminId":"ID","triggerEvents":"String","notifyBy":"String","enabled":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  
## DbEvent adminNotificationConfig-updated

**Event topic**: `ecomm-notificationpreferences-service-dbevent-adminnotificationconfig-updated`

Activation of this event follows the update of a `adminNotificationConfig` data object. The payload contains the updated information under the `adminNotificationConfig` attribute, along with the original data prior to update, labeled as `old_adminNotificationConfig`.

**Event payload**: 
```json
{
old_adminNotificationConfig:{"id":"ID","_owner":"ID","adminId":"ID","triggerEvents":"String","notifyBy":"String","enabled":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},
adminNotificationConfig:{"id":"ID","_owner":"ID","adminId":"ID","triggerEvents":"String","notifyBy":"String","enabled":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},
}
``` 
## DbEvent adminNotificationConfig-deleted

**Event topic**: `ecomm-notificationpreferences-service-dbevent-adminnotificationconfig-deleted`

This event announces the deletion of a `adminNotificationConfig` data object, covering both hard deletions (permanent removal) and soft deletions (where the `isActive` attribute is set to false). Regardless of the deletion type, the event payload will present the data as it was immediately before deletion, highlighting an `isActive` status of false for soft deletions.

**Event payload**: 
```json
{"id":"ID","_owner":"ID","adminId":"ID","triggerEvents":"String","notifyBy":"String","enabled":"Boolean","isActive":false,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  


# ElasticSearch Index Events

Within the `NotificationPreferences` service, most data objects are mirrored in ElasticSearch indices, ensuring these indices remain syncronized with their database counterparts through creation, updates, and deletions. These indices serve dual purposes: they act as a data source for external services and furnish aggregated data tailored to enhance frontend user experiences. Consequently, an ElasticSearch index might encapsulate data in its original form or aggregate additional information from other data objects. 

These aggregations can include both one-to-one and one-to-many relationships not only with database objects within the same service but also across different services. This capability allows developers to access comprehensive, aggregated data efficiently. By subscribing to ElasticSearch index events, developers are notified when an index is updated and can directly obtain the aggregated entity within the event payload, bypassing the need for separate ElasticSearch queries.

It's noteworthy that some services may augment another service's index by appending to the entity’s `extends` object. In such scenarios, an `*-extended` event will contain only the newly added data. Should you require the complete dataset, you would need to retrieve the full ElasticSearch index entity using the provided ID.

This approach to indexing and event handling facilitates a modular, interconnected architecture where services can seamlessly integrate and react to changes, enriching the overall data ecosystem and enabling more dynamic, responsive applications.



## Index Event usernotificationpreferences-created

**Event topic**: `elastic-index-ecomm_usernotificationpreferences-created`

**Event payload**:
```json
{"id":"ID","_owner":"ID","userId":"ID","orderUpdates":"Boolean","shippingUpdates":"Boolean","promoOptIn":"Boolean","paymentEvents":"Boolean","systemEvents":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  

## Index Event usernotificationpreferences-updated

**Event topic**: `elastic-index-ecomm_usernotificationpreferences-created`

**Event payload**:
```json
{"id":"ID","_owner":"ID","userId":"ID","orderUpdates":"Boolean","shippingUpdates":"Boolean","promoOptIn":"Boolean","paymentEvents":"Boolean","systemEvents":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  

## Index Event usernotificationpreferences-deleted

**Event topic**: `elastic-index-ecomm_usernotificationpreferences-deleted`

**Event payload**:
```json
{"id":"ID","_owner":"ID","userId":"ID","orderUpdates":"Boolean","shippingUpdates":"Boolean","promoOptIn":"Boolean","paymentEvents":"Boolean","systemEvents":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  

## Index Event usernotificationpreferences-extended

**Event topic**: `elastic-index-ecomm_usernotificationpreferences-extended`

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


## Route Event usernotificationpreferences-created

**Event topic** : `ecomm-notificationpreferences-service-usernotificationpreferences-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `userNotificationPreferences` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`userNotificationPreferences`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"201","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"userNotificationPreferences","method":"POST","action":"create","appVersion":"Version","rowCount":1,"userNotificationPreferences":{"id":"ID","_owner":"ID","userId":"ID","orderUpdates":"Boolean","shippingUpdates":"Boolean","promoOptIn":"Boolean","paymentEvents":"Boolean","systemEvents":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event usernotificationpreferences-retrived

**Event topic** : `ecomm-notificationpreferences-service-usernotificationpreferences-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `userNotificationPreferences` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`userNotificationPreferences`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"userNotificationPreferences","method":"GET","action":"get","appVersion":"Version","rowCount":1,"userNotificationPreferences":{"id":"ID","_owner":"ID","userId":"ID","orderUpdates":"Boolean","shippingUpdates":"Boolean","promoOptIn":"Boolean","paymentEvents":"Boolean","systemEvents":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event usernotificationpreferences-updated

**Event topic** : `ecomm-notificationpreferences-service-usernotificationpreferences-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `userNotificationPreferences` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`userNotificationPreferences`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"userNotificationPreferences","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"userNotificationPreferences":{"id":"ID","_owner":"ID","userId":"ID","orderUpdates":"Boolean","shippingUpdates":"Boolean","promoOptIn":"Boolean","paymentEvents":"Boolean","systemEvents":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event usernotificationpreferences-deleted

**Event topic** : `ecomm-notificationpreferences-service-usernotificationpreferences-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `userNotificationPreferences` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`userNotificationPreferences`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"userNotificationPreferences","method":"DELETE","action":"delete","appVersion":"Version","rowCount":1,"userNotificationPreferences":{"id":"ID","_owner":"ID","userId":"ID","orderUpdates":"Boolean","shippingUpdates":"Boolean","promoOptIn":"Boolean","paymentEvents":"Boolean","systemEvents":"Boolean","isActive":false,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event usernotificationpreferences-listed

**Event topic** : `ecomm-notificationpreferences-service-usernotificationpreferences-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `userNotificationPreferencess` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`userNotificationPreferencess`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"userNotificationPreferencess","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","userNotificationPreferencess":[{"id":"ID","_owner":"ID","userId":"ID","orderUpdates":"Boolean","shippingUpdates":"Boolean","promoOptIn":"Boolean","paymentEvents":"Boolean","systemEvents":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  
## Route Event adminnotificationconfig-created

**Event topic** : `ecomm-notificationpreferences-service-adminnotificationconfig-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `adminNotificationConfig` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`adminNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"201","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"adminNotificationConfig","method":"POST","action":"create","appVersion":"Version","rowCount":1,"adminNotificationConfig":{"id":"ID","_owner":"ID","adminId":"ID","triggerEvents":"String","notifyBy":"String","enabled":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event adminnotificationconfig-retrived

**Event topic** : `ecomm-notificationpreferences-service-adminnotificationconfig-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `adminNotificationConfig` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`adminNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"adminNotificationConfig","method":"GET","action":"get","appVersion":"Version","rowCount":1,"adminNotificationConfig":{"id":"ID","_owner":"ID","adminId":"ID","triggerEvents":"String","notifyBy":"String","enabled":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event adminnotificationconfig-updated

**Event topic** : `ecomm-notificationpreferences-service-adminnotificationconfig-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `adminNotificationConfig` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`adminNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"adminNotificationConfig","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"adminNotificationConfig":{"id":"ID","_owner":"ID","adminId":"ID","triggerEvents":"String","notifyBy":"String","enabled":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event adminnotificationconfig-deleted

**Event topic** : `ecomm-notificationpreferences-service-adminnotificationconfig-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `adminNotificationConfig` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`adminNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"adminNotificationConfig","method":"DELETE","action":"delete","appVersion":"Version","rowCount":1,"adminNotificationConfig":{"id":"ID","_owner":"ID","adminId":"ID","triggerEvents":"String","notifyBy":"String","enabled":"Boolean","isActive":false,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event adminnotificationconfigs-listed

**Event topic** : `ecomm-notificationpreferences-service-adminnotificationconfigs-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `adminNotificationConfigs` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`adminNotificationConfigs`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"adminNotificationConfigs","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","adminNotificationConfigs":[{"id":"ID","_owner":"ID","adminId":"ID","triggerEvents":"String","notifyBy":"String","enabled":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  



## Index Event adminnotificationconfig-created

**Event topic**: `elastic-index-ecomm_adminnotificationconfig-created`

**Event payload**:
```json
{"id":"ID","_owner":"ID","adminId":"ID","triggerEvents":"String","notifyBy":"String","enabled":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  

## Index Event adminnotificationconfig-updated

**Event topic**: `elastic-index-ecomm_adminnotificationconfig-created`

**Event payload**:
```json
{"id":"ID","_owner":"ID","adminId":"ID","triggerEvents":"String","notifyBy":"String","enabled":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  

## Index Event adminnotificationconfig-deleted

**Event topic**: `elastic-index-ecomm_adminnotificationconfig-deleted`

**Event payload**:
```json
{"id":"ID","_owner":"ID","adminId":"ID","triggerEvents":"String","notifyBy":"String","enabled":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  

## Index Event adminnotificationconfig-extended

**Event topic**: `elastic-index-ecomm_adminnotificationconfig-extended`

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


## Route Event usernotificationpreferences-created

**Event topic** : `ecomm-notificationpreferences-service-usernotificationpreferences-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `userNotificationPreferences` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`userNotificationPreferences`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"201","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"userNotificationPreferences","method":"POST","action":"create","appVersion":"Version","rowCount":1,"userNotificationPreferences":{"id":"ID","_owner":"ID","userId":"ID","orderUpdates":"Boolean","shippingUpdates":"Boolean","promoOptIn":"Boolean","paymentEvents":"Boolean","systemEvents":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event usernotificationpreferences-retrived

**Event topic** : `ecomm-notificationpreferences-service-usernotificationpreferences-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `userNotificationPreferences` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`userNotificationPreferences`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"userNotificationPreferences","method":"GET","action":"get","appVersion":"Version","rowCount":1,"userNotificationPreferences":{"id":"ID","_owner":"ID","userId":"ID","orderUpdates":"Boolean","shippingUpdates":"Boolean","promoOptIn":"Boolean","paymentEvents":"Boolean","systemEvents":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event usernotificationpreferences-updated

**Event topic** : `ecomm-notificationpreferences-service-usernotificationpreferences-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `userNotificationPreferences` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`userNotificationPreferences`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"userNotificationPreferences","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"userNotificationPreferences":{"id":"ID","_owner":"ID","userId":"ID","orderUpdates":"Boolean","shippingUpdates":"Boolean","promoOptIn":"Boolean","paymentEvents":"Boolean","systemEvents":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event usernotificationpreferences-deleted

**Event topic** : `ecomm-notificationpreferences-service-usernotificationpreferences-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `userNotificationPreferences` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`userNotificationPreferences`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"userNotificationPreferences","method":"DELETE","action":"delete","appVersion":"Version","rowCount":1,"userNotificationPreferences":{"id":"ID","_owner":"ID","userId":"ID","orderUpdates":"Boolean","shippingUpdates":"Boolean","promoOptIn":"Boolean","paymentEvents":"Boolean","systemEvents":"Boolean","isActive":false,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event usernotificationpreferences-listed

**Event topic** : `ecomm-notificationpreferences-service-usernotificationpreferences-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `userNotificationPreferencess` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`userNotificationPreferencess`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"userNotificationPreferencess","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","userNotificationPreferencess":[{"id":"ID","_owner":"ID","userId":"ID","orderUpdates":"Boolean","shippingUpdates":"Boolean","promoOptIn":"Boolean","paymentEvents":"Boolean","systemEvents":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  
## Route Event adminnotificationconfig-created

**Event topic** : `ecomm-notificationpreferences-service-adminnotificationconfig-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `adminNotificationConfig` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`adminNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"201","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"adminNotificationConfig","method":"POST","action":"create","appVersion":"Version","rowCount":1,"adminNotificationConfig":{"id":"ID","_owner":"ID","adminId":"ID","triggerEvents":"String","notifyBy":"String","enabled":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event adminnotificationconfig-retrived

**Event topic** : `ecomm-notificationpreferences-service-adminnotificationconfig-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `adminNotificationConfig` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`adminNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"adminNotificationConfig","method":"GET","action":"get","appVersion":"Version","rowCount":1,"adminNotificationConfig":{"id":"ID","_owner":"ID","adminId":"ID","triggerEvents":"String","notifyBy":"String","enabled":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event adminnotificationconfig-updated

**Event topic** : `ecomm-notificationpreferences-service-adminnotificationconfig-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `adminNotificationConfig` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`adminNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"adminNotificationConfig","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"adminNotificationConfig":{"id":"ID","_owner":"ID","adminId":"ID","triggerEvents":"String","notifyBy":"String","enabled":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event adminnotificationconfig-deleted

**Event topic** : `ecomm-notificationpreferences-service-adminnotificationconfig-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `adminNotificationConfig` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`adminNotificationConfig`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"adminNotificationConfig","method":"DELETE","action":"delete","appVersion":"Version","rowCount":1,"adminNotificationConfig":{"id":"ID","_owner":"ID","adminId":"ID","triggerEvents":"String","notifyBy":"String","enabled":"Boolean","isActive":false,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event adminnotificationconfigs-listed

**Event topic** : `ecomm-notificationpreferences-service-adminnotificationconfigs-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `adminNotificationConfigs` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`adminNotificationConfigs`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"adminNotificationConfigs","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","adminNotificationConfigs":[{"id":"ID","_owner":"ID","adminId":"ID","triggerEvents":"String","notifyBy":"String","enabled":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  




# Copyright
All sources, documents and other digital materials are copyright of .

# About Us
For more information please visit our website: .

.
.
