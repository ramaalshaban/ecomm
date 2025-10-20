 

# REST API GUIDE 
## ecomm-ordermanagement-service

Handles creation, status/lifecycle updates, and storage of e-commerce orders. Integrates with Stripe for payments/refunds. Allows customers to view order history and admins to manage all orders. Captures shipping details, order items, and maintains an event log per order...

## Architectural Design Credit and Contact Information

The architectural design of this microservice is credited to . 
For inquiries, feedback, or further information regarding the architecture, please direct your communication to:

Email: 

We encourage open communication and welcome any questions or discussions related to the architectural aspects of this microservice.

## Documentation Scope

Welcome to the official documentation for the OrderManagement Service's REST API. This document is designed to provide a comprehensive guide to interfacing with our OrderManagement Service exclusively through RESTful API endpoints.

**Intended Audience**

This documentation is intended for developers and integrators who are looking to interact with the OrderManagement Service via HTTP requests for purposes such as creating, updating, deleting and querying OrderManagement objects.

**Overview**

Within these pages, you will find detailed information on how to effectively utilize the REST API, including authentication methods, request and response formats, endpoint descriptions, and examples of common use cases.

Beyond REST
It's important to note that the OrderManagement Service also supports alternative methods of interaction, such as gRPC and messaging via a Message Broker. These communication methods are beyond the scope of this document. For information regarding these protocols, please refer to their respective documentation.

## Authentication And Authorization

To ensure secure access to the OrderManagement service's protected endpoints, a project-wide access token is required. This token serves as the primary method for authenticating requests to our service. However, it's important to note that access control varies across different routes:

**Protected API**: 
Certain API (routes) require specific authorization levels. Access to these routes is contingent upon the possession of a valid access token that meets the route-specific authorization criteria. Unauthorized requests to these routes will be rejected.

**Public API **: 
The service also includes public API (routes) that are accessible without authentication. These public endpoints are designed for open access and do not require an access token.

### Token Locations
When including your access token in a request, ensure it is placed in one of the following specified locations. The service will sequentially search these locations for the token, utilizing the first one it encounters.

| Location               | Token Name / Param Name      |
| ---------------------- | ---------------------------- |
| Query                  | access_token                 |
| Authorization Header   | Bearer                       |
| Header                 | ecomm-access-token|
| Cookie                 | ecomm-access-token|


Please ensure the token is correctly placed in one of these locations, using the appropriate label as indicated. The service prioritizes these locations in the order listed, processing the first token it successfully identifies.


## Api Definitions
This section outlines the API endpoints available within the OrderManagement service. Each endpoint can receive parameters through various methods, meticulously described in the following definitions. It's important to understand the flexibility in how parameters can be included in requests to effectively interact with the OrderManagement service.

This service is configured to listen for HTTP requests on port `3001`, 
serving both the main API interface and default administrative endpoints.

The following routes are available by default:

* **API Test Interface (API Face):** `/`
* **Swagger Documentation:** `/swagger`
* **Postman Collection Download:** `/getPostmanCollection`
* **Health Checks:** `/health` and `/admin/health`
* **Current Session Info:** `/currentuser`
* **Favicon:** `/favicon.ico`

This service is accessible via the following environment-specific URLs:

* **Preview:** `https://ecomm.prw.mindbricks.com/orderManagement-api`
* **Staging:** `https://ecomm-stage.mindbricks.co/orderManagement-api`
* **Production:** `https://ecomm.mindbricks.co/orderManagement-api`

**Parameter Inclusion Methods:**
Parameters can be incorporated into API requests in several ways, each with its designated location. Understanding these methods is crucial for correctly constructing your requests:

**Query Parameters:** Included directly in the URL's query string.

**Path Parameters:** Embedded within the URL's path.

**Body Parameters:** Sent within the JSON body of the request.

**Session Parameters:** Automatically read from the session object. This method is used for parameters that are intrinsic to the user's session, such as userId. When using an API that involves session parameters, you can omit these from your request. The service will automatically bind them to the API layer, provided that a session is associated with your request.

**Note on Session Parameters:**
Session parameters represent a unique method of parameter inclusion, relying on the context of the user's session. A common example of a session parameter is userId, which the service automatically associates with your request when a session exists. This feature ensures seamless integration of user-specific data without manual input for each request.

By adhering to the specified parameter inclusion methods, you can effectively utilize the OrderManagement service's API endpoints. For detailed information on each endpoint, including required parameters and their accepted locations, refer to the individual API definitions below.

### Common Parameters

The `OrderManagement` service's business API support several common parameters designed to modify and enhance the behavior of API requests. These parameters are not individually listed in the API route definitions to avoid repetition. Instead, refer to this section to understand how to leverage these common behaviors across different routes. Note that all common parameters should be included in the query part of the URL.

### Supported Common Parameters:

- **getJoins (BOOLEAN)**: Controls whether to retrieve associated objects along with the main object. By default, `getJoins` is assumed to be `true`. Set it to `false` if you prefer to receive only the main fields of an object, excluding its associations.

- **excludeCQRS (BOOLEAN)**: Applicable only when `getJoins` is `true`. By default, `excludeCQRS` is set to `false`. Enabling this parameter (`true`) omits non-local associations, which are typically more resource-intensive as they require querying external services like ElasticSearch for additional information. Use this to optimize response times and resource usage.

- **requestId (String)**: Identifies a request to enable tracking through the service's log chain. A random hex string of 32 characters is assigned by default. If you wish to use a custom `requestId`, simply include it in your query parameters.

- **caching (BOOLEAN)**: Determines the use of caching for query API. By default, caching is enabled (`true`). To ensure the freshest data directly from the database, set this parameter to `false`, bypassing the cache.

- **cacheTTL (Integer)**: Specifies the Time-To-Live (TTL) for query caching, in seconds. This is particularly useful for adjusting the default caching duration (5 minutes) for `get list` queries. Setting a custom `cacheTTL` allows you to fine-tune the cache lifespan to meet your needs.

- **pageNumber (Integer)**: For paginated `get list` API's, this parameter selects which page of results to retrieve. The default is `1`, indicating the first page. To disable pagination and retrieve all results, set `pageNumber` to `0`.

- **pageRowCount (Integer)**: In conjunction with paginated API's, this parameter defines the number of records per page. The default value is `25`. Adjusting `pageRowCount` allows you to control the volume of data returned in a single request.

By utilizing these common parameters, you can tailor the behavior of API requests to suit your specific requirements, ensuring optimal performance and usability of the `OrderManagement` service.


### Error Response

If a request encounters an issue, whether due to a logical fault or a technical problem, the service responds with a standardized JSON error structure. The HTTP status code within this response indicates the nature of the error, utilizing commonly recognized codes for clarity:

- **400 Bad Request**: The request was improperly formatted or contained invalid parameters, preventing the server from processing it.
- **401 Unauthorized**: The request lacked valid authentication credentials or the credentials provided do not grant access to the requested resource.
- **404 Not Found**: The requested resource was not found on the server.
- **500 Internal Server Error**: The server encountered an unexpected condition that prevented it from fulfilling the request.

Each error response is structured to provide meaningful insight into the problem, assisting in diagnosing and resolving issues efficiently.

```js
{
  "result": "ERR",
  "status": 400,
  "message": "errMsg_organizationIdisNotAValidID",
  "errCode": 400,
  "date": "2024-03-19T12:13:54.124Z",
  "detail": "String"
}
``` 

### Object Structure of a Successfull Response

When the `OrderManagement` service processes requests successfully, it wraps the requested resource(s) within a JSON envelope. This envelope not only contains the data but also includes essential metadata, such as configuration details and pagination information, to enrich the response and provide context to the client.

**Key Characteristics of the Response Envelope:**

- **Data Presentation**: Depending on the nature of the request, the service returns either a single data object or an array of objects encapsulated within the JSON envelope.
  - **Creation and Update API**: These API routes return the unmodified (pure) form of the data object(s), without any associations to other data objects.
  - **Delete API**: Even though the data is removed from the database, the last known state of the data object(s) is returned in its pure form.
  - **Get Requests**: A single data object is returned in JSON format.
  - **Get List Requests**: An array of data objects is provided, reflecting a collection of resources.

- **Data Structure and Joins**: The complexity of the data structure in the response can vary based on the API's architectural design and the join options specified in the request. The architecture might inherently limit join operations, or they might be dynamically controlled through query parameters.
  - **Pure Data Forms**: In some cases, the response mirrors the exact structure found in the primary data table, without extensions.
  - **Extended Data Forms**: Alternatively, responses might include data extended through joins with tables within the same service or aggregated from external sources, such as ElasticSearch indices related to other services.
  - **Join Varieties**: The extensions might involve one-to-one joins, resulting in single object associations, or one-to-many joins, leading to an array of objects. In certain instances, the data might even feature nested inclusions from other data objects.

**Design Considerations**: The structure of a API's response data is meticulously crafted during the service's architectural planning. This design ensures that responses adequately reflect the intended data relationships and service logic, providing clients with rich and meaningful information.

**Brief Data**: Certain API's return a condensed version of the object data, intentionally selecting only specific fields deemed useful for that request. In such instances, the API documentation will detail the properties included in the response, guiding developers on what to expect.

### API Response Structure

The API utilizes a standardized JSON envelope to encapsulate responses. This envelope is designed to consistently deliver both the requested data and essential metadata, ensuring that clients can efficiently interpret and utilize the response.

**HTTP Status Codes:**

- **200 OK**: This status code is returned for successful GET, LIST, UPDATE, or DELETE operations, indicating that the request has been processed successfully.
- **201 Created**: This status code is specific to CREATE operations, signifying that the requested resource has been successfully created.

**Success Response Format:**

For successful operations, the response includes a `"status": "OK"` property, signaling the successful execution of the request. The structure of a successful response is outlined below:

```json
{
  "status":"OK",
  "statusCode": 200,   
  "elapsedMs":126,
  "ssoTime":120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName":"products",
  "method":"GET",
  "action":"list",
  "appVersion":"Version",
  "rowCount":3
  "products":[{},{},{}],
  "paging": {
    "pageNumber":1, 
    "pageRowCount":25, 
    "totalRowCount":3,
    "pageCount":1
  },
  "filters": [],
  "uiPermissions": []
}
```

- **`products`**: In this example, this key contains the actual response content, which may be a single object or an array of objects depending on the operation performed.

**Handling Errors:**

For details on handling error scenarios and understanding the structure of error responses, please refer to the "Error Response" section provided earlier in this documentation. It outlines how error conditions are communicated, including the use of HTTP status codes and standardized JSON structures for error messages.

## Resources 
OrderManagement service provides the following resources which are stored in its own database as a data object. Note that a resource for an api access is a data object for the service.

### Order resource

*Resource Definition* : A purchase order placed by a user, containing selected products, shipping info, total, and payment/lifecycle status. Integrated with Stripe for payment and refunds. Immutable after placed except for admin status/notes/stripe events.
*Order Resource Properties* 
| Name | Type | Required | Default | Definition | 
| ---- | ---- | -------- | ------- | ---------- |
| **userId** | ID |  |  | *User placing the order.* |
| **items** | Object |  |  | *Array of order items purchased (snapshot at time of order).* |
| **shippingAddress** | Object |  |  | *Shipping address for the order (recipientName, addressLine1, addressLine2, city, region, postalCode, country, phone).* |
| **totalAmount** | Integer |  |  | *Total price (in cents) for all items + shipping, used for payment charging (stripeAmount).* |
| **currency** | String |  |  | *Currency code (ISO 4217, e.g., USD, EUR) for payment/stripe.* |
| **status** | Enum |  |  | *Order lifecycle status. 0: pending, 1: paid, 2: processing, 3: shipped, 4: delivered, 5: cancelled, 6: refunded.* |
| **paymentStatus** | Enum |  |  | *Payment status for Stripe: 0: unpaid, 1: paid, 2: refunded, 3: failed.* |
| **placedAt** | Date |  |  | *Timestamp when order was placed/created (for sorting/history).* |
| **stripePaymentIntentId** | String |  |  | *Reference to Stripe payment intent for this order. Used to track payment lifecycle and reconciliation.* |
| **refundRequested** | Boolean |  |  | *Indicates customer/admin has requested a refund for this order.* |
| **refundAmount** | Integer |  |  | *Amount to refund (in cents). Present if refund is requested/processed. Optional - null if not used/full refund.* |
| **adminNotes** | String |  |  | *Notes about the order (visible/editable by admins only).* |
| **orderHistory** | Object |  |  | *Event log of status/payment/history changes: array of {event:String, date:Date, note:String} for order audit trail.* |
#### Enum Properties
Enum properties are represented as Small Integer values (0-255) in the database. The values are mapped to their corresponding names in the application layer.
##### status Enum Property
*Enum Options*
| Name | Value | Index | 
| ---- | ----- | ----- |
| **pending** | `"pending""` | 0 | 
| **paid** | `"paid""` | 1 | 
| **processing** | `"processing""` | 2 | 
| **shipped** | `"shipped""` | 3 | 
| **delivered** | `"delivered""` | 4 | 
| **cancelled** | `"cancelled""` | 5 | 
| **refunded** | `"refunded""` | 6 | 
##### paymentStatus Enum Property
*Enum Options*
| Name | Value | Index | 
| ---- | ----- | ----- |
| **unpaid** | `"unpaid""` | 0 | 
| **paid** | `"paid""` | 1 | 
| **refunded** | `"refunded""` | 2 | 
| **failed** | `"failed""` | 3 | 
### OrderItem resource

*Resource Definition* : Snapshot of a product at time of order: productId, name, sku, price per unit, quantity, image url, custom selection/attributes. Not updated after order placed.
*OrderItem Resource Properties* 
| Name | Type | Required | Default | Definition | 
| ---- | ---- | -------- | ------- | ---------- |
| **productId** | ID |  |  | *ID of product at time of order (relation to productCatalog), used for validation/reporting.* |
| **productName** | String |  |  | *Product name at time of order, stored for audit and reference even if original product is renamed/lost.* |
| **sku** | String |  |  | *Product SKU snapshot for later reference/analytics.* |
| **price** | Integer |  |  | *Unit price paid for product at order time (minor currency).* |
| **quantity** | Integer |  |  | *Quantity of this item purchased in the order.* |
| **image** | String |  |  | *Image URL of product at order time (audit/reference).* |
| **attributes** | Object |  |  | *Flexible snapshot of selected product options/spec at time of order (color, size, etc.).* |
### Sys_orderPayment resource

*Resource Definition* : A payment storage object to store the payment life cyle of orders based on order object. It is autocreated based on the source object&#39;s checkout config
*Sys_orderPayment Resource Properties* 
| Name | Type | Required | Default | Definition | 
| ---- | ---- | -------- | ------- | ---------- |
| **ownerId** | ID |  |  | * An ID value to represent owner user who created the order* |
| **orderId** | ID |  |  | *an ID value to represent the orderId which is the ID parameter of the source order object* |
| **paymentId** | String |  |  | *A String value to represent the paymentId which is generated on the Stripe gateway. This id may represent different objects due to the payment gateway and the chosen flow type* |
| **paymentStatus** | String |  |  | *A string value to represent the payment status which belongs to the lifecyle of a Stripe payment.* |
| **statusLiteral** | String |  |  | *A string value to represent the logical payment status which belongs to the application lifecycle itself.* |
| **redirectUrl** | String |  |  | *A string value to represent return page of the frontend to show the result of the payment, this is used when the callback is made to server not the client.* |
### Sys_paymentCustomer resource

*Resource Definition* : A payment storage object to store the customer values of the payment platform
*Sys_paymentCustomer Resource Properties* 
| Name | Type | Required | Default | Definition | 
| ---- | ---- | -------- | ------- | ---------- |
| **userId** | ID |  |  | * An ID value to represent the user who is created as a stripe customer* |
| **customerId** | String |  |  | *A string value to represent the customer id which is generated on the Stripe gateway. This id is used to represent the customer in the Stripe gateway* |
| **platform** | String |  |  | *A String value to represent payment platform which is used to make the payment. It is stripe as default. It will be used to distinguesh the payment gateways in the future.* |
### Sys_paymentMethod resource

*Resource Definition* : A payment storage object to store the payment methods of the platform customers
*Sys_paymentMethod Resource Properties* 
| Name | Type | Required | Default | Definition | 
| ---- | ---- | -------- | ------- | ---------- |
| **paymentMethodId** | String |  |  | *A string value to represent the id of the payment method on the payment platform.* |
| **userId** | ID |  |  | * An ID value to represent the user who owns the payment method* |
| **customerId** | String |  |  | *A string value to represent the customer id which is generated on the payment gateway.* |
| **cardHolderName** | String |  |  | *A string value to represent the name of the card holder. It can be different than the registered customer.* |
| **cardHolderZip** | String |  |  | *A string value to represent the zip code of the card holder. It is used for address verification in specific countries.* |
| **platform** | String |  |  | *A String value to represent payment platform which teh paymentMethod belongs. It is stripe as default. It will be used to distinguesh the payment gateways in the future.* |
| **cardInfo** | Object |  |  | *A Json value to store the card details of the payment method.* |
## Business Api
### Create Order API
*API Definition* : Place a new order for the current user. Copies validated cart items into order, stores shipping address, sets total/currency, triggers Stripe checkout, logs placement event.

*API Crud Type* : create

*Default access route* : *POST* `/v1/orders`

####  Parameters
The createOrder api has got 10 parameters  

| Parameter              | Type                   | Required | Population                   |
| ---------------------- | ---------------------- | -------- | ---------------------------- |
| items  | Object  | true | request.body?.items |
| shippingAddress  | Object  | true | request.body?.shippingAddress |
| totalAmount  | Integer  | true | request.body?.totalAmount |
| currency  | String  | true | request.body?.currency |
| placedAt  | Date  | true | request.body?.placedAt |
| stripePaymentIntentId  | String  | false | request.body?.stripePaymentIntentId |
| refundRequested  | Boolean  | false | request.body?.refundRequested |
| refundAmount  | Integer  | false | request.body?.refundAmount |
| adminNotes  | String  | false | request.body?.adminNotes |
| orderHistory  | Object  | false | request.body?.orderHistory |

To access the api you can use the **REST** controller with the path **POST  /v1/orders**
```js
  axios({
    method: 'POST',
    url: '/v1/orders',
    data: {
            items:"Object",  
            shippingAddress:"Object",  
            totalAmount:"Integer",  
            currency:"String",  
            placedAt:"Date",  
            stripePaymentIntentId:"String",  
            refundRequested:"Boolean",  
            refundAmount:"Integer",  
            adminNotes:"String",  
            orderHistory:"Object",  
    
    },
    params: {
    
    }
  });
```     
The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`order`** object in the respones. However, some properties may be omitted based on the object's internal logic.



```json
{"status":"OK","statusCode":"201","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"POST","action":"create","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For Create Order](businessApi/createOrder).

### Get Order API
*API Definition* : Get order details (own order for customer, any order for admin).

*API Crud Type* : get

*Default access route* : *GET* `/v1/orders/:orderId`

####  Parameters
The getOrder api has got 1 parameter  

| Parameter              | Type                   | Required | Population                   |
| ---------------------- | ---------------------- | -------- | ---------------------------- |
| orderId  | ID  | true | request.params?.orderId |

To access the api you can use the **REST** controller with the path **GET  /v1/orders/:orderId**
```js
  axios({
    method: 'GET',
    url: `/v1/orders/${orderId}`,
    data: {
    
    },
    params: {
    
    }
  });
```     
The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`order`** object in the respones. However, some properties may be omitted based on the object's internal logic.



```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"GET","action":"get","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For Get Order](businessApi/getOrder).

### Update Order API
*API Definition* : Update status/adminNotes/refund fields or process Stripe events. Used by admin or payment webhooks, not for user item/content change.

*API Crud Type* : update

*Default access route* : *PATCH* `/v1/orders/:orderId`

####  Parameters
The updateOrder api has got 8 parameters  

| Parameter              | Type                   | Required | Population                   |
| ---------------------- | ---------------------- | -------- | ---------------------------- |
| orderId  | ID  | true | request.params?.orderId |
| status  | Enum  | true | request.body?.status |
| paymentStatus  | Enum  | true | request.body?.paymentStatus |
| stripePaymentIntentId  | String  | false | request.body?.stripePaymentIntentId |
| refundRequested  | Boolean  | false | request.body?.refundRequested |
| refundAmount  | Integer  | false | request.body?.refundAmount |
| adminNotes  | String  | false | request.body?.adminNotes |
| orderHistory  | Object  | false | request.body?.orderHistory |

To access the api you can use the **REST** controller with the path **PATCH  /v1/orders/:orderId**
```js
  axios({
    method: 'PATCH',
    url: `/v1/orders/${orderId}`,
    data: {
            status:"Enum",  
            paymentStatus:"Enum",  
            stripePaymentIntentId:"String",  
            refundRequested:"Boolean",  
            refundAmount:"Integer",  
            adminNotes:"String",  
            orderHistory:"Object",  
    
    },
    params: {
    
    }
  });
```     
The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`order`** object in the respones. However, some properties may be omitted based on the object's internal logic.



```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For Update Order](businessApi/updateOrder).

### Delete Order API
*API Definition* : Soft delete order (admin only), for removing test/broken/cancelled orders from history. Object remains for reporting and compliance.

*API Crud Type* : delete

*Default access route* : *DELETE* `/v1/orders/:orderId`

####  Parameters
The deleteOrder api has got 1 parameter  

| Parameter              | Type                   | Required | Population                   |
| ---------------------- | ---------------------- | -------- | ---------------------------- |
| orderId  | ID  | true | request.params?.orderId |

To access the api you can use the **REST** controller with the path **DELETE  /v1/orders/:orderId**
```js
  axios({
    method: 'DELETE',
    url: `/v1/orders/${orderId}`,
    data: {
    
    },
    params: {
    
    }
  });
```     
The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`order`** object in the respones. However, some properties may be omitted based on the object's internal logic.



```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"DELETE","action":"delete","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":false,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For Delete Order](businessApi/deleteOrder).

### List Orders API
*API Definition* : List/search orders (customer: own orders; admin: all). Filter by status, placedAt, userId.

*API Crud Type* : list

*Default access route* : *GET* `/v1/orders`

The listOrders api has got no parameters.    

To access the api you can use the **REST** controller with the path **GET  /v1/orders**
```js
  axios({
    method: 'GET',
    url: '/v1/orders',
    data: {
    
    },
    params: {
    
    }
  });
```     
The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`orders`** object in the respones. However, some properties may be omitted based on the object's internal logic.



```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"orders","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","orders":[{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For List Orders](businessApi/listOrders).

### Get Orderpayment2 API
*API Definition* : This route is used to get the payment information by ID.

*API Crud Type* : get

*Default access route* : *GET* `/v1/orderpayment2/:sys_orderPaymentId`

####  Parameters
The getOrderPayment2 api has got 1 parameter  

| Parameter              | Type                   | Required | Population                   |
| ---------------------- | ---------------------- | -------- | ---------------------------- |
| sys_orderPaymentId  | ID  | true | request.params?.sys_orderPaymentId |

To access the api you can use the **REST** controller with the path **GET  /v1/orderpayment2/:sys_orderPaymentId**
```js
  axios({
    method: 'GET',
    url: `/v1/orderpayment2/${sys_orderPaymentId}`,
    data: {
    
    },
    params: {
    
    }
  });
```     
The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`sys_orderPayment`** object in the respones. However, some properties may be omitted based on the object's internal logic.



```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"GET","action":"get","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For Get Orderpayment2](businessApi/getOrderPayment2).

### List Orderpayments2 API
*API Definition* : This route is used to list all payments.

*API Crud Type* : list

*Default access route* : *GET* `/v1/orderpayments2`

The listOrderPayments2 api has got no parameters.    

To access the api you can use the **REST** controller with the path **GET  /v1/orderpayments2**
```js
  axios({
    method: 'GET',
    url: '/v1/orderpayments2',
    data: {
    
    },
    params: {
    
    }
  });
```     
The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`sys_orderPayments`** object in the respones. However, some properties may be omitted based on the object's internal logic.



```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayments","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","sys_orderPayments":[{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For List Orderpayments2](businessApi/listOrderPayments2).

### Create Orderpayment API
*API Definition* : This route is used to create a new payment.

*API Crud Type* : create

*Default access route* : *POST* `/v1/orderpayment`

####  Parameters
The createOrderPayment api has got 5 parameters  

| Parameter              | Type                   | Required | Population                   |
| ---------------------- | ---------------------- | -------- | ---------------------------- |
| orderId  | ID  | true | request.body?.orderId |
| paymentId  | String  | true | request.body?.paymentId |
| paymentStatus  | String  | true | request.body?.paymentStatus |
| statusLiteral  | String  | true | request.body?.statusLiteral |
| redirectUrl  | String  | false | request.body?.redirectUrl |

To access the api you can use the **REST** controller with the path **POST  /v1/orderpayment**
```js
  axios({
    method: 'POST',
    url: '/v1/orderpayment',
    data: {
            orderId:"ID",  
            paymentId:"String",  
            paymentStatus:"String",  
            statusLiteral:"String",  
            redirectUrl:"String",  
    
    },
    params: {
    
    }
  });
```     
The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`sys_orderPayment`** object in the respones. However, some properties may be omitted based on the object's internal logic.



```json
{"status":"OK","statusCode":"201","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"POST","action":"create","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For Create Orderpayment](businessApi/createOrderPayment).

### Update Orderpayment API
*API Definition* : This route is used to update an existing payment.

*API Crud Type* : update

*Default access route* : *PATCH* `/v1/orderpayment/:sys_orderPaymentId`

####  Parameters
The updateOrderPayment api has got 5 parameters  

| Parameter              | Type                   | Required | Population                   |
| ---------------------- | ---------------------- | -------- | ---------------------------- |
| sys_orderPaymentId  | ID  | true | request.params?.sys_orderPaymentId |
| paymentId  | String  | false | request.body?.paymentId |
| paymentStatus  | String  | false | request.body?.paymentStatus |
| statusLiteral  | String  | false | request.body?.statusLiteral |
| redirectUrl  | String  | false | request.body?.redirectUrl |

To access the api you can use the **REST** controller with the path **PATCH  /v1/orderpayment/:sys_orderPaymentId**
```js
  axios({
    method: 'PATCH',
    url: `/v1/orderpayment/${sys_orderPaymentId}`,
    data: {
            paymentId:"String",  
            paymentStatus:"String",  
            statusLiteral:"String",  
            redirectUrl:"String",  
    
    },
    params: {
    
    }
  });
```     
The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`sys_orderPayment`** object in the respones. However, some properties may be omitted based on the object's internal logic.



```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For Update Orderpayment](businessApi/updateOrderPayment).

### Delete Orderpayment API
*API Definition* : This route is used to delete a payment.

*API Crud Type* : delete

*Default access route* : *DELETE* `/v1/orderpayment/:sys_orderPaymentId`

####  Parameters
The deleteOrderPayment api has got 1 parameter  

| Parameter              | Type                   | Required | Population                   |
| ---------------------- | ---------------------- | -------- | ---------------------------- |
| sys_orderPaymentId  | ID  | true | request.params?.sys_orderPaymentId |

To access the api you can use the **REST** controller with the path **DELETE  /v1/orderpayment/:sys_orderPaymentId**
```js
  axios({
    method: 'DELETE',
    url: `/v1/orderpayment/${sys_orderPaymentId}`,
    data: {
    
    },
    params: {
    
    }
  });
```     
The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`sys_orderPayment`** object in the respones. However, some properties may be omitted based on the object's internal logic.



```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"DELETE","action":"delete","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":false,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For Delete Orderpayment](businessApi/deleteOrderPayment).

### List Orderpayments2 API
*API Definition* : This route is used to list all payments.

*API Crud Type* : list

*Default access route* : *GET* `/v1/orderpayments2`

The listOrderPayments2 api has got no parameters.    

To access the api you can use the **REST** controller with the path **GET  /v1/orderpayments2**
```js
  axios({
    method: 'GET',
    url: '/v1/orderpayments2',
    data: {
    
    },
    params: {
    
    }
  });
```     
The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`sys_orderPayments`** object in the respones. However, some properties may be omitted based on the object's internal logic.



```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayments","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","sys_orderPayments":[{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For List Orderpayments2](businessApi/listOrderPayments2).

### Get Orderpaymentbyorderid API
*API Definition* : This route is used to get the payment information by order id.

*API Crud Type* : get

*Default access route* : *GET* `/v1/orderpaymentbyorderid/:sys_orderPaymentId`

####  Parameters
The getOrderPaymentByOrderId api has got 1 parameter  

| Parameter              | Type                   | Required | Population                   |
| ---------------------- | ---------------------- | -------- | ---------------------------- |
| sys_orderPaymentId  | ID  | true | request.params?.sys_orderPaymentId |

To access the api you can use the **REST** controller with the path **GET  /v1/orderpaymentbyorderid/:sys_orderPaymentId**
```js
  axios({
    method: 'GET',
    url: `/v1/orderpaymentbyorderid/${sys_orderPaymentId}`,
    data: {
    
    },
    params: {
    
    }
  });
```     
The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`sys_orderPayment`** object in the respones. However, some properties may be omitted based on the object's internal logic.



```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"GET","action":"get","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For Get Orderpaymentbyorderid](businessApi/getOrderPaymentByOrderId).

### Get Orderpaymentbypaymentid API
*API Definition* : This route is used to get the payment information by payment id.

*API Crud Type* : get

*Default access route* : *GET* `/v1/orderpaymentbypaymentid/:sys_orderPaymentId`

####  Parameters
The getOrderPaymentByPaymentId api has got 1 parameter  

| Parameter              | Type                   | Required | Population                   |
| ---------------------- | ---------------------- | -------- | ---------------------------- |
| sys_orderPaymentId  | ID  | true | request.params?.sys_orderPaymentId |

To access the api you can use the **REST** controller with the path **GET  /v1/orderpaymentbypaymentid/:sys_orderPaymentId**
```js
  axios({
    method: 'GET',
    url: `/v1/orderpaymentbypaymentid/${sys_orderPaymentId}`,
    data: {
    
    },
    params: {
    
    }
  });
```     
The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`sys_orderPayment`** object in the respones. However, some properties may be omitted based on the object's internal logic.



```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"GET","action":"get","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For Get Orderpaymentbypaymentid](businessApi/getOrderPaymentByPaymentId).

### Get Orderpayment2 API
*API Definition* : This route is used to get the payment information by ID.

*API Crud Type* : get

*Default access route* : *GET* `/v1/orderpayment2/:sys_orderPaymentId`

####  Parameters
The getOrderPayment2 api has got 1 parameter  

| Parameter              | Type                   | Required | Population                   |
| ---------------------- | ---------------------- | -------- | ---------------------------- |
| sys_orderPaymentId  | ID  | true | request.params?.sys_orderPaymentId |

To access the api you can use the **REST** controller with the path **GET  /v1/orderpayment2/:sys_orderPaymentId**
```js
  axios({
    method: 'GET',
    url: `/v1/orderpayment2/${sys_orderPaymentId}`,
    data: {
    
    },
    params: {
    
    }
  });
```     
The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`sys_orderPayment`** object in the respones. However, some properties may be omitted based on the object's internal logic.



```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_orderPayment","method":"GET","action":"get","appVersion":"Version","rowCount":1,"sys_orderPayment":{"id":"ID","_owner":"ID","ownerId":"ID","orderId":"ID","paymentId":"String","paymentStatus":"String","statusLiteral":"String","redirectUrl":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For Get Orderpayment2](businessApi/getOrderPayment2).

### Checkout Startorder API
*API Definition* : Start checkout for order

*API Crud Type* : update

*Default access route* : *PATCH* `/v1/checkoutstartorder/:orderId`

####  Parameters
The checkoutStartOrder api has got 2 parameters  

| Parameter              | Type                   | Required | Population                   |
| ---------------------- | ---------------------- | -------- | ---------------------------- |
| orderId  | ID  | true | request.params?.orderId |
| paymentUserParams  | Object  | false | request.body?.paymentUserParams |

To access the api you can use the **REST** controller with the path **PATCH  /v1/checkoutstartorder/:orderId**
```js
  axios({
    method: 'PATCH',
    url: `/v1/checkoutstartorder/${orderId}`,
    data: {
            paymentUserParams:"Object",  
    
    },
    params: {
    
    }
  });
```     
The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`order`** object in the respones. However, some properties may be omitted based on the object's internal logic.



```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For Checkout Startorder](businessApi/checkoutStartOrder).

### Checkout Completeorder API
*API Definition* : Complete checkout for order

*API Crud Type* : update

*Default access route* : *PATCH* `/v1/checkoutcompleteorder/:orderId`

####  Parameters
The checkoutCompleteOrder api has got 2 parameters  

| Parameter              | Type                   | Required | Population                   |
| ---------------------- | ---------------------- | -------- | ---------------------------- |
| orderId  | ID  | true | request.params?.orderId |
| paymentUserParams  | Object  | false | request.body?.paymentUserParams |

To access the api you can use the **REST** controller with the path **PATCH  /v1/checkoutcompleteorder/:orderId**
```js
  axios({
    method: 'PATCH',
    url: `/v1/checkoutcompleteorder/${orderId}`,
    data: {
            paymentUserParams:"Object",  
    
    },
    params: {
    
    }
  });
```     
The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`order`** object in the respones. However, some properties may be omitted based on the object's internal logic.



```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For Checkout Completeorder](businessApi/checkoutCompleteOrder).

### Checkout Refreshorder API
*API Definition* : Refresh checkout for order

*API Crud Type* : update

*Default access route* : *PATCH* `/v1/checkoutrefreshorder/:orderId`

####  Parameters
The checkoutRefreshOrder api has got 2 parameters  

| Parameter              | Type                   | Required | Population                   |
| ---------------------- | ---------------------- | -------- | ---------------------------- |
| orderId  | ID  | true | request.params?.orderId |
| paymentUserParams  | Object  | false | request.body?.paymentUserParams |

To access the api you can use the **REST** controller with the path **PATCH  /v1/checkoutrefreshorder/:orderId**
```js
  axios({
    method: 'PATCH',
    url: `/v1/checkoutrefreshorder/${orderId}`,
    data: {
            paymentUserParams:"Object",  
    
    },
    params: {
    
    }
  });
```     
The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`order`** object in the respones. However, some properties may be omitted based on the object's internal logic.



```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"order","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"order":{"id":"ID","_owner":"ID","userId":"ID","items":"Object","shippingAddress":"Object","totalAmount":"Integer","currency":"String","status":"Enum","status_":"String","paymentStatus":"Enum","paymentStatus_":"String","placedAt":"Date","stripePaymentIntentId":"String","refundRequested":"Boolean","refundAmount":"Integer","adminNotes":"String","orderHistory":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For Checkout Refreshorder](businessApi/checkoutRefreshOrder).

### Get Paymentcustomerbyuserid API
*API Definition* : This route is used to get the payment customer information by user id.

*API Crud Type* : get

*Default access route* : *GET* `/v1/paymentcustomerbyuserid/:sys_paymentCustomerId`

####  Parameters
The getPaymentCustomerByUserId api has got 1 parameter  

| Parameter              | Type                   | Required | Population                   |
| ---------------------- | ---------------------- | -------- | ---------------------------- |
| sys_paymentCustomerId  | ID  | true | request.params?.sys_paymentCustomerId |

To access the api you can use the **REST** controller with the path **GET  /v1/paymentcustomerbyuserid/:sys_paymentCustomerId**
```js
  axios({
    method: 'GET',
    url: `/v1/paymentcustomerbyuserid/${sys_paymentCustomerId}`,
    data: {
    
    },
    params: {
    
    }
  });
```     
The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`sys_paymentCustomer`** object in the respones. However, some properties may be omitted based on the object's internal logic.



```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_paymentCustomer","method":"GET","action":"get","appVersion":"Version","rowCount":1,"sys_paymentCustomer":{"id":"ID","_owner":"ID","userId":"ID","customerId":"String","platform":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For Get Paymentcustomerbyuserid](businessApi/getPaymentCustomerByUserId).

### List Paymentcustomers API
*API Definition* : This route is used to list all payment customers.

*API Crud Type* : list

*Default access route* : *GET* `/v1/paymentcustomers`

The listPaymentCustomers api has got no parameters.    

To access the api you can use the **REST** controller with the path **GET  /v1/paymentcustomers**
```js
  axios({
    method: 'GET',
    url: '/v1/paymentcustomers',
    data: {
    
    },
    params: {
    
    }
  });
```     
The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`sys_paymentCustomers`** object in the respones. However, some properties may be omitted based on the object's internal logic.



```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_paymentCustomers","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","sys_paymentCustomers":[{"id":"ID","_owner":"ID","userId":"ID","customerId":"String","platform":"String","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For List Paymentcustomers](businessApi/listPaymentCustomers).

### List Paymentcustomermethods API
*API Definition* : This route is used to list all payment customer methods.

*API Crud Type* : list

*Default access route* : *GET* `/v1/paymentcustomermethods`

The listPaymentCustomerMethods api has got no parameters.    

To access the api you can use the **REST** controller with the path **GET  /v1/paymentcustomermethods**
```js
  axios({
    method: 'GET',
    url: '/v1/paymentcustomermethods',
    data: {
    
    },
    params: {
    
    }
  });
```     
The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`sys_paymentMethods`** object in the respones. However, some properties may be omitted based on the object's internal logic.



```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"sys_paymentMethods","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","sys_paymentMethods":[{"id":"ID","_owner":"ID","paymentMethodId":"String","userId":"ID","customerId":"String","cardHolderName":"String","cardHolderZip":"String","platform":"String","cardInfo":"Object","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For List Paymentcustomermethods](businessApi/listPaymentCustomerMethods).




### Authentication Specific Routes



### Common Routes

### Route: currentuser

*Route Definition*: Retrieves the currently authenticated user's session information.

*Route Type*: sessionInfo

*Access Route*: `GET /currentuser`

#### Parameters

This route does **not** require any request parameters.

#### Behavior

- Returns the authenticated session object associated with the current access token.
- If no valid session exists, responds with a 401 Unauthorized.

```js
// Sample GET /currentuser call
axios.get("/currentuser", {
  headers: {
    "Authorization": "Bearer your-jwt-token"
  }
});
```
**Success Response**
Returns the session object, including user-related data and token information.
```
{
  "sessionId": "9cf23fa8-07d4-4e7c-80a6-ec6d6ac96bb9",
  "userId": "d92b9d4c-9b1e-4e95-842e-3fb9c8c1df38",
  "email": "user@example.com",
  "fullname": "John Doe",
  "roleId": "user",
  "tenantId": "abc123",
  "accessToken": "jwt-token-string",
  ...
}
```
**Error Response**
**401 Unauthorized:** No active session found.
```
{
  "status": "ERR",
  "message": "No login found"
}
```

**Notes**
* This route is typically used by frontend or mobile applications to fetch the current session state after login.
* The returned session includes key user identity fields, tenant information (if applicable), and the access token for further authenticated requests.
* Always ensure a valid access token is provided in the request to retrieve the session.

### Route: permissions

`*Route Definition*`: Retrieves all effective permission records assigned to the currently authenticated user.

`*Route Type*`: permissionFetch

*Access Route*: `GET /permissions`

#### Parameters

This route does **not** require any request parameters.

#### Behavior

- Fetches all active permission records (`givenPermissions` entries) associated with the current user session.
- Returns a full array of permission objects.
- Requires a valid session (`access token`) to be available.

```js
// Sample GET /permissions call
axios.get("/permissions", {
  headers: {
    "Authorization": "Bearer your-jwt-token"
  }
});
```
**Success Response**

Returns an array of permission objects.
```json
[
  {
    "id": "perm1",
    "permissionName": "adminPanel.access",
    "roleId": "admin",
    "subjectUserId": "d92b9d4c-9b1e-4e95-842e-3fb9c8c1df38",
    "subjectUserGroupId": null,
    "objectId": null,
    "canDo": true,
    "tenantCodename": "store123"
  },
  {
    "id": "perm2",
    "permissionName": "orders.manage",
    "roleId": null,
    "subjectUserId": "d92b9d4c-9b1e-4e95-842e-3fb9c8c1df38",
    "subjectUserGroupId": null,
    "objectId": null,
    "canDo": true,
    "tenantCodename": "store123"
  }
]
```
Each object reflects a single permission grant, aligned with the givenPermissions model:

- `**permissionName**`: The permission the user has.
- `**roleId**`: If the permission was granted through a role.
-` **subjectUserId**`: If directly granted to the user.
- `**subjectUserGroupId**`: If granted through a group.
- `**objectId**`: If tied to a specific object (OBAC).
- `**canDo**`: True or false flag to represent if permission is active or restricted.

**Error Responses**
* **401 Unauthorized**: No active session found.
```json
{
  "status": "ERR",
  "message": "No login found"
}
```
* **500 Internal Server Error**: Unexpected error fetching permissions.

**Notes**
* The /permissions route is available across all backend services generated by Mindbricks, not just the auth service.
* Auth service: Fetches permissions freshly from the live database (givenPermissions table).
* Other services: Typically use a cached or projected view of permissions stored in a common ElasticSearch store, optimized for faster authorization checks.

> **Tip**:
> Applications can cache permission results client-side or server-side, but should occasionally refresh by calling this endpoint, especially after login or permission-changing operations.

### Route: permissions/:permissionName

*Route Definition*: Checks whether the current user has access to a specific permission, and provides a list of scoped object exceptions or inclusions.

*Route Type*: permissionScopeCheck

*Access Route*: `GET /permissions/:permissionName`

#### Parameters

| Parameter         | Type   | Required | Population             |
|------------------|--------|----------|------------------------|
| permissionName   | String | Yes      | `request.params.permissionName` |

#### Behavior

- Evaluates whether the current user **has access** to the given `permissionName`.
- Returns a structured object indicating:
  - Whether the permission is generally granted (`canDo`)
  - Which object IDs are explicitly included or excluded from access (`exceptions`)
- Requires a valid session (`access token`).

```js
// Sample GET /permissions/orders.manage
axios.get("/permissions/orders.manage", {
  headers: {
    "Authorization": "Bearer your-jwt-token"
  }
});
```

**Success Response**

```json
{
  "canDo": true,
  "exceptions": [
    "a1f2e3d4-xxxx-yyyy-zzzz-object1",
    "b2c3d4e5-xxxx-yyyy-zzzz-object2"
  ]
}
```

* If `canDo` is `true`, the user generally has the permission, but not for the objects listed in `exceptions` (i.e., restrictions).
* If `canDo` is `false`, the user does not have the permission by default — but only for the objects in `exceptions`, they do have permission (i.e., selective overrides).
* The exceptions array contains valid **UUID strings**, each corresponding to an object ID (typically from the data model targeted by the permission).

## Copyright
All sources, documents and other digital materials are copyright of .

## About Us
For more information please visit our website: .

.
.
