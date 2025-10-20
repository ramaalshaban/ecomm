 

# REST API GUIDE 
## ecomm-auth-service

Authentication service for the project

## Architectural Design Credit and Contact Information

The architectural design of this microservice is credited to . 
For inquiries, feedback, or further information regarding the architecture, please direct your communication to:

Email: 

We encourage open communication and welcome any questions or discussions related to the architectural aspects of this microservice.

## Documentation Scope

Welcome to the official documentation for the Auth Service's REST API. This document is designed to provide a comprehensive guide to interfacing with our Auth Service exclusively through RESTful API endpoints.

**Intended Audience**

This documentation is intended for developers and integrators who are looking to interact with the Auth Service via HTTP requests for purposes such as creating, updating, deleting and querying Auth objects.

**Overview**

Within these pages, you will find detailed information on how to effectively utilize the REST API, including authentication methods, request and response formats, endpoint descriptions, and examples of common use cases.

Beyond REST
It's important to note that the Auth Service also supports alternative methods of interaction, such as gRPC and messaging via a Message Broker. These communication methods are beyond the scope of this document. For information regarding these protocols, please refer to their respective documentation.

## Authentication And Authorization

To ensure secure access to the Auth service's protected endpoints, a project-wide access token is required. This token serves as the primary method for authenticating requests to our service. However, it's important to note that access control varies across different routes:

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
This section outlines the API endpoints available within the Auth service. Each endpoint can receive parameters through various methods, meticulously described in the following definitions. It's important to understand the flexibility in how parameters can be included in requests to effectively interact with the Auth service.

This service is configured to listen for HTTP requests on port `3011`, 
serving both the main API interface and default administrative endpoints.

The following routes are available by default:

* **API Test Interface (API Face):** `/`
* **Swagger Documentation:** `/swagger`
* **Postman Collection Download:** `/getPostmanCollection`
* **Health Checks:** `/health` and `/admin/health`
* **Current Session Info:** `/currentuser`
* **Favicon:** `/favicon.ico`

This service is accessible via the following environment-specific URLs:

* **Preview:** `https://ecomm.prw.mindbricks.com/auth-api`
* **Staging:** `https://ecomm-stage.mindbricks.co/auth-api`
* **Production:** `https://ecomm.mindbricks.co/auth-api`

**Parameter Inclusion Methods:**
Parameters can be incorporated into API requests in several ways, each with its designated location. Understanding these methods is crucial for correctly constructing your requests:

**Query Parameters:** Included directly in the URL's query string.

**Path Parameters:** Embedded within the URL's path.

**Body Parameters:** Sent within the JSON body of the request.

**Session Parameters:** Automatically read from the session object. This method is used for parameters that are intrinsic to the user's session, such as userId. When using an API that involves session parameters, you can omit these from your request. The service will automatically bind them to the API layer, provided that a session is associated with your request.

**Note on Session Parameters:**
Session parameters represent a unique method of parameter inclusion, relying on the context of the user's session. A common example of a session parameter is userId, which the service automatically associates with your request when a session exists. This feature ensures seamless integration of user-specific data without manual input for each request.

By adhering to the specified parameter inclusion methods, you can effectively utilize the Auth service's API endpoints. For detailed information on each endpoint, including required parameters and their accepted locations, refer to the individual API definitions below.

### Common Parameters

The `Auth` service's business API support several common parameters designed to modify and enhance the behavior of API requests. These parameters are not individually listed in the API route definitions to avoid repetition. Instead, refer to this section to understand how to leverage these common behaviors across different routes. Note that all common parameters should be included in the query part of the URL.

### Supported Common Parameters:

- **getJoins (BOOLEAN)**: Controls whether to retrieve associated objects along with the main object. By default, `getJoins` is assumed to be `true`. Set it to `false` if you prefer to receive only the main fields of an object, excluding its associations.

- **excludeCQRS (BOOLEAN)**: Applicable only when `getJoins` is `true`. By default, `excludeCQRS` is set to `false`. Enabling this parameter (`true`) omits non-local associations, which are typically more resource-intensive as they require querying external services like ElasticSearch for additional information. Use this to optimize response times and resource usage.

- **requestId (String)**: Identifies a request to enable tracking through the service's log chain. A random hex string of 32 characters is assigned by default. If you wish to use a custom `requestId`, simply include it in your query parameters.

- **caching (BOOLEAN)**: Determines the use of caching for query API. By default, caching is enabled (`true`). To ensure the freshest data directly from the database, set this parameter to `false`, bypassing the cache.

- **cacheTTL (Integer)**: Specifies the Time-To-Live (TTL) for query caching, in seconds. This is particularly useful for adjusting the default caching duration (5 minutes) for `get list` queries. Setting a custom `cacheTTL` allows you to fine-tune the cache lifespan to meet your needs.

- **pageNumber (Integer)**: For paginated `get list` API's, this parameter selects which page of results to retrieve. The default is `1`, indicating the first page. To disable pagination and retrieve all results, set `pageNumber` to `0`.

- **pageRowCount (Integer)**: In conjunction with paginated API's, this parameter defines the number of records per page. The default value is `25`. Adjusting `pageRowCount` allows you to control the volume of data returned in a single request.

By utilizing these common parameters, you can tailor the behavior of API requests to suit your specific requirements, ensuring optimal performance and usability of the `Auth` service.


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

When the `Auth` service processes requests successfully, it wraps the requested resource(s) within a JSON envelope. This envelope not only contains the data but also includes essential metadata, such as configuration details and pagination information, to enrich the response and provide context to the client.

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
Auth service provides the following resources which are stored in its own database as a data object. Note that a resource for an api access is a data object for the service.

### User resource

*Resource Definition* : A data object that stores the user information and handles login settings.
*User Resource Properties* 
| Name | Type | Required | Default | Definition | 
| ---- | ---- | -------- | ------- | ---------- |
| **email** | String |  |  | * A string value to represent the user&#39;s email.* |
| **password** | String |  |  | * A string value to represent the user&#39;s password. It will be stored as hashed.* |
| **fullname** | String |  |  | *A string value to represent the fullname of the user* |
| **avatar** | String |  |  | *The avatar url of the user. A random avatar will be generated if not provided* |
| **roleId** | String |  |  | *A string value to represent the roleId of the user.* |
| **emailVerified** | Boolean |  |  | *A boolean value to represent the email verification status of the user.* |
## Business Api
### Get User API
*API Definition* : This api is used by admin roles or the users themselves to get the user profile information.

*API Crud Type* : get

*Default access route* : *GET* `/v1/users/:userId`

####  Parameters
The getUser api has got 1 parameter  

| Parameter              | Type                   | Required | Population                   |
| ---------------------- | ---------------------- | -------- | ---------------------------- |
| userId  | ID  | true | request.params?.userId |

To access the api you can use the **REST** controller with the path **GET  /v1/users/:userId**
```js
  axios({
    method: 'GET',
    url: `/v1/users/${userId}`,
    data: {
    
    },
    params: {
    
    }
  });
```     
The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`user`** object in the respones. However, some properties may be omitted based on the object's internal logic.



```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"user","method":"GET","action":"get","appVersion":"Version","rowCount":1,"user":{"id":"ID","_owner":"ID","email":"String","password":"String","fullname":"String","avatar":"String","roleId":"String","emailVerified":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For Get User](businessApi/getUser).

### Update User API
*API Definition* : This route is used by users to update their profiles.

*API Crud Type* : update

*Default access route* : *PATCH* `/v1/users/:userId`

####  Parameters
The updateUser api has got 3 parameters  

| Parameter              | Type                   | Required | Population                   |
| ---------------------- | ---------------------- | -------- | ---------------------------- |
| userId  | ID  | true | request.params?.userId |
| fullname  | String  | false | request.body?.fullname |
| avatar  | String  | false | request.body?.avatar |

To access the api you can use the **REST** controller with the path **PATCH  /v1/users/:userId**
```js
  axios({
    method: 'PATCH',
    url: `/v1/users/${userId}`,
    data: {
            fullname:"String",  
            avatar:"String",  
    
    },
    params: {
    
    }
  });
```     
The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`user`** object in the respones. However, some properties may be omitted based on the object's internal logic.



```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"user","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"user":{"id":"ID","_owner":"ID","email":"String","password":"String","fullname":"String","avatar":"String","roleId":"String","emailVerified":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For Update User](businessApi/updateUser).

### Register User API
*API Definition* : This api is used by public users to register themselves

*API Crud Type* : create

*Default access route* : *POST* `/v1/registeruser`

####  Parameters
The registerUser api has got 4 parameters  

| Parameter              | Type                   | Required | Population                   |
| ---------------------- | ---------------------- | -------- | ---------------------------- |
| avatar  | String  | false | request.body?.avatar |
| password  | String  | true | request.body?.password |
| fullname  | String  | true | request.body?.fullname |
| email  | String  | true | request.body?.email |

To access the api you can use the **REST** controller with the path **POST  /v1/registeruser**
```js
  axios({
    method: 'POST',
    url: '/v1/registeruser',
    data: {
            avatar:"String",  
            password:"String",  
            fullname:"String",  
            email:"String",  
    
    },
    params: {
    
    }
  });
```     
The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`user`** object in the respones. However, some properties may be omitted based on the object's internal logic.



```json
{"status":"OK","statusCode":"201","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"user","method":"POST","action":"create","appVersion":"Version","rowCount":1,"user":{"id":"ID","_owner":"ID","email":"String","password":"String","fullname":"String","avatar":"String","roleId":"String","emailVerified":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For Register User](businessApi/registerUser).

### Delete User API
*API Definition* : This api is used by users to delete their profiles.

*API Crud Type* : delete

*Default access route* : *DELETE* `/v1/users/:userId`

####  Parameters
The deleteUser api has got 1 parameter  

| Parameter              | Type                   | Required | Population                   |
| ---------------------- | ---------------------- | -------- | ---------------------------- |
| userId  | ID  | true | request.params?.userId |

To access the api you can use the **REST** controller with the path **DELETE  /v1/users/:userId**
```js
  axios({
    method: 'DELETE',
    url: `/v1/users/${userId}`,
    data: {
    
    },
    params: {
    
    }
  });
```     
The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`user`** object in the respones. However, some properties may be omitted based on the object's internal logic.



```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"user","method":"DELETE","action":"delete","appVersion":"Version","rowCount":1,"user":{"id":"ID","_owner":"ID","email":"String","password":"String","fullname":"String","avatar":"String","roleId":"String","emailVerified":"Boolean","isActive":false,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For Delete User](businessApi/deleteUser).

### List Users API


*API Crud Type* : list

*Default access route* : *GET* `/v1/users`

The listUsers api has got no parameters.    

To access the api you can use the **REST** controller with the path **GET  /v1/users**
```js
  axios({
    method: 'GET',
    url: '/v1/users',
    data: {
    
    },
    params: {
    
    }
  });
```     
The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`users`** object in the respones. However, some properties may be omitted based on the object's internal logic.



```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"users","method":"GET","action":"list","appVersion":"Version","rowCount":"\"Number\"","users":[{"id":"ID","_owner":"ID","email":"String","password":"String","fullname":"String","avatar":"String","roleId":"String","emailVerified":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"},{},{}],"paging":{"pageNumber":"Number","pageRowCount":"NUmber","totalRowCount":"Number","pageCount":"Number"},"filters":[],"uiPermissions":[]}
```  

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For List Users](businessApi/listUsers).

### Update Userrole API
*API Definition* : This route is used by admin roles to update the user role.The default role is user when a user is registered. A user&#39;s role can be updated by superAdmin or admin

*API Crud Type* : update

*Default access route* : *PATCH* `/v1/userrole/:userId`

####  Parameters
The updateUserRole api has got 2 parameters  

| Parameter              | Type                   | Required | Population                   |
| ---------------------- | ---------------------- | -------- | ---------------------------- |
| userId  | ID  | true | request.params?.userId |
| roleId  | String  | true | request.body?.roleId |

To access the api you can use the **REST** controller with the path **PATCH  /v1/userrole/:userId**
```js
  axios({
    method: 'PATCH',
    url: `/v1/userrole/${userId}`,
    data: {
            roleId:"String",  
    
    },
    params: {
    
    }
  });
```     
The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`user`** object in the respones. However, some properties may be omitted based on the object's internal logic.



```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"user","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"user":{"id":"ID","_owner":"ID","email":"String","password":"String","fullname":"String","avatar":"String","roleId":"String","emailVerified":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For Update Userrole](businessApi/updateUserRole).

### Update Userpassword API
*API Definition* : This route is used to to force the password update by old password.

*API Crud Type* : update

*Default access route* : *PATCH* `/v1/userpassword/:userId`

####  Parameters
The updateUserPassword api has got 3 parameters  

| Parameter              | Type                   | Required | Population                   |
| ---------------------- | ---------------------- | -------- | ---------------------------- |
| userId  | ID  | true | request.params?.userId |
| oldPassword  | String  | true | request.body?.oldPassword |
| newPassword  | String  | true | request.body?.newPassword |

To access the api you can use the **REST** controller with the path **PATCH  /v1/userpassword/:userId**
```js
  axios({
    method: 'PATCH',
    url: `/v1/userpassword/${userId}`,
    data: {
            oldPassword:"String",  
            newPassword:"String",  
    
    },
    params: {
    
    }
  });
```     
The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`user`** object in the respones. However, some properties may be omitted based on the object's internal logic.



```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"user","method":"PATCH","action":"update","appVersion":"Version","rowCount":1,"user":{"id":"ID","_owner":"ID","email":"String","password":"String","fullname":"String","avatar":"String","roleId":"String","emailVerified":"Boolean","isActive":true,"recordVersion":"Integer","createdAt":"Date","updatedAt":"Date"}}
```  

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For Update Userpassword](businessApi/updateUserPassword).

### Get Briefuser API
*API Definition* : This route is used by public to get simple user profile information.

*API Crud Type* : get

*Default access route* : *GET* `/v1/briefuser/:userId`

####  Parameters
The getBriefUser api has got 1 parameter  

| Parameter              | Type                   | Required | Population                   |
| ---------------------- | ---------------------- | -------- | ---------------------------- |
| userId  | ID  | true | request.params?.userId |

To access the api you can use the **REST** controller with the path **GET  /v1/briefuser/:userId**
```js
  axios({
    method: 'GET',
    url: `/v1/briefuser/${userId}`,
    data: {
    
    },
    params: {
    
    }
  });
```     
The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, list, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`user`** object in the respones. However, some properties may be omitted based on the object's internal logic.

This route's response is constrained to a select list of properties, and therefore does not encompass all attributes of the resource.



```json
{"status":"OK","statusCode":"200","elapsedMs":126,"ssoTime":120,"source":"db","cacheKey":"hexCode","userId":"ID","sessionId":"ID","requestId":"ID","dataName":"user","method":"GET","action":"get","appVersion":"Version","rowCount":1,"user":{"id":"ID","_owner":"ID","fullname":"String","avatar":"String","isActive":true}}
```  

> For a detailed description of the `` api with its internal and inter-service logic please refer to the [Business API Specification Document For Get Briefuser](businessApi/getBriefUser).




### Authentication Specific Routes


  ### Route: login

  *Route Definition*: Handles the login process by verifying user credentials and generating an authenticated session.
  
  *Route Type*: login
  
  *Access Routes*:
  - `GET /login`: Returns the HTML login page
  (not a frontend module, typically used in browser-based contexts for test purpose to make sending POST /login easier).
  - `POST /login`: Accepts credentials, verifies the user, creates a session, and returns a JWT access token.
  
  #### Parameters
  
  | Parameter   | Type     | Required | Population                  |
  |-------------|----------|----------|-----------------------------|
  | username    | String   | Yes      | `request.body.username`     |
  | password    | String   | Yes      | `request.body.password`     |
  
  #### Notes
  
  - This route accepts login credentials and creates an authenticated session if credentials are valid.
  - On success, the response will:
    - Set a cookie named `projectname-access-token[-tenantCodename]` with the JWT token.
    - Include the token in the response headers under the same name.
    - Return the full `session` object in the JSON body.
    - Note that `username` parameter should have the email of the user as value.
    You can also send an `email` parameter instead of `username` parameter. 
    If both sent only `username` parameter will be read.
  
  ```js
  // Sample POST /login call
  axios.post("/login", {
    username: "user@example.com",
    password: "securePassword"
  });
  ```
  
  **Success Response**
  
  Returns the authenticated session object with a status code `200 OK`.
  
  A secure HTTP-only cookie and an access token header are included in the response.
  
  ```json
  {
    "userId": "d92b9d4c-9b1e-4e95-842e-3fb9c8c1df38",
    "email": "user@example.com",
    "fullname": "John Doe",
    ...
  }
  ```
  
  **Error Responses**
  * **401 Unauthorized:** Invalid username or password.
  * **403 Forbidden:** Login attempt rejected due to pending email/mobile verification or 2FA requirements.
  * **400 Bad Request:** Missing credentials in the request.
  
  ### Route: logout
  
  *Route Definition*: Logs the user out by terminating the current session and clearing the access token.
  
  *Route Type*: logout
  
  *Access Route*: `POST /logout`
  
  #### Parameters
  
  This route does not require any parameters in the body or query.
  
  #### Behavior
  
  - Invalidates the current session on the server (if stored).
  - Clears the access token cookie (`projectname-access-token[-tenantCodename]`) from the client.
  - Responds with a 200 status and a simple confirmation object.
  
  ```js
  // Sample POST /logout call
  axios.post("/logout", {}, {
    headers: {
      "Authorization": "Bearer your-jwt-token"
    }
  });
  ```
  
  **Notes**
  * This route is public, meaning it can be called without a session or token.
  * If the session is active, the server will clear associated session state and cookies.
  * The logout behavior may vary slightly depending on whether you're using cookie-based or header-based token management.
  
  **Error Responses**
  00200 OK:** Always returned, regardless of whether a session existed.
  Logout is treated as idempotent.
  
  ### Route: publickey
  
  *Route Definition*: Returns the public RSA key used to verify JWT access tokens issued by the auth service.
  
  *Route Type*: publicKeyFetch
  
  *Access Route*: `GET /publickey`
  
  #### Parameters
  
  | Parameter | Type   | Required | Population         |
  |-----------|--------|----------|--------------------|
  | keyId     | String | No       | `request.query.keyId` |
  
  - `keyId` is optional.  
    If provided, retrieves the public key corresponding to the specific `keyId`.  
    If omitted, retrieves the current active public key (`global.currentKeyId`).
  
  #### Behavior
  
  - Reads the requested RSA public key file from the server filesystem.
  - If the key exists, returns it along with its `keyId`.
  - If the key does not exist, returns a 404 error.
  
  ```js
  // Sample GET /publickey call
  axios.get("/publickey", {
    params: {
      keyId: "currentKeyIdOptional"
    }
  });
  ```
  
  **Success Response**
  Returns the active public key and its associated keyId.
  ```json
  {
      "keyId": "a1b2c3d4",
      "keyData": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhki...\n-----END PUBLIC KEY-----"
  }
  ````
  **Error Responses**
  **404 Not Found:** Public key file could not be found on the server.
  
  ### Token Key Management
  
  Mindbricks uses RSA key pairs to sign and verify JWT access tokens securely.  
  While the auth service signs each token with a private key, other services within the system — or external clients — need the corresponding **public key** to verify the authenticity and integrity of received tokens.
  
  The `/publickey` endpoint allows services and clients to dynamically fetch the currently active public key, ensuring that token verification remains secure even if key rotation is performed.
  
  > **Note**:  
  > The `/publickey` route is not intended for direct frontend (browser) consumption.  
  > Instead, it is primarily used by trusted backend services, APIs, or middleware systems that need to independently verify access tokens issued by the auth service — without making verification-dependent API calls to the auth service itself.
  
  Accessing the public key is crucial for validating user sessions efficiently and maintaining a decentralized trust model across your platform.
  
  ### Route: linksession
  
  *Route Definition*: Allows manually linking an access token to a browser session by setting it as an HTTP-only cookie.
  
  *Route Type*: devUtility
  
  *Access Route*: `GET /linksession?token=ACCESS_TOKEN`
  
  #### Parameters
  
  | Parameter | Type   | Required | Description                          |
  |-----------|--------|----------|--------------------------------------|
  | token     | String | Yes      | A valid access token (JWT) to link to the session |
  
  #### Behavior
  
  - Accepts a valid access token (`token`) via query string.
  - Writes the token to a secure HTTP-only cookie on the response.
  - Enables the browser to use this token automatically for subsequent API requests (like `/currentuser` or any protected route).
  - Returns basic info confirming the operation.
  
  ```js
  // Sample usage (e.g., in dev/test environment)
  axios.get("/linksession?token=your-access-token");
  ```
  **Success Response**
  
  ```json
  {
    "cookieName": "myapp-access-token",
    "accessToken": "your-access-token",
    "domain": "your-api-domain.com",
    "currentuser": "https://your-api-domain.com/currentuser"
  }
  
  ```
  
  **Error Responses**
  * **401 Unauthorized**: Malformed request or internal error.
  
  ```json
  {
    "status": "ERR",
    "message": "Invalid or missing token"
  }
  ```
  
  **Notes**
  
  - Use case: This route is designed primarily for test and development purposes.
  - It enables developers to paste or pass a token into the browser and simulate an authenticated session using cookie-based access.
  - After calling /linksession, you can immediately query /currentuser or any secured endpoint from the same browser session.
  
  > ⚠️ This route is disabled in production environments, as it provides manual token injection via query parameters.
  
  ### Route: relogin
  
  *Route Definition*: Performs a silent login by verifying the current access token, refreshing the session, and returning a new access token along with updated user information.
  
  *Route Type*: sessionRefresh
  
  *Access Route*: `GET /relogin`
  
  #### Parameters
  
  This route does **not** require any request parameters.
  
  #### Behavior
  
  - Validates the access token associated with the request.
  - If the token is valid:
    - Re-authenticates the user using the session's user ID.
    - Fetches the most up-to-date user information from the database.
    - Generates a new session object with a **new session ID** and **new access token**.
  - If the token is invalid or missing, returns a 401 Unauthorized error.
  
  ```js
  // Example call to refresh session
  axios.get("/relogin", {
    headers: {
      "Authorization": "Bearer your-jwt-token"
    }
  });
  ```
  **Success Response**
  Returns a new session object, refreshed from database data.
  ```json
  {
    "sessionId": "new-session-uuid",
    "userId": "user-uuid",
    "email": "user@example.com",
    "roleId": "admin",
    "accessToken": "new-jwt-token",
    ...
  }
  ```
  **Error Responses**
  * **401 Unauthorized**: Token is missing, invalid, or session cannot be re-established.
  ```json
  {
    "status": "ERR",
    "message": "Cannot relogin"
  }
  ```
  
  **Notes**
  
  - The `/relogin` route is commonly used for **silent login flows**, especially after page reloads or token-based auto-login mechanisms.
  - It triggers internal logic (`req.userAuthUpdate = true`) to signal that the session should be re-initialized and repopulated.
  - It is not a simple session lookup — it performs a fresh authentication pass using the session's user context.
  - The refreshed session ensures any updates to user profile, roles, or permissions are immediately reflected.
  
  > **Tip:**
  > This route is ideal when you want to **rebuild a user's session** in the frontend without requiring them to manually log in again.
  
  ## Verification Services — Email Verification
  
  Email verification is a two-step flow that ensures a user's email address is verified and trusted by the system.
  
  All verification services, including email verification, are located under the `/verification-services` base path.
  
  ### When is Email Verification Triggered?
  
  - After user registration, if `emailVerificationRequiredForLogin` is active.
  - During a separate user action to verify or update email addresses.
  - When login fails with `EmailVerificationNeeded` and frontend initiates verification.
  
  ### Email Verification Flow
  
  1. **Frontend calls `/verification-services/email-verification/start`** with the user's email address.
     - Mindbricks checks if the email is already verified.
     - A secret code is generated and stored in the cache linked to the user.
     - The code is sent to the user's email or returned in the response (only in development environments for easier testing).
  2. **User receives the code and enters it into the frontend application.**
  3. **Frontend calls `/verification-services/email-verification/complete`** with the `email` and the received `secretCode`.
     - Mindbricks checks that the code is valid, not expired, and matches.
     - If valid, the user’s `emailVerified` flag is set to `true`, and a success response is returned.
  
  ---
  
  ## API Endpoints
  
  ### POST `/verification-services/email-verification/start`
  
  **Purpose**  
  Starts the email verification process by generating and sending a secret verification code.
  
  #### Request Body
  
  | Parameter | Type   | Required | Description                 |
  |-----------|--------|----------|-----------------------------|
  | email     | String | Yes      | The email address to verify |
  
  ```json
  {
    "email": "user@example.com"
  }
  ```
  
  #### Success Response
  
  Secret code details (in development environment). Confirms that the verification step has been started.
  
  ```json
  {
    "userId": "user-uuid",
    "email": "user@example.com",
    "secretCode": "123456",
    "expireTime": 86400,
    "date": "2024-04-29T10:00:00.000Z"
  }
  ```
  
  > ⚠️ In production, the secret code is only sent via email, not exposed in the API response.
  
  #### Error Responses
  
  - `400 Bad Request`: Email already verified.
  - `403 Forbidden`: Sending a code too frequently (anti-spam).
  
  ---
  
  ### POST `/verification-services/email-verification/complete`
  
  **Purpose**  
  Completes the email verification by validating the secret code.
  
  #### Request Body
  
  | Parameter   | Type   | Required | Description                         |
  |-------------|--------|----------|-------------------------------------|
  | email       | String | Yes      | The user email being verified       |
  | secretCode  | String | Yes      | The secret code received via email  |
  
  ```json
  {
    "email": "user@example.com",
    "secretCode": "123456"
  }
  ```
  
  #### Success Response
  
  Returns confirmation that the email has been verified.
  
  ```json
  {
    "userId": "user-uuid",
    "email": "user@example.com",
    "isVerified": true
  }
  ```
  
  #### Error Responses
  
  - `403 Forbidden`:
    - Secret code mismatch
    - Secret code expired
    - No ongoing verification found
  
  ---
  
  ## Important Behavioral Notes
  
  ### Resend Throttling  
  You can only request a new verification code after a cooldown period (`resendTimeWindow`, e.g., 60 seconds).
  
  ### Expiration Handling  
  Verification codes expire after a configured period (`expireTimeWindow`, e.g., 1 day).
  
  ### One Code Per Session  
  Only one active verification session per user is allowed at a time.
  
  > 💡 Mindbricks automatically manages spam prevention, session caching, expiration, and event broadcasting (start/complete events) for all verification steps.
  
  ## Verification Services — Mobile Verification
  
  Mobile verification is a two-step flow that ensures a user's mobile number is verified and trusted by the system.
  
  All verification services, including mobile verification, are located under the `/verification-services` base path.
  
  ### When is Mobile Verification Triggered?
  
  - After user registration, if `mobileVerificationRequiredForLogin` is active.
  - During a separate user action to verify or update mobile numbers.
  - When login fails with `MobileVerificationNeeded` and frontend initiates verification.
  
  ### Mobile Verification Flow
  
  1. **Frontend calls `/verification-services/mobile-verification/start`** with the user's email address (used to locate the user).
     - Mindbricks checks if the mobile number is already verified.
     - A secret code is generated and stored in the cache linked to the user.
     - The code is sent to the user's mobile via SMS or returned in the response (only in development environments for easier testing).
  2. **User receives the code and enters it into the frontend application.**
  3. **Frontend calls `/verification-services/mobile-verification/complete`** with the `email` and the received `secretCode`.
     - Mindbricks checks that the code is valid, not expired, and matches.
     - If valid, the user’s `mobileVerified` flag is set to `true`, and a success response is returned.
  
  ---
  
  ## API Endpoints
  
  ### POST `/verification-services/mobile-verification/start`
  
  **Purpose**:  
  Starts the mobile verification process by generating and sending a secret verification code.
  
  #### Request Body
  
  | Parameter | Type   | Required | Description                         |
  |-----------|--------|----------|-------------------------------------|
  | email     | String | Yes      | The email address associated with the mobile number to verify         |
  
  ```json
  {
    "email": "user@example.com"
  }
  ```
  
  **Success Response**  
  Secret code details (in development environment). Confirms that the verification step has been started.
  
  ```json
  {
    "userId": "user-uuid",
    "mobile": "+15551234567",
    "secretCode": "123456",
    "expireTime": 86400,
    "date": "2024-04-29T10:00:00.000Z"
  }
  ```
  
  ⚠️ In production, the secret code is only sent via SMS, not exposed in the API response.
  
  **Error Responses**  
  - 400 Bad Request: Mobile already verified.  
  - 403 Forbidden: Sending a code too frequently (anti-spam).
  
  ---
  
  ### POST `/verification-services/mobile-verification/complete`
  
  **Purpose**:  
  Completes the mobile verification by validating the secret code.
  
  #### Request Body
  
  | Parameter   | Type   | Required | Description                        |
  |-------------|--------|----------|------------------------------------|
  | email       | String | Yes      | The user's email being verified    |
  | secretCode  | String | Yes      | The secret code received via SMS   |
  
  ```json
  {
    "email": "user@example.com",
    "secretCode": "123456"
  }
  ```
  
  **Success Response**  
  Returns confirmation that the mobile number has been verified.
  
  ```json
  {
    "userId": "user-uuid",
    "mobile": "+15551234567",
    "isVerified": true
  }
  ```
  
  **Error Responses**  
  403 Forbidden:
  - Secret code mismatch  
  - Secret code expired  
  - No ongoing verification found
  
  ---
  
  ## Important Behavioral Notes
  
  **Resend Throttling**:  
  You can only request a new verification code after a cooldown period (`resendTimeWindow`, e.g., 60 seconds).
  
  **Expiration Handling**:  
  Verification codes expire after a configured period (`expireTimeWindow`, e.g., 1 day).
  
  **One Code Per Session**:  
  Only one active verification session per user is allowed at a time.
  
  💡 Mindbricks automatically manages spam prevention, session caching, expiration, and event broadcasting (start/complete events) for all verification steps.
  
  ## Verification Services — Email 2FA Verification
  
  Email 2FA (Two-Factor Authentication) provides an additional layer of security by requiring users to confirm their identity using a secret code sent to their email address. This process is used in login flows or sensitive actions that need extra verification.
  
  All verification services, including 2FA, are located under the `/verification-services` base path.
  
  ### When is Email 2FA Triggered?
  
  - During login flows where `sessionNeedsEmail2FA` is `true`
  - When the backend enforces two-factor authentication for a sensitive operation
  
  ### Email 2FA Flow
  
  1. **Frontend calls `/verification-services/email-2factor-verification/start`** with the user's id, session id, client info, and reason.
     - Mindbricks identifies the user and checks if a cooldown period applies.
     - A new secret code is generated and stored, linked to the current session ID.
     - The code is sent via email or returned in development environments.
  2. **User receives the code and enters it into the frontend application.**
  3. **Frontend calls `/verification-services/email-2factor-verification/complete`** with the `userId`, `sessionId`, and the `secretCode`.
     - Mindbricks verifies the code, validates the session, and updates the session to remove the 2FA requirement.
  
  ---
  
  ## API Endpoints
  
  ### POST `/verification-services/email-2factor-verification/start`
  
  **Purpose**:  
  Starts the email-based 2FA process by generating and sending a verification code.
  
  #### Request Body
  
  | Parameter | Type   | Required | Description                                   |
  |-----------|--------|----------|-----------------------------------------------|
  | userId    | String | Yes      | The user’s ID                                 |
  | sessionId | String | Yes      | The current session ID                        |
  | client    | String | No       | Optional client tag or context                |
  | reason    | String | No       | Optional reason for triggering 2FA            |
  
  ```json
  {
    "userId": "user-uuid",
    "sessionId": "session-uuid",
    "client": "login-page",
    "reason": "Login requires email 2FA"
  }
  ```
  
  #### Success Response
  
  ```json
  {
    "sessionId": "session-uuid",
    "userId": "user-uuid",
    "email": "user@example.com",
    "secretCode": "123456",
    "expireTime": 300,
    "date": "2024-04-29T10:00:00.000Z"
  }
  ```
  
  ⚠️ In production, the `secretCode` is only sent via email, not exposed in the API response.
  
  #### Error Responses
  
  - **403 Forbidden**: Sending a code too frequently (anti-spam)
  - **401 Unauthorized**: User session not found
  
  ---
  
  ### POST `/verification-services/email-2factor-verification/complete`
  
  **Purpose**:  
  Completes the email 2FA process by validating the secret code and session.
  
  #### Request Body
  
  | Parameter   | Type   | Required | Description                                      |
  |-------------|--------|----------|--------------------------------------------------|
  | userId      | String | Yes      | The user’s ID                                    |
  | sessionId   | String | Yes      | The session ID the code is tied to              |
  | secretCode  | String | Yes      | The secret code received via email              |
  
  ```json
  {
    "userId": "user-uuid",
    "sessionId": "session-uuid",
    "secretCode": "123456"
  }
  ```
  
  #### Success Response
  
  Returns an updated session with 2FA disabled:
  
  ```json
  {
    "sessionId": "session-uuid",
    "userId": "user-uuid",
    "sessionNeedsEmail2FA": false,
    ...
  }
  ```
  
  #### Error Responses
  
  - **403 Forbidden**:  
    - Secret code mismatch  
    - Secret code expired  
    - Verification step not found  
  
  ---
  
  ### Important Behavioral Notes
  
  - **One Code Per Session**: Only one active code can be issued per session.
  - **Resend Throttling**: Code requests are throttled based on `resendTimeWindow` (e.g., 60 seconds).
  - **Expiration**: Codes expire after `expireTimeWindow` (e.g., 5 minutes).
  - 💡 Mindbricks manages session cache, spam control, expiration tracking, and event notifications for all 2FA steps.
  
  ## Verification Services — Mobile 2FA Verification
  
  Mobile 2FA (Two-Factor Authentication) is a security mechanism that adds an extra layer of authentication using a user's verified mobile number.
  
  All verification services, including mobile 2FA, are accessible under the `/verification-services` base path.
  
  ### When is Mobile 2FA Triggered?
  
  - During login or critical actions requiring step-up authentication.
  - When the session has a flag `sessionNeedsMobile2FA = true`.
  - When login or session verification fails with `MobileVerificationNeeded`, indicating 2FA is required.
  
  ### Mobile 2FA Verification Flow
  
  1. **Frontend calls `/verification-services/mobile-2factor-verification/start`** with the user's id, session id, client info, and reason.
     - Mindbricks finds the user by id.
     - Verifies that the user has a verified mobile number.
     - A secret code is generated and cached against the session.
     - The code is sent to the user's verified mobile number or returned in the response (only in development environments).
  2. **User receives the code and enters it in the frontend app.**
  3. **Frontend calls `/verification-services/mobile-2factor-verification/complete`** with the `userId`, `sessionId`, and `secretCode`.
     - Mindbricks validates the code for expiration and correctness.
     - If valid, the session flag `sessionNeedsMobile2FA` is cleared.
     - A refreshed session object is returned.
  
  ---
  
  ## API Endpoints
  
  ### POST `/verification-services/mobile-2factor-verification/start`
  
  **Purpose**:  
  Initiates mobile-based 2FA by generating and sending a secret code.
  
  #### Request Body
  
  | Parameter | Type   | Required | Description                                   |
  |-----------|--------|----------|-----------------------------------------------|
  | userId    | String | Yes      | The user’s ID                                 |
  | sessionId | String | Yes      | The current session ID                        |
  | client    | String | No       | Optional client tag or context                |
  | reason    | String | No       | Optional reason for triggering 2FA            |
  
  ```json
  {
    "userId": "user-uuid",
    "sessionId": "session-uuid",
    "client": "login-page",
    "reason": "Login requires mobile 2FA"
  }
  ```
  
  **Success Response**  
  Returns the generated code (only in development), expiration info, and metadata.
  
  ```json
  {
    "userId": "user-uuid",
    "sessionId": "session-uuid",
    "mobile": "+15551234567",
    "secretCode": "654321",
    "expireTime": 300,
    "date": "2024-04-29T11:00:00.000Z"
  }
  ```
  
  ⚠️ In production environments, the secret code is not included in the response and is instead delivered via SMS.
  
  **Error Responses**
  
  - 403 Forbidden: Mobile number not verified.
  - 403 Forbidden: Code resend attempted before cooldown period (`resendTimeWindow`).
  - 401 Unauthorized: Email not recognized or session invalid.
  
  ---
  
  ### POST `/verification-services/mobile-2factor-verification/complete`
  
  **Purpose**:  
  Completes mobile 2FA verification by validating the secret code and updating the session.
  
  #### Request Body
  
  | Parameter   | Type   | Required | Description                         |
  |-------------|--------|----------|-------------------------------------|
  | userId      | String | Yes      | ID of the user                      |
  | sessionId   | String | Yes      | ID of the session                   |
  | secretCode  | String | Yes      | The 6-digit code received via SMS   |
  
  ```json
  {
    "userId": "user-uuid",
    "sessionId": "session-uuid",
    "secretCode": "654321"
  }
  ```
  
  **Success Response**  
  Returns the updated session with `sessionNeedsMobile2FA: false`.
  
  ```json
  {
    "sessionId": "session-uuid",
    "userId": "user-uuid",
    "sessionNeedsMobile2FA": false,
    "accessToken": "jwt-token",
    "expiresIn": 86400
  }
  ```
  
  **Error Responses**
  
  - 403 Forbidden: Code mismatch or expired.
  - 403 Forbidden: No ongoing verification found.
  - 401 Unauthorized: Session does not exist or is invalid.
  
  ---
  
  ### Behavioral Notes
  
  - **Rate Limiting**: A user can only request a new mobile 2FA code after the cooldown period (`resendTimeWindow`, e.g., 60 seconds).
  - **Expiration**: Mobile 2FA codes expire after the configured time (`expireTimeWindow`, e.g., 5 minutes).
  - **Session Integrity**: Verification status is tied to the session; incorrect sessionId will invalidate the attempt.
  
  💡 Mindbricks handles session integrity, rate limiting, and secure code delivery to ensure a robust mobile 2FA process.
  
  ## Verification Services — Password Reset by Email
  
  Password Reset by Email enables a user to securely reset their password using a secret code sent to their registered email address.
  
  All verification services, including password reset by email, are located under the `/verification-services` base path.
  
  ### When is Password Reset by Email Triggered?
  
  - When a user requests to reset their password by providing their email address.
  - This service is typically exposed on a “Forgot Password?” flow in the frontend.
  
  ### Password Reset Flow
  
  1. **Frontend calls `/verification-services/password-reset-by-email/start`** with the user's email.
     - Mindbricks checks if the user exists and if the email is registered.
     - A secret code is generated and stored in the cache linked to the user.
     - The code is sent to the user's email, or returned in the response (in development environments only for testing).
  2. **User receives the code and enters it into the frontend along with the new password.**
  3. **Frontend calls `/verification-services/password-reset-by-email/complete`** with the `email`, the `secretCode`, and the new `password`.
     - Mindbricks checks that the code is valid, not expired, and matches.
     - If valid, the user’s password is reset, their `emailVerified` flag is set to `true`, and a success response is returned.
  
  ---
  
  ## API Endpoints
  
  ### POST `/verification-services/password-reset-by-email/start`
  
  **Purpose**:  
  Starts the password reset process by generating and sending a secret verification code.
  
  #### Request Body
  
  | Parameter | Type   | Required | Description                         |
  |-----------|--------|----------|-------------------------------------|
  | email     | String | Yes      | The email address of the user       |
  
  ```json
  {
    "email": "user@example.com"
  }
  ```
  
  **Success Response**
  
  Returns secret code details (only in development environment) and confirmation that the verification step has been started.
  
  ```json
  {
    "userId": "user-uuid",
    "email": "user@example.com",
    "secretCode": "123456", 
    "expireTime": 86400,
    "date": "2024-04-29T10:00:00.000Z"
  }
  ```
  
  ⚠️ In production, the secret code is only sent via email and not exposed in the API response.
  
  **Error Responses**
  
  - `401 NotAuthenticated`: Email address not found or not associated with a user.
  - `403 Forbidden`: Sending a code too frequently (spam prevention).
  
  ---
  
  ### POST `/verification-services/password-reset-by-email/complete`
  
  **Purpose**:  
  Completes the password reset process by validating the secret code and updating the user's password.
  
  #### Request Body
  
  | Parameter   | Type   | Required | Description                                  |
  |-------------|--------|----------|----------------------------------------------|
  | email       | String | Yes      | The email address of the user                |
  | secretCode  | String | Yes      | The code received via email                  |
  | password    | String | Yes      | The new password the user wants to set       |
  
  ```json
  {
    "email": "user@example.com",
    "secretCode": "123456",
    "password": "newSecurePassword123"
  }
  ```
  
  **Success Response**
  
  ```json
  {
    "userId": "user-uuid",
    "email": "user@example.com",
    "isVerified": true
  }
  ```
  
  **Error Responses**
  
  - `403 Forbidden`:  
    - Secret code mismatch  
    - Secret code expired  
    - No ongoing verification found  
  
  ---
  
  ## Important Behavioral Notes
  
  ### Resend Throttling:
  A new verification code can only be requested after a cooldown period (configured via `resendTimeWindow`, e.g., 60 seconds).
  
  ### Expiration Handling:
  Verification codes automatically expire after a predefined period (`expireTimeWindow`, e.g., 1 day).
  
  ### Session & Event Handling:
  Mindbricks manages:
  - Spam prevention
  - Code caching per user
  - Expiration logic
  - Verification start/complete events
  
  ## Verification Services — Password Reset by Mobile
  
  Password reset by mobile provides users with a secure mechanism to reset their password using a verification code sent via SMS to their registered mobile number.
  
  All verification services, including password reset by mobile, are located under the `/verification-services` base path.
  
  ### When is Password Reset by Mobile Triggered?
  
  - When a user forgets their password and selects the mobile reset option.
  - When a user explicitly initiates password recovery via mobile on the login or help screen.
  
  ### Password Reset by Mobile Flow
  
  1. **Frontend calls `/verification-services/password-reset-by-mobile/start`** with the user's mobile number or associated identifier.
     - Mindbricks checks if a user with the given mobile exists.
     - A secret code is generated and stored in the cache for that user.
     - The code is sent to the user's mobile (or returned in development environments for testing).
  2. **User receives the code via SMS and enters it into the frontend app.**
  3. **Frontend calls `/verification-services/password-reset-by-mobile/complete`** with the user's `email`, the `secretCode`, and the new `password`.
     - Mindbricks validates the secret code and its expiration.
     - If valid, it updates the user's password and returns a success response.
  
  ---
  
  ## API Endpoints
  
  ### POST `/verification-services/password-reset-by-mobile/start`
  
  **Purpose**:  
  Initiates the mobile-based password reset by sending a verification code to the user's mobile.
  
  #### Request Body
  
  | Parameter | Type   | Required | Description                  |
  |-----------|--------|----------|------------------------------|
  | mobile    | String | Yes      | The mobile number to verify  |
  
  ```json
  {
    "mobile": "+905551234567"
  }
  ```
  
  ### Success Response
  
  Returns the verification context (code returned only in development):
  
  ```json
  {
    "userId": "user-uuid",
    "mobile": "+905551234567",
    "secretCode": "123456", 
    "expireTime": 86400,
    "date": "2024-04-29T10:00:00.000Z"
  }
  ```
  
  ⚠️ In production, the `secretCode` is not included in the response and is only sent via SMS.
  
  ### Error Responses
  
  - **400 Bad Request**: Mobile already verified
  - **403 Forbidden**: Rate-limited (code already sent recently)
  - **404 Not Found**: User with provided mobile not found
  
  ---
  
  ### POST `/verification-services/password-reset-by-mobile/complete`
  
  **Purpose**:  
  Finalizes the password reset process by validating the received verification code and updating the user’s password.
  
  #### Request Body
  
  | Parameter   | Type   | Required | Description                                     |
  |-------------|--------|----------|-------------------------------------------------|
  | email       | String | Yes      | The email address of the user                   |
  | secretCode  | String | Yes      | The code received via SMS                       |
  | password    | String | Yes      | The new password to assign                      |
  
  ```json
  {
    "email": "user@example.com",
    "secretCode": "123456",
    "password": "NewSecurePassword123!"
  }
  ```
  
  ### Success Response
  
  ```json
  {
    "userId": "user-uuid",
    "mobile": "+905551234567",
    "isVerified": true
  }
  ```
  
  ---
  
  ### Important Behavioral Notes
  
  - **Throttling**: Codes can only be resent after a delay defined by `resendTimeWindow` (e.g., 60 seconds).
  - **Expiration**: Codes expire after the `expireTimeWindow` (e.g., 1 day).
  - **One Active Session**: Only one active password reset session is allowed per user at a time.
  - **Session-less**: This flow does not require an active session — it works for unauthenticated users.
  
  💡 Mindbricks handles spam protection, session caching, and event-based logging (for both start and complete operations) as part of the verification service base class.
  
  
  ## Verification Method Types
  
  ### 🧾 For byCode Verifications
  
  This verification type requires the user to manually enter a 6-digit code.
  
  **Frontend Action**:  
  Display a secure input page where the user can enter the code they received via email or SMS. After collecting the code and any required metadata (such as `userId` or `sessionId`), make a `POST` request to the corresponding `/complete` endpoint.
  
  ---
  
  ### 🔗 For byLink Verifications
  
  This verification type uses a clickable link embedded in an email (or SMS message).
  
  **Frontend Action**:  
  The link points to a `GET` page in your frontend that parses `userId` and `code` from the query string and sends them to the backend via a `POST` request to the corresponding `/complete` endpoint. This enables one-click verification without requiring the user to type in a code.
  


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
