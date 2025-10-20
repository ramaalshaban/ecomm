# EVENT GUIDE
## ecomm-ordermanagement-service

Handles creation, status/lifecycle updates, and storage of e-commerce orders. Integrates with Stripe for payments/refunds. Allows customers to view order history and admins to manage all orders. Captures shipping details, order items, and maintains an event log per order...

## Architectural Design Credit and Contact Information

The architectural design of this microservice is credited to . For inquiries, feedback, or further information regarding the architecture, please direct your communication to:

Email: 

We encourage open communication and welcome any questions or discussions related to the architectural aspects of this microservice.

# Documentation Scope

Welcome to the official documentation for the `OrderManagement` Service Event descriptions. This guide is dedicated to detailing how to subscribe to and listen for state changes within the `OrderManagement` Service, offering an exclusive focus on event subscription mechanisms.

**Intended Audience**

This documentation is aimed at developers and integrators looking to monitor `OrderManagement` Service state changes. It is especially relevant for those wishing to implement or enhance business logic based on interactions with `OrderManagement` objects.

**Overview**

This section provides detailed instructions on monitoring service events, covering payload structures and demonstrating typical use cases through examples.

# Authentication and Authorization

Access to the `OrderManagement` service's events is facilitated through the project's Kafka server, which is not accessible to the public. Subscription to a Kafka topic requires being on the same network and possessing valid Kafka user credentials.  This document presupposes that readers have existing access to the Kafka server.

Additionally, the service offers a public subscription option via REST for real-time data management in frontend applications, secured through REST API authentication and authorization mechanisms. To subscribe to service events via the REST API, please consult the Realtime REST API Guide.

# Database Events

Database events are triggered at the database layer, automatically and atomically, in response to any modifications at the data level. These events serve to notify subscribers about the creation, update, or deletion of objects within the database, distinct from any overarching business logic. 

Listening to database events is particularly beneficial for those focused on tracking changes at the database level. A typical use case for subscribing to database events is to replicate the data store of one service within another service's scope, ensuring data consistency and syncronization across services.

For example, while a business operation such as "approve membership" might generate a high-level business event like `membership-approved`, the underlying database changes could involve multiple state updates to different entities. These might be published as separate events, such as `dbevent-member-updated` and `dbevent-user-updated`, reflecting the granular changes at the database level.

Such detailed eventing provides a robust foundation for building responsive, data-driven applications, enabling fine-grained observability and reaction to the dynamics of the data landscape. It also facilitates the architectural pattern of event sourcing, where state changes are captured as a sequence of events, allowing for high-fidelity data replication and history replay for analytical or auditing purposes.

## DbEvent order-created

**Event topic**: `ecomm-ordermanagement-service-dbevent-order-created`

This event is triggered upon the creation of a `order` data object in the database. The event payload encompasses the newly created data, encapsulated within the root of the paylod.

**Event payload**: 
```json
{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  
## DbEvent order-updated

**Event topic**: `ecomm-ordermanagement-service-dbevent-order-updated`

Activation of this event follows the update of a `order` data object. The payload contains the updated information under the `order` attribute, along with the original data prior to update, labeled as `old_order`.

**Event payload**: 
```json
{
old_order:{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},
order:{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},
}
``` 
## DbEvent order-deleted

**Event topic**: `ecomm-ordermanagement-service-dbevent-order-deleted`

This event announces the deletion of a `order` data object, covering both hard deletions (permanent removal) and soft deletions (where the `isActive` attribute is set to false). Regardless of the deletion type, the event payload will present the data as it was immediately before deletion, highlighting an `isActive` status of false for soft deletions.

**Event payload**: 
```json
{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":false,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  
## DbEvent orderItem-created

**Event topic**: `ecomm-ordermanagement-service-dbevent-orderitem-created`

This event is triggered upon the creation of a `orderItem` data object in the database. The event payload encompasses the newly created data, encapsulated within the root of the paylod.

**Event payload**: 
```json
{"id":"ID","_owner":"ID","productId":"ID","productName":"String","sku":"String","price":"Integer","quantity":"Integer","image":"String","attributes":"Object","recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  
## DbEvent orderItem-updated

**Event topic**: `ecomm-ordermanagement-service-dbevent-orderitem-updated`

Activation of this event follows the update of a `orderItem` data object. The payload contains the updated information under the `orderItem` attribute, along with the original data prior to update, labeled as `old_orderItem`.

**Event payload**: 
```json
{
old_orderItem:{"id":"ID","_owner":"ID","productId":"ID","productName":"String","sku":"String","price":"Integer","quantity":"Integer","image":"String","attributes":"Object","recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},
orderItem:{"id":"ID","_owner":"ID","productId":"ID","productName":"String","sku":"String","price":"Integer","quantity":"Integer","image":"String","attributes":"Object","recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},
}
``` 
## DbEvent orderItem-deleted

**Event topic**: `ecomm-ordermanagement-service-dbevent-orderitem-deleted`

This event announces the deletion of a `orderItem` data object, covering both hard deletions (permanent removal) and soft deletions (where the `isActive` attribute is set to false). Regardless of the deletion type, the event payload will present the data as it was immediately before deletion, highlighting an `isActive` status of false for soft deletions.

**Event payload**: 
```json
{"id":"ID","_owner":"ID","productId":"ID","productName":"String","sku":"String","price":"Integer","quantity":"Integer","image":"String","attributes":"Object","recordVersion":"Integer","createdAt":"Date","updatedAt":"Date","isActive":false}
```  
## DbEvent sys_orderPayment-created

**Event topic**: `ecomm-ordermanagement-service-dbevent-sys_orderpayment-created`

This event is triggered upon the creation of a `sys_orderPayment` data object in the database. The event payload encompasses the newly created data, encapsulated within the root of the paylod.

**Event payload**: 
```json
{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  
## DbEvent sys_orderPayment-updated

**Event topic**: `ecomm-ordermanagement-service-dbevent-sys_orderpayment-updated`

Activation of this event follows the update of a `sys_orderPayment` data object. The payload contains the updated information under the `sys_orderPayment` attribute, along with the original data prior to update, labeled as `old_sys_orderPayment`.

**Event payload**: 
```json
{
old_sys_orderPayment:{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},
sys_orderPayment:{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},
}
``` 
## DbEvent sys_orderPayment-deleted

**Event topic**: `ecomm-ordermanagement-service-dbevent-sys_orderpayment-deleted`

This event announces the deletion of a `sys_orderPayment` data object, covering both hard deletions (permanent removal) and soft deletions (where the `isActive` attribute is set to false). Regardless of the deletion type, the event payload will present the data as it was immediately before deletion, highlighting an `isActive` status of false for soft deletions.

**Event payload**: 
```json
{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":false,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  
## DbEvent sys_paymentCustomer-created

**Event topic**: `ecomm-ordermanagement-service-dbevent-sys_paymentcustomer-created`

This event is triggered upon the creation of a `sys_paymentCustomer` data object in the database. The event payload encompasses the newly created data, encapsulated within the root of the paylod.

**Event payload**: 
```json
{"id":"ID","_owner":"ID","userId":"ID","customerId":"String","platform":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  
## DbEvent sys_paymentCustomer-updated

**Event topic**: `ecomm-ordermanagement-service-dbevent-sys_paymentcustomer-updated`

Activation of this event follows the update of a `sys_paymentCustomer` data object. The payload contains the updated information under the `sys_paymentCustomer` attribute, along with the original data prior to update, labeled as `old_sys_paymentCustomer`.

**Event payload**: 
```json
{
old_sys_paymentCustomer:{"id":"ID","_owner":"ID","userId":"ID","customerId":"String","platform":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},
sys_paymentCustomer:{"id":"ID","_owner":"ID","userId":"ID","customerId":"String","platform":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},
}
``` 
## DbEvent sys_paymentCustomer-deleted

**Event topic**: `ecomm-ordermanagement-service-dbevent-sys_paymentcustomer-deleted`

This event announces the deletion of a `sys_paymentCustomer` data object, covering both hard deletions (permanent removal) and soft deletions (where the `isActive` attribute is set to false). Regardless of the deletion type, the event payload will present the data as it was immediately before deletion, highlighting an `isActive` status of false for soft deletions.

**Event payload**: 
```json
{"id":"ID","_owner":"ID","userId":"ID","customerId":"String","platform":"String","isActive":false,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  
## DbEvent sys_paymentMethod-created

**Event topic**: `ecomm-ordermanagement-service-dbevent-sys_paymentmethod-created`

This event is triggered upon the creation of a `sys_paymentMethod` data object in the database. The event payload encompasses the newly created data, encapsulated within the root of the paylod.

**Event payload**: 
```json
{"id":"ID","_owner":"ID","paymentMethodId":"String","userId":"ID","customerId":"String","cardHolderName":"String","cardHolderZip":"String","platform":"String","cardInfo":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  
## DbEvent sys_paymentMethod-updated

**Event topic**: `ecomm-ordermanagement-service-dbevent-sys_paymentmethod-updated`

Activation of this event follows the update of a `sys_paymentMethod` data object. The payload contains the updated information under the `sys_paymentMethod` attribute, along with the original data prior to update, labeled as `old_sys_paymentMethod`.

**Event payload**: 
```json
{
old_sys_paymentMethod:{"id":"ID","_owner":"ID","paymentMethodId":"String","userId":"ID","customerId":"String","cardHolderName":"String","cardHolderZip":"String","platform":"String","cardInfo":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},
sys_paymentMethod:{"id":"ID","_owner":"ID","paymentMethodId":"String","userId":"ID","customerId":"String","cardHolderName":"String","cardHolderZip":"String","platform":"String","cardInfo":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},
}
``` 
## DbEvent sys_paymentMethod-deleted

**Event topic**: `ecomm-ordermanagement-service-dbevent-sys_paymentmethod-deleted`

This event announces the deletion of a `sys_paymentMethod` data object, covering both hard deletions (permanent removal) and soft deletions (where the `isActive` attribute is set to false). Regardless of the deletion type, the event payload will present the data as it was immediately before deletion, highlighting an `isActive` status of false for soft deletions.

**Event payload**: 
```json
{"id":"ID","_owner":"ID","paymentMethodId":"String","userId":"ID","customerId":"String","cardHolderName":"String","cardHolderZip":"String","platform":"String","cardInfo":"Object","isActive":false,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  


# ElasticSearch Index Events

Within the `OrderManagement` service, most data objects are mirrored in ElasticSearch indices, ensuring these indices remain syncronized with their database counterparts through creation, updates, and deletions. These indices serve dual purposes: they act as a data source for external services and furnish aggregated data tailored to enhance frontend user experiences. Consequently, an ElasticSearch index might encapsulate data in its original form or aggregate additional information from other data objects. 

These aggregations can include both one-to-one and one-to-many relationships not only with database objects within the same service but also across different services. This capability allows developers to access comprehensive, aggregated data efficiently. By subscribing to ElasticSearch index events, developers are notified when an index is updated and can directly obtain the aggregated entity within the event payload, bypassing the need for separate ElasticSearch queries.

It's noteworthy that some services may augment another service's index by appending to the entity’s `extends` object. In such scenarios, an `*-extended` event will contain only the newly added data. Should you require the complete dataset, you would need to retrieve the full ElasticSearch index entity using the provided ID.

This approach to indexing and event handling facilitates a modular, interconnected architecture where services can seamlessly integrate and react to changes, enriching the overall data ecosystem and enabling more dynamic, responsive applications.



## Index Event order-created

**Event topic**: `elastic-index-ecomm_order-created`

**Event payload**:
```json
{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  

## Index Event order-updated

**Event topic**: `elastic-index-ecomm_order-created`

**Event payload**:
```json
{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  

## Index Event order-deleted

**Event topic**: `elastic-index-ecomm_order-deleted`

**Event payload**:
```json
{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  

## Index Event order-extended

**Event topic**: `elastic-index-ecomm_order-extended`

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


## Route Event order-created

**Event topic** : `ecomm-ordermanagement-service-order-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"201","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"POST","action":"create","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event order-retrived

**Event topic** : `ecomm-ordermanagement-service-order-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"GET","action":"get","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event order-updated

**Event topic** : `ecomm-ordermanagement-service-order-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event order-deleted

**Event topic** : `ecomm-ordermanagement-service-order-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"DELETE","action":"delete","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":false,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orders-listed

**Event topic** : `ecomm-ordermanagement-service-orders-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `orders` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`orders`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"orders","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","orders":[{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  
## Route Event orderpayment2-retrived

**Event topic** : `ecomm-ordermanagement-service-orderpayment2-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"GET","action":"get","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orderpayments2-listed

**Event topic** : `ecomm-ordermanagement-service-orderpayments2-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayments` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayments`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayments","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","sys_orderPayments":[{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  
## Route Event orderpayment-created

**Event topic** : `ecomm-ordermanagement-service-orderpayment-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"201","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"POST","action":"create","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orderpayment-updated

**Event topic** : `ecomm-ordermanagement-service-orderpayment-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orderpayment-deleted

**Event topic** : `ecomm-ordermanagement-service-orderpayment-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"DELETE","action":"delete","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":false,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orderpayments2-listed

**Event topic** : `ecomm-ordermanagement-service-orderpayments2-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayments` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayments`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayments","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","sys_orderPayments":[{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  
## Route Event orderpaymentbyorderid-retrived

**Event topic** : `ecomm-ordermanagement-service-orderpaymentbyorderid-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"GET","action":"get","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orderpaymentbypaymentid-retrived

**Event topic** : `ecomm-ordermanagement-service-orderpaymentbypaymentid-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"GET","action":"get","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orderpayment2-retrived

**Event topic** : `ecomm-ordermanagement-service-orderpayment2-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"GET","action":"get","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event startorder-checkouted

**Event topic** : `ecomm-ordermanagement-service-startorder-checkouted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event completeorder-checkouted

**Event topic** : `ecomm-ordermanagement-service-completeorder-checkouted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event refreshorder-checkouted

**Event topic** : `ecomm-ordermanagement-service-refreshorder-checkouted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event paymentcustomerbyuserid-retrived

**Event topic** : `ecomm-ordermanagement-service-paymentcustomerbyuserid-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_paymentCustomer` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_paymentCustomer`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_paymentCustomer","method":"GET","action":"get","appVersion":"Version","rowCount":1,"sys_paymentCustomer":{"id":"ID","_owner":"ID","userId":"ID","customerId":"String","platform":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event paymentcustomers-listed

**Event topic** : `ecomm-ordermanagement-service-paymentcustomers-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_paymentCustomers` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_paymentCustomers`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_paymentCustomers","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","sys_paymentCustomers":[{"id":"ID","_owner":"ID","userId":"ID","customerId":"String","platform":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  
## Route Event paymentcustomermethods-listed

**Event topic** : `ecomm-ordermanagement-service-paymentcustomermethods-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_paymentMethods` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_paymentMethods`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_paymentMethods","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","sys_paymentMethods":[{"id":"ID","_owner":"ID","paymentMethodId":"String","userId":"ID","customerId":"String","cardHolderName":"String","cardHolderZip":"String","platform":"String","cardInfo":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  



## Index Event orderitem-created

**Event topic**: `elastic-index-ecomm_orderitem-created`

**Event payload**:
```json
{"id":"ID","_owner":"ID","productId":"ID","productName":"String","sku":"String","price":"Integer","quantity":"Integer","image":"String","attributes":"Object","recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  

## Index Event orderitem-updated

**Event topic**: `elastic-index-ecomm_orderitem-created`

**Event payload**:
```json
{"id":"ID","_owner":"ID","productId":"ID","productName":"String","sku":"String","price":"Integer","quantity":"Integer","image":"String","attributes":"Object","recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  

## Index Event orderitem-deleted

**Event topic**: `elastic-index-ecomm_orderitem-deleted`

**Event payload**:
```json
{"id":"ID","_owner":"ID","productId":"ID","productName":"String","sku":"String","price":"Integer","quantity":"Integer","image":"String","attributes":"Object","recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  

## Index Event orderitem-extended

**Event topic**: `elastic-index-ecomm_orderitem-extended`

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


## Route Event order-created

**Event topic** : `ecomm-ordermanagement-service-order-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"201","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"POST","action":"create","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event order-retrived

**Event topic** : `ecomm-ordermanagement-service-order-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"GET","action":"get","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event order-updated

**Event topic** : `ecomm-ordermanagement-service-order-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event order-deleted

**Event topic** : `ecomm-ordermanagement-service-order-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"DELETE","action":"delete","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":false,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orders-listed

**Event topic** : `ecomm-ordermanagement-service-orders-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `orders` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`orders`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"orders","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","orders":[{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  
## Route Event orderpayment2-retrived

**Event topic** : `ecomm-ordermanagement-service-orderpayment2-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"GET","action":"get","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orderpayments2-listed

**Event topic** : `ecomm-ordermanagement-service-orderpayments2-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayments` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayments`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayments","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","sys_orderPayments":[{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  
## Route Event orderpayment-created

**Event topic** : `ecomm-ordermanagement-service-orderpayment-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"201","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"POST","action":"create","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orderpayment-updated

**Event topic** : `ecomm-ordermanagement-service-orderpayment-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orderpayment-deleted

**Event topic** : `ecomm-ordermanagement-service-orderpayment-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"DELETE","action":"delete","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":false,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orderpayments2-listed

**Event topic** : `ecomm-ordermanagement-service-orderpayments2-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayments` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayments`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayments","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","sys_orderPayments":[{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  
## Route Event orderpaymentbyorderid-retrived

**Event topic** : `ecomm-ordermanagement-service-orderpaymentbyorderid-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"GET","action":"get","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orderpaymentbypaymentid-retrived

**Event topic** : `ecomm-ordermanagement-service-orderpaymentbypaymentid-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"GET","action":"get","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orderpayment2-retrived

**Event topic** : `ecomm-ordermanagement-service-orderpayment2-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"GET","action":"get","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event startorder-checkouted

**Event topic** : `ecomm-ordermanagement-service-startorder-checkouted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event completeorder-checkouted

**Event topic** : `ecomm-ordermanagement-service-completeorder-checkouted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event refreshorder-checkouted

**Event topic** : `ecomm-ordermanagement-service-refreshorder-checkouted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event paymentcustomerbyuserid-retrived

**Event topic** : `ecomm-ordermanagement-service-paymentcustomerbyuserid-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_paymentCustomer` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_paymentCustomer`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_paymentCustomer","method":"GET","action":"get","appVersion":"Version","rowCount":1,"sys_paymentCustomer":{"id":"ID","_owner":"ID","userId":"ID","customerId":"String","platform":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event paymentcustomers-listed

**Event topic** : `ecomm-ordermanagement-service-paymentcustomers-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_paymentCustomers` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_paymentCustomers`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_paymentCustomers","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","sys_paymentCustomers":[{"id":"ID","_owner":"ID","userId":"ID","customerId":"String","platform":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  
## Route Event paymentcustomermethods-listed

**Event topic** : `ecomm-ordermanagement-service-paymentcustomermethods-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_paymentMethods` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_paymentMethods`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_paymentMethods","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","sys_paymentMethods":[{"id":"ID","_owner":"ID","paymentMethodId":"String","userId":"ID","customerId":"String","cardHolderName":"String","cardHolderZip":"String","platform":"String","cardInfo":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  



## Index Event sys_orderpayment-created

**Event topic**: `elastic-index-ecomm_sys_orderpayment-created`

**Event payload**:
```json
{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  

## Index Event sys_orderpayment-updated

**Event topic**: `elastic-index-ecomm_sys_orderpayment-created`

**Event payload**:
```json
{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  

## Index Event sys_orderpayment-deleted

**Event topic**: `elastic-index-ecomm_sys_orderpayment-deleted`

**Event payload**:
```json
{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  

## Index Event sys_orderpayment-extended

**Event topic**: `elastic-index-ecomm_sys_orderpayment-extended`

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


## Route Event order-created

**Event topic** : `ecomm-ordermanagement-service-order-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"201","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"POST","action":"create","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event order-retrived

**Event topic** : `ecomm-ordermanagement-service-order-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"GET","action":"get","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event order-updated

**Event topic** : `ecomm-ordermanagement-service-order-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event order-deleted

**Event topic** : `ecomm-ordermanagement-service-order-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"DELETE","action":"delete","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":false,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orders-listed

**Event topic** : `ecomm-ordermanagement-service-orders-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `orders` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`orders`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"orders","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","orders":[{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  
## Route Event orderpayment2-retrived

**Event topic** : `ecomm-ordermanagement-service-orderpayment2-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"GET","action":"get","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orderpayments2-listed

**Event topic** : `ecomm-ordermanagement-service-orderpayments2-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayments` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayments`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayments","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","sys_orderPayments":[{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  
## Route Event orderpayment-created

**Event topic** : `ecomm-ordermanagement-service-orderpayment-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"201","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"POST","action":"create","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orderpayment-updated

**Event topic** : `ecomm-ordermanagement-service-orderpayment-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orderpayment-deleted

**Event topic** : `ecomm-ordermanagement-service-orderpayment-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"DELETE","action":"delete","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":false,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orderpayments2-listed

**Event topic** : `ecomm-ordermanagement-service-orderpayments2-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayments` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayments`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayments","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","sys_orderPayments":[{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  
## Route Event orderpaymentbyorderid-retrived

**Event topic** : `ecomm-ordermanagement-service-orderpaymentbyorderid-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"GET","action":"get","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orderpaymentbypaymentid-retrived

**Event topic** : `ecomm-ordermanagement-service-orderpaymentbypaymentid-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"GET","action":"get","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orderpayment2-retrived

**Event topic** : `ecomm-ordermanagement-service-orderpayment2-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"GET","action":"get","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event startorder-checkouted

**Event topic** : `ecomm-ordermanagement-service-startorder-checkouted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event completeorder-checkouted

**Event topic** : `ecomm-ordermanagement-service-completeorder-checkouted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event refreshorder-checkouted

**Event topic** : `ecomm-ordermanagement-service-refreshorder-checkouted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event paymentcustomerbyuserid-retrived

**Event topic** : `ecomm-ordermanagement-service-paymentcustomerbyuserid-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_paymentCustomer` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_paymentCustomer`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_paymentCustomer","method":"GET","action":"get","appVersion":"Version","rowCount":1,"sys_paymentCustomer":{"id":"ID","_owner":"ID","userId":"ID","customerId":"String","platform":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event paymentcustomers-listed

**Event topic** : `ecomm-ordermanagement-service-paymentcustomers-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_paymentCustomers` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_paymentCustomers`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_paymentCustomers","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","sys_paymentCustomers":[{"id":"ID","_owner":"ID","userId":"ID","customerId":"String","platform":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  
## Route Event paymentcustomermethods-listed

**Event topic** : `ecomm-ordermanagement-service-paymentcustomermethods-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_paymentMethods` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_paymentMethods`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_paymentMethods","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","sys_paymentMethods":[{"id":"ID","_owner":"ID","paymentMethodId":"String","userId":"ID","customerId":"String","cardHolderName":"String","cardHolderZip":"String","platform":"String","cardInfo":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  



## Index Event sys_paymentcustomer-created

**Event topic**: `elastic-index-ecomm_sys_paymentcustomer-created`

**Event payload**:
```json
{"id":"ID","_owner":"ID","userId":"ID","customerId":"String","platform":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  

## Index Event sys_paymentcustomer-updated

**Event topic**: `elastic-index-ecomm_sys_paymentcustomer-created`

**Event payload**:
```json
{"id":"ID","_owner":"ID","userId":"ID","customerId":"String","platform":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  

## Index Event sys_paymentcustomer-deleted

**Event topic**: `elastic-index-ecomm_sys_paymentcustomer-deleted`

**Event payload**:
```json
{"id":"ID","_owner":"ID","userId":"ID","customerId":"String","platform":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  

## Index Event sys_paymentcustomer-extended

**Event topic**: `elastic-index-ecomm_sys_paymentcustomer-extended`

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


## Route Event order-created

**Event topic** : `ecomm-ordermanagement-service-order-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"201","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"POST","action":"create","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event order-retrived

**Event topic** : `ecomm-ordermanagement-service-order-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"GET","action":"get","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event order-updated

**Event topic** : `ecomm-ordermanagement-service-order-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event order-deleted

**Event topic** : `ecomm-ordermanagement-service-order-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"DELETE","action":"delete","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":false,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orders-listed

**Event topic** : `ecomm-ordermanagement-service-orders-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `orders` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`orders`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"orders","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","orders":[{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  
## Route Event orderpayment2-retrived

**Event topic** : `ecomm-ordermanagement-service-orderpayment2-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"GET","action":"get","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orderpayments2-listed

**Event topic** : `ecomm-ordermanagement-service-orderpayments2-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayments` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayments`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayments","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","sys_orderPayments":[{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  
## Route Event orderpayment-created

**Event topic** : `ecomm-ordermanagement-service-orderpayment-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"201","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"POST","action":"create","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orderpayment-updated

**Event topic** : `ecomm-ordermanagement-service-orderpayment-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orderpayment-deleted

**Event topic** : `ecomm-ordermanagement-service-orderpayment-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"DELETE","action":"delete","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":false,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orderpayments2-listed

**Event topic** : `ecomm-ordermanagement-service-orderpayments2-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayments` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayments`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayments","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","sys_orderPayments":[{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  
## Route Event orderpaymentbyorderid-retrived

**Event topic** : `ecomm-ordermanagement-service-orderpaymentbyorderid-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"GET","action":"get","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orderpaymentbypaymentid-retrived

**Event topic** : `ecomm-ordermanagement-service-orderpaymentbypaymentid-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"GET","action":"get","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orderpayment2-retrived

**Event topic** : `ecomm-ordermanagement-service-orderpayment2-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"GET","action":"get","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event startorder-checkouted

**Event topic** : `ecomm-ordermanagement-service-startorder-checkouted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event completeorder-checkouted

**Event topic** : `ecomm-ordermanagement-service-completeorder-checkouted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event refreshorder-checkouted

**Event topic** : `ecomm-ordermanagement-service-refreshorder-checkouted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event paymentcustomerbyuserid-retrived

**Event topic** : `ecomm-ordermanagement-service-paymentcustomerbyuserid-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_paymentCustomer` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_paymentCustomer`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_paymentCustomer","method":"GET","action":"get","appVersion":"Version","rowCount":1,"sys_paymentCustomer":{"id":"ID","_owner":"ID","userId":"ID","customerId":"String","platform":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event paymentcustomers-listed

**Event topic** : `ecomm-ordermanagement-service-paymentcustomers-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_paymentCustomers` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_paymentCustomers`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_paymentCustomers","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","sys_paymentCustomers":[{"id":"ID","_owner":"ID","userId":"ID","customerId":"String","platform":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  
## Route Event paymentcustomermethods-listed

**Event topic** : `ecomm-ordermanagement-service-paymentcustomermethods-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_paymentMethods` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_paymentMethods`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_paymentMethods","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","sys_paymentMethods":[{"id":"ID","_owner":"ID","paymentMethodId":"String","userId":"ID","customerId":"String","cardHolderName":"String","cardHolderZip":"String","platform":"String","cardInfo":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  



## Index Event sys_paymentmethod-created

**Event topic**: `elastic-index-ecomm_sys_paymentmethod-created`

**Event payload**:
```json
{"id":"ID","_owner":"ID","paymentMethodId":"String","userId":"ID","customerId":"String","cardHolderName":"String","cardHolderZip":"String","platform":"String","cardInfo":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  

## Index Event sys_paymentmethod-updated

**Event topic**: `elastic-index-ecomm_sys_paymentmethod-created`

**Event payload**:
```json
{"id":"ID","_owner":"ID","paymentMethodId":"String","userId":"ID","customerId":"String","cardHolderName":"String","cardHolderZip":"String","platform":"String","cardInfo":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  

## Index Event sys_paymentmethod-deleted

**Event topic**: `elastic-index-ecomm_sys_paymentmethod-deleted`

**Event payload**:
```json
{"id":"ID","_owner":"ID","paymentMethodId":"String","userId":"ID","customerId":"String","cardHolderName":"String","cardHolderZip":"String","platform":"String","cardInfo":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}
```  

## Index Event sys_paymentmethod-extended

**Event topic**: `elastic-index-ecomm_sys_paymentmethod-extended`

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


## Route Event order-created

**Event topic** : `ecomm-ordermanagement-service-order-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"201","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"POST","action":"create","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event order-retrived

**Event topic** : `ecomm-ordermanagement-service-order-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"GET","action":"get","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event order-updated

**Event topic** : `ecomm-ordermanagement-service-order-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event order-deleted

**Event topic** : `ecomm-ordermanagement-service-order-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"DELETE","action":"delete","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":false,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orders-listed

**Event topic** : `ecomm-ordermanagement-service-orders-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `orders` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`orders`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"orders","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","orders":[{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  
## Route Event orderpayment2-retrived

**Event topic** : `ecomm-ordermanagement-service-orderpayment2-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"GET","action":"get","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orderpayments2-listed

**Event topic** : `ecomm-ordermanagement-service-orderpayments2-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayments` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayments`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayments","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","sys_orderPayments":[{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  
## Route Event orderpayment-created

**Event topic** : `ecomm-ordermanagement-service-orderpayment-created`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"201","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"POST","action":"create","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orderpayment-updated

**Event topic** : `ecomm-ordermanagement-service-orderpayment-updated`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orderpayment-deleted

**Event topic** : `ecomm-ordermanagement-service-orderpayment-deleted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"DELETE","action":"delete","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":false,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orderpayments2-listed

**Event topic** : `ecomm-ordermanagement-service-orderpayments2-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayments` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayments`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayments","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","sys_orderPayments":[{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  
## Route Event orderpaymentbyorderid-retrived

**Event topic** : `ecomm-ordermanagement-service-orderpaymentbyorderid-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"GET","action":"get","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orderpaymentbypaymentid-retrived

**Event topic** : `ecomm-ordermanagement-service-orderpaymentbypaymentid-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"GET","action":"get","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event orderpayment2-retrived

**Event topic** : `ecomm-ordermanagement-service-orderpayment2-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_orderPayment` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_orderPayment`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"GET","action":"get","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event startorder-checkouted

**Event topic** : `ecomm-ordermanagement-service-startorder-checkouted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event completeorder-checkouted

**Event topic** : `ecomm-ordermanagement-service-completeorder-checkouted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event refreshorder-checkouted

**Event topic** : `ecomm-ordermanagement-service-refreshorder-checkouted`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `order` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`order`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event paymentcustomerbyuserid-retrived

**Event topic** : `ecomm-ordermanagement-service-paymentcustomerbyuserid-retrived`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_paymentCustomer` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_paymentCustomer`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_paymentCustomer","method":"GET","action":"get","appVersion":"Version","rowCount":1,"sys_paymentCustomer":{"id":"ID","_owner":"ID","userId":"ID","customerId":"String","platform":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  
## Route Event paymentcustomers-listed

**Event topic** : `ecomm-ordermanagement-service-paymentcustomers-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_paymentCustomers` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_paymentCustomers`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_paymentCustomers","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","sys_paymentCustomers":[{"id":"ID","_owner":"ID","userId":"ID","customerId":"String","platform":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  
## Route Event paymentcustomermethods-listed

**Event topic** : `ecomm-ordermanagement-service-paymentcustomermethods-listed`

**Event payload**:

The event payload, mirroring the REST API response, is structured as an encapsulated JSON. It includes metadata related to the API as well as the `sys_paymentMethods` data object itself. 

The following JSON included in the payload illustrates the fullest representation of the **`sys_paymentMethods`** object. Note, however, that certain properties might be excluded in accordance with the object's inherent logic.

```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_paymentMethods","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","sys_paymentMethods":[{"id":"ID","_owner":"ID","paymentMethodId":"String","userId":"ID","customerId":"String","cardHolderName":"String","cardHolderZip":"String","platform":"String","cardInfo":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  




# Copyright
All sources, documents and other digital materials are copyright of .

# About Us
For more information please visit our website: .

.
.
