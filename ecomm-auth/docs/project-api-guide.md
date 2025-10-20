# **ECOMM** FRONTEND GUIDE FOR AI CODING AGENTS

This document is a rest api guide for the ecomm project.
The document is designed for AI agents who will generate frontend code that will consume the project backend.

The project has got 1 auth service, 1 notification service, 1 bff service and business services.
Each service is a separate microservice application and listens the HTTP request from different service urls.

The services may be in preview server, staging server or real production server. So each service have got 3 acess urls.
Frontend application should support all deployemnt servers in the development phase,
and user should be able to select the target api server in the login page.

## Project Introduction

ecomm is a comprehensive e-commerce backend platform designed for managing products, orders, users, payments, and notifications with robust security and scalability.

## API Structure

### Object Structure of a Successfull Response

When the service processes requests successfully, it wraps the requested resource(s) within a JSON envelope. This envelope not only contains the data but also includes essential metadata, such as configuration details and pagination information, to enrich the response and provide context to the client.

**Key Characteristics of the Response Envelope:**

- **Data Presentation**: Depending on the nature of the request, the service returns either a single data object or an array of objects encapsulated within the JSON envelope.
  - **Creation and Update API**: These API routes return the unmodified (pure) form of the data object(s), without any associations to other data objects.
  - **Delete API**: Even though the data is removed from the database, the last known state of the data object(s) is returned in its pure form.
  - **Get Requests**: A single data object is returned in JSON format.
  - **Get List Requests**: An array of data objects is provided, reflecting a collection of resources.

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

### Additional Data

Each api öay have include addtional data other than the main data object according to the business logic of the API. They will be given in each API's response signature.

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

Here’s a **refined and restructured version** of your document — with a clean hierarchy, consistent heading levels, and standardized formatting for professional API documentation.
All repeated behavioral sections were grouped under unified “Behavioral Notes” subsections to reduce redundancy.

## 1. Authentication Routes

### 1.1 `POST /login` — User Login

**Purpose:**
Verifies user credentials and creates an authenticated session with a JWT access token.

**Access Routes:**

- `GET /login`: Returns a minimal HTML login page (for browser-based testing).
- `POST /login`: Authenticates user credentials and returns an access token and session.

#### Request Parameters

| Parameter  | Type   | Required | Source                  |
| ---------- | ------ | -------- | ----------------------- |
| `username` | String | Yes      | `request.body.username` |
| `password` | String | Yes      | `request.body.password` |

#### Behavior

- Authenticates credentials and returns a session object.
- Sets cookie: `projectname-access-token[-tenantCodename]`
- Adds the same token in response headers.
- Accepts either `username` or `email` fields (if both exist, `username` is prioritized).

#### Example

```js
axios.post("/login", {
  username: "user@example.com",
  password: "securePassword",
});
```

#### Success Response

```json
{
  "userId": "d92b9d4c-9b1e-4e95-842e-3fb9c8c1df38",
  "email": "user@example.com",
  "fullname": "John Doe",
  ...
}
```

#### Error Responses

- `401 Unauthorized`: Invalid credentials
- `403 Forbidden`: Email/mobile verification or 2FA pending
- `400 Bad Request`: Missing parameters

---

### 1.2 `POST /logout` — User Logout

**Purpose:**
Terminates the current session and clears associated authentication tokens.

#### Behavior

- Invalidates session (if exists).
- Clears cookie `projectname-access-token[-tenantCodename]`.
- Returns a confirmation response (always `200 OK`).

#### Example

```js
axios.post(
  "/logout",
  {},
  {
    headers: { Authorization: "Bearer your-jwt-token" },
  },
);
```

#### Notes

- Can be called without a session (idempotent behavior).
- Works for both cookie-based and token-based sessions.

#### Success Response

```json
{ "status": "OK", "message": "User logged out successfully" }
```

---

## 2. Verification Services Overview

All verification routes are grouped under the `/verification-services` base path.
They follow a **two-step verification pattern**: `start` → `complete`.

---

## 3. Email Verification

### 3.1 Trigger Scenarios

- After registration (`emailVerificationRequiredForLogin` = true)
- When updating email address
- When login fails due to unverified email

### 3.2 Flow Summary

1. `/start` → Generate & send code via email.
2. `/complete` → Verify code and mark email as verified.

** PLEASE NOTE **

Email verification is a frontend triiggered process. After user registers, the frontend should start the email verification process and navigate to its code input page.

---

### 3.3 `POST /verification-services/email-verification/start`

**Purpose:**
Starts the email verification by generating and sending a secret code.

| Parameter | Type   | Required | Description                    |
| --------- | ------ | -------- | ------------------------------ |
| `email`   | String | Yes      | User’s email address to verify |

**Example Request**

```json
{ "email": "user@example.com" }
```

**Success Response**

```json
{
  "userId": "user-uuid",
  "email": "user@example.com",
  "secretCode": "123456",
  "expireTime": 86400
}
```

> ⚠️ In production, `secretCode` is **not** returned — only sent via email.

**Error Responses**

- `400 Bad Request`: Already verified
- `403 Forbidden`: Too many attempts (rate limit)

---

### 3.4 `POST /verification-services/email-verification/complete`

**Purpose:**
Completes the verification using the received code.

| Parameter    | Type   | Required | Description       |
| ------------ | ------ | -------- | ----------------- |
| `email`      | String | Yes      | User’s email      |
| `secretCode` | String | Yes      | Verification code |

**Success Response**

```json
{
  "userId": "user-uuid",
  "email": "user@example.com",
  "isVerified": true
}
```

**Error Responses**

- `403 Forbidden`: Code expired or mismatched
- `404 Not Found`: No verification in progress

---

### 3.5 Behavioral Notes

- **Resend Cooldown:** `resendTimeWindow` (e.g. 60s)
- **Expiration:** Codes expire after `expireTimeWindow` (e.g. 1 day)
- **Single Active Session:** One verification per user

---

## 4. Mobile Verification

### 4.1 Trigger Scenarios

- After registration (`mobileVerificationRequiredForLogin` = true)
- When updating phone number
- On login requiring mobile verification

### 4.2 Flow

1. `/start` → Sends verification code via SMS
2. `/complete` → Validates code and confirms number

---

### 4.3 `POST /verification-services/mobile-verification/start`

| Parameter | Type   | Required | Description                          |
| --------- | ------ | -------- | ------------------------------------ |
| `email`   | String | Yes      | User’s email to locate mobile record |

**Success Response**

```json
{
  "userId": "user-uuid",
  "mobile": "+15551234567",
  "secretCode": "123456"
}
```

> ⚠️ `secretCode` returned only in development.

**Errors**

- `400 Bad Request`: Already verified
- `403 Forbidden`: Rate-limited

---

### 4.4 `POST /verification-services/mobile-verification/complete`

| Parameter    | Type   | Required | Description           |
| ------------ | ------ | -------- | --------------------- |
| `email`      | String | Yes      | Associated email      |
| `secretCode` | String | Yes      | Code received via SMS |

**Success Response**

```json
{
  "userId": "user-uuid",
  "mobile": "+15551234567",
  "isVerified": true
}
```

---

### 4.5 Behavioral Notes

- **Cooldown:** One code per minute
- **Expiration:** Codes valid for 1 day
- **One Session Per User**

---

## 5. Two-Factor Authentication (2FA)

### 5.1 Email 2FA

**Flow**

1. `/start` → Generates and sends email code
2. `/complete` → Verifies code and updates session

---

#### `POST /verification-services/email-2factor-verification/start`

| Parameter   | Type   | Required | Description      |
| ----------- | ------ | -------- | ---------------- |
| `userId`    | String | Yes      | User ID          |
| `sessionId` | String | Yes      | Current session  |
| `client`    | String | No       | Optional context |
| `reason`    | String | No       | Reason for 2FA   |

**Response**

```json
{
  "sessionId": "session-uuid",
  "secretCode": "123456"
}
```

---

#### `POST /verification-services/email-2factor-verification/complete`

| Parameter    | Type   | Required | Description     |
| ------------ | ------ | -------- | --------------- |
| `userId`     | String | Yes      | User ID         |
| `sessionId`  | String | Yes      | Session ID      |
| `secretCode` | String | Yes      | Code from email |

**Response**

```json
{
  "sessionId": "session-uuid",
  "sessionNeedsEmail2FA": false
}
```

---

### 5.2 Mobile 2FA

**Flow**

1. `/start` → Sends SMS code
2. `/complete` → Validates and finalizes session

---

#### `POST /verification-services/mobile-2factor-verification/start`

| Parameter   | Type   | Required | Description |
| ----------- | ------ | -------- | ----------- |
| `userId`    | String | Yes      | User ID     |
| `sessionId` | String | Yes      | Session ID  |
| `client`    | String | No       | Context     |
| `reason`    | String | No       | Reason      |

**Response**

```json
{
  "sessionId": "session-uuid",
  "mobile": "+15551234567",
  "secretCode": "654321"
}
```

---

#### `POST /verification-services/mobile-2factor-verification/complete`

| Parameter    | Type   | Required | Description  |
| ------------ | ------ | -------- | ------------ |
| `userId`     | String | Yes      | User ID      |
| `sessionId`  | String | Yes      | Session ID   |
| `secretCode` | String | Yes      | Code via SMS |

**Response**

```json
{
  "sessionId": "session-uuid",
  "sessionNeedsMobile2FA": false
}
```

---

### 5.3 2FA Behavioral Notes

- One active code per session
- Cooldown: `resendTimeWindow` (e.g., 60s)
- Expiration: `expireTimeWindow` (e.g., 5m)

---

## 6. Password Reset

### 6.1 By Email

**Flow**

1. `/start` → Sends verification code via email
2. `/complete` → Validates and resets password

---

#### `POST /verification-services/password-reset-by-email/start`

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| `email`   | String | Yes      | User email  |

**Response**

```json
{
  "userId": "user-uuid",
  "email": "user@example.com",
  "secretCode": "123456"
}
```

#### `POST /verification-services/password-reset-by-email/complete`

| Parameter    | Type   | Required | Description   |
| ------------ | ------ | -------- | ------------- |
| `email`      | String | Yes      | User email    |
| `secretCode` | String | Yes      | Code received |
| `password`   | String | Yes      | New password  |

**Response**

```json
{
  "userId": "user-uuid",
  "isVerified": true
}
```

---

### 6.2 By Mobile

**Flow**

1. `/start` → Sends SMS code
2. `/complete` → Validates and resets password

---

#### `POST /verification-services/password-reset-by-mobile/start`

| Parameter | Type   | Required | Description   |
| --------- | ------ | -------- | ------------- |
| `mobile`  | String | Yes      | Mobile number |

#### `POST /verification-services/password-reset-by-mobile/complete`

| Parameter    | Type   | Required | Description      |
| ------------ | ------ | -------- | ---------------- |
| `email`      | String | Yes      | Associated email |
| `secretCode` | String | Yes      | Code via SMS     |
| `password`   | String | Yes      | New password     |

---

### 6.3 Behavioral Notes

- Cooldown: 60s resend
- Expiration: 24h
- One session per user
- Works without an active login session

---

## 7. Verification Method Types

### 7.1 `byCode`

User manually enters the 6-digit code in frontend.

### 7.2 `byLink`

Frontend handles a one-click verification via email/SMS link containing code parameters.

## 8) `GET /currentuser` — Current Session

**Purpose**
Return the currently authenticated user’s session.

**Route Type**
`sessionInfo`

**Authentication**
Requires a valid access token (header or cookie).

### Request

_No parameters._

### Example

```js
axios.get("/currentuser", {
  headers: { Authorization: "Bearer <jwt>" },
});
```

### Success (200)

Returns the session object (identity, tenancy, token metadata):

```json
{
  "sessionId": "9cf23fa8-07d4-4e7c-80a6-ec6d6ac96bb9",
  "userId": "d92b9d4c-9b1e-4e95-842e-3fb9c8c1df38",
  "email": "user@example.com",
  "fullname": "John Doe",
  "roleId": "user",
  "tenantId": "abc123",
  "accessToken": "jwt-token-string",
  "...": "..."
}
```

### Errors

- **401 Unauthorized** — No active session/token

  ```json
  { "status": "ERR", "message": "No login found" }
  ```

**Notes**

- Commonly called by web/mobile clients after login to hydrate session state.
- Includes key identity/tenant fields and a token reference (if applicable).
- Ensure a valid token is supplied to receive a 200 response.

---

## 9) `GET /permissions` — List Effective Permissions

**Purpose**
Return all effective permission grants for the current user.

**Route Type**
`permissionFetch`

**Authentication**
Requires a valid access token.

### Request

_No parameters._

### Example

```js
axios.get("/permissions", {
  headers: { Authorization: "Bearer <jwt>" },
});
```

### Success (200)

Array of permission grants (aligned with `givenPermissions`):

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

**Field meanings (per item):**

- `permissionName`: Granted permission key.
- `roleId`: Present if granted via role.
- `subjectUserId`: Present if granted directly to the user.
- `subjectUserGroupId`: Present if granted via group.
- `objectId`: Present if scoped to a specific object (OBAC).
- `canDo`: `true` if enabled, `false` if restricted.

### Errors

- **401 Unauthorized** — No active session

  ```json
  { "status": "ERR", "message": "No login found" }
  ```

- **500 Internal Server Error** — Unexpected failure

**Notes**

- Available on all Mindbricks-generated services (not only Auth).
- **Auth service:** Reads live `givenPermissions` from DB.
- **Other services:** Typically respond from a cached/projected view (e.g., ElasticSearch) for faster checks.

> **Tip:** Cache permission results client-side/server-side and refresh after login or permission updates.

---

## 10) `GET /permissions/:permissionName` — Check Permission Scope

**Purpose**
Check whether the current user has a specific permission and return any scoped object exceptions/inclusions.

**Route Type**
`permissionScopeCheck`

**Authentication**
Requires a valid access token.

### Path Parameters

| Name             | Type   | Required | Source                          |
| ---------------- | ------ | -------- | ------------------------------- |
| `permissionName` | String | Yes      | `request.params.permissionName` |

### Example

```js
axios.get("/permissions/orders.manage", {
  headers: { Authorization: "Bearer <jwt>" },
});
```

### Success (200)

```json
{
  "canDo": true,
  "exceptions": [
    "a1f2e3d4-xxxx-yyyy-zzzz-object1",
    "b2c3d4e5-xxxx-yyyy-zzzz-object2"
  ]
}
```

**Interpretation**

- If `canDo: true`: permission is generally granted **except** the listed `exceptions` (restrictions).
- If `canDo: false`: permission is generally **not** granted, **only** allowed for the listed `exceptions` (selective overrides).
- `exceptions` contains object IDs (UUID strings) from the relevant domain model.

### Errors

- **401 Unauthorized** — No active session/token.

## Services And Data Object

## Auth Service

Authentication service for the project

### Auth Service Data Objects

**User**
A data object that stores the user information and handles login settings.

### Auth Service Access urls

This service is accessible via the following environment-specific URLs:

- **Preview:** `https://ecomm.prw.mindbricks.com/auth-api`
- **Staging:** `https://ecomm-stage.mindbricks.co/auth-api`
- **Production:** `https://ecomm.mindbricks.co/auth-api`

#### `Get User` API

This api is used by admin roles or the users themselves to get the user profile information.

The `getUser` API REST controller can be triggered via the following route:

`/v1/users/:userId`

**Rest Request Parameters**

The `getUser` api has got 1 request parameter

| Parameter | Type | Required | Population             |
| --------- | ---- | -------- | ---------------------- |
| userId    | ID   | true     | request.params?.userId |

**userId** : This id paremeter is used to query the required data object.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/users/:userId**

```js
axios({
  method: "GET",
  url: `/v1/users/${userId}`,
  data: {},
  params: {},
});
```

**REST Response**

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
  "dataName": "user",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "user": {
    "id": "ID",
    "_owner": "ID",
    "email": "String",
    "password": "String",
    "fullname": "String",
    "avatar": "String",
    "roleId": "String",
    "emailVerified": "Boolean",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Update User` API

This route is used by users to update their profiles.

The `updateUser` API REST controller can be triggered via the following route:

`/v1/users/:userId`

**Rest Request Parameters**

The `updateUser` api has got 3 request parameters

| Parameter | Type   | Required | Population             |
| --------- | ------ | -------- | ---------------------- |
| userId    | ID     | true     | request.params?.userId |
| fullname  | String | false    | request.body?.fullname |
| avatar    | String | false    | request.body?.avatar   |

**userId** : This id paremeter is used to select the required data object that will be updated
**fullname** : A string value to represent the fullname of the user
**avatar** : The avatar url of the user. A random avatar will be generated if not provided

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/users/:userId**

```js
axios({
  method: "PATCH",
  url: `/v1/users/${userId}`,
  data: {
    fullname: "String",
    avatar: "String",
  },
  params: {},
});
```

**REST Response**

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
  "dataName": "user",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "user": {
    "id": "ID",
    "_owner": "ID",
    "email": "String",
    "password": "String",
    "fullname": "String",
    "avatar": "String",
    "roleId": "String",
    "emailVerified": "Boolean",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Register User` API

This api is used by public users to register themselves

The `registerUser` API REST controller can be triggered via the following route:

`/v1/registeruser`

**Rest Request Parameters**

The `registerUser` api has got 4 request parameters

| Parameter | Type   | Required | Population             |
| --------- | ------ | -------- | ---------------------- |
| avatar    | String | false    | request.body?.avatar   |
| password  | String | true     | request.body?.password |
| fullname  | String | true     | request.body?.fullname |
| email     | String | true     | request.body?.email    |

**avatar** : The avatar url of the user. If not sent, a default random one will be generated.
**password** : The password defined by the the user that is being registered.
**fullname** : The fullname defined by the the user that is being registered.
**email** : The email defined by the the user that is being registered.

**REST Request**
To access the api you can use the **REST** controller with the path **POST /v1/registeruser**

```js
axios({
  method: "POST",
  url: "/v1/registeruser",
  data: {
    avatar: "String",
    password: "String",
    fullname: "String",
    email: "String",
  },
  params: {},
});
```

**REST Response**

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
  "dataName": "user",
  "method": "POST",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "user": {
    "id": "ID",
    "_owner": "ID",
    "email": "String",
    "password": "String",
    "fullname": "String",
    "avatar": "String",
    "roleId": "String",
    "emailVerified": "Boolean",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Delete User` API

This api is used by users to delete their profiles.

The `deleteUser` API REST controller can be triggered via the following route:

`/v1/users/:userId`

**Rest Request Parameters**

The `deleteUser` api has got 1 request parameter

| Parameter | Type | Required | Population             |
| --------- | ---- | -------- | ---------------------- |
| userId    | ID   | true     | request.params?.userId |

**userId** : This id paremeter is used to select the required data object that will be deleted

**REST Request**
To access the api you can use the **REST** controller with the path **DELETE /v1/users/:userId**

```js
axios({
  method: "DELETE",
  url: `/v1/users/${userId}`,
  data: {},
  params: {},
});
```

**REST Response**

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
  "dataName": "user",
  "method": "DELETE",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "user": {
    "id": "ID",
    "_owner": "ID",
    "email": "String",
    "password": "String",
    "fullname": "String",
    "avatar": "String",
    "roleId": "String",
    "emailVerified": "Boolean",
    "isActive": false,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `List Users` API

The `listUsers` API REST controller can be triggered via the following route:

`/v1/users`

**Rest Request Parameters**
The `listUsers` api has got no request parameters.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/users**

```js
axios({
  method: "GET",
  url: "/v1/users",
  data: {},
  params: {},
});
```

**REST Response**

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
  "dataName": "users",
  "method": "GET",
  "action": "list",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "users": [
    {
      "id": "ID",
      "_owner": "ID",
      "email": "String",
      "password": "String",
      "fullname": "String",
      "avatar": "String",
      "roleId": "String",
      "emailVerified": "Boolean",
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

#### `Update Userrole` API

This route is used by admin roles to update the user role.The default role is user when a user is registered. A user's role can be updated by superAdmin or admin

The `updateUserRole` API REST controller can be triggered via the following route:

`/v1/userrole/:userId`

**Rest Request Parameters**

The `updateUserRole` api has got 2 request parameters

| Parameter | Type   | Required | Population             |
| --------- | ------ | -------- | ---------------------- |
| userId    | ID     | true     | request.params?.userId |
| roleId    | String | true     | request.body?.roleId   |

**userId** : This id paremeter is used to select the required data object that will be updated
**roleId** : The new roleId of the user to be updated

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/userrole/:userId**

```js
axios({
  method: "PATCH",
  url: `/v1/userrole/${userId}`,
  data: {
    roleId: "String",
  },
  params: {},
});
```

**REST Response**

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
  "dataName": "user",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "user": {
    "id": "ID",
    "_owner": "ID",
    "email": "String",
    "password": "String",
    "fullname": "String",
    "avatar": "String",
    "roleId": "String",
    "emailVerified": "Boolean",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Update Userpassword` API

This route is used to to force the password update by old password.

The `updateUserPassword` API REST controller can be triggered via the following route:

`/v1/userpassword/:userId`

**Rest Request Parameters**

The `updateUserPassword` api has got 3 request parameters

| Parameter   | Type   | Required | Population                |
| ----------- | ------ | -------- | ------------------------- |
| userId      | ID     | true     | request.params?.userId    |
| oldPassword | String | true     | request.body?.oldPassword |
| newPassword | String | true     | request.body?.newPassword |

**userId** : This id paremeter is used to select the required data object that will be updated
**oldPassword** : The old password of the user that will be overridden bu the new one. Send for double check.
**newPassword** : The new password of the user to be updated

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/userpassword/:userId**

```js
axios({
  method: "PATCH",
  url: `/v1/userpassword/${userId}`,
  data: {
    oldPassword: "String",
    newPassword: "String",
  },
  params: {},
});
```

**REST Response**

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
  "dataName": "user",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "user": {
    "id": "ID",
    "_owner": "ID",
    "email": "String",
    "password": "String",
    "fullname": "String",
    "avatar": "String",
    "roleId": "String",
    "emailVerified": "Boolean",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Get Briefuser` API

This route is used by public to get simple user profile information.

The `getBriefUser` API REST controller can be triggered via the following route:

`/v1/briefuser/:userId`

**Rest Request Parameters**

The `getBriefUser` api has got 1 request parameter

| Parameter | Type | Required | Population             |
| --------- | ---- | -------- | ---------------------- |
| userId    | ID   | true     | request.params?.userId |

**userId** : This id paremeter is used to query the required data object.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/briefuser/:userId**

```js
axios({
  method: "GET",
  url: `/v1/briefuser/${userId}`,
  data: {},
  params: {},
});
```

**REST Response**

This route's response is constrained to a select list of properties, and therefore does not encompass all attributes of the resource.

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
  "dataName": "user",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "user": {
    "id": "ID",
    "_owner": "ID",
    "fullname": "String",
    "avatar": "String",
    "isActive": true
  }
}
```

## ProductCatalog Service

Microservice for managing the master product catalog: crud, searching, filtering, and realtime product availability for ecommerce...

### ProductCatalog Service Data Objects

**Product**
Represents a product listed in the e-commerce catalog, with full searchable and filterable attributes including inventory, status, pricing, and dimensional details.

### ProductCatalog Service Access urls

This service is accessible via the following environment-specific URLs:

- **Preview:** `https://ecomm.prw.mindbricks.com/productcatalog-api`
- **Staging:** `https://ecomm-stage.mindbricks.co/productcatalog-api`
- **Production:** `https://ecomm.mindbricks.co/productcatalog-api`

#### `Create Product` API

Admin API: Create a new product in catalog with all attributes.

The `createProduct` API REST controller can be triggered via the following route:

`/v1/products`

**Rest Request Parameters**

The `createProduct` api has got 12 request parameters

| Parameter      | Type    | Required | Population                   |
| -------------- | ------- | -------- | ---------------------------- |
| name           | String  | true     | request.body?.name           |
| description    | Text    | false    | request.body?.description    |
| category       | String  | true     | request.body?.category       |
| price          | Integer | true     | request.body?.price          |
| images         | String  | true     | request.body?.images         |
| status         | Enum    | true     | request.body?.status         |
| inventoryCount | Integer | true     | request.body?.inventoryCount |
| sku            | String  | true     | request.body?.sku            |
| tags           | String  | false    | request.body?.tags           |
| weight         | Float   | false    | request.body?.weight         |
| dimensions     | Object  | false    | request.body?.dimensions     |
| attributes     | Object  | false    | request.body?.attributes     |

**name** : Product's name, displayed in catalog, used for search and filtering.
**description** : Long form product description.
**category** : Product category for filtering and organization.
**price** : Product price in minor currency unit (cents).
**images** : Array of product image URLs.
**status** : Product status; 'active' for available products, 'discontinued' for non-sale.
**inventoryCount** : Number of items in stock; 0 means out of stock.
**sku** : Stock keeping unit—must be unique across products.
**tags** : Optional array of tags for product search or grouping.
**weight** : Product weight, in grams.
**dimensions** : Object containing length, width, height (in cm or mm as schema decided by client/frontend).
**attributes** : Flexible object for variant/specification key-value pairs (e.g., color, material, custom properties).

**REST Request**
To access the api you can use the **REST** controller with the path **POST /v1/products**

```js
axios({
  method: "POST",
  url: "/v1/products",
  data: {
    name: "String",
    description: "Text",
    category: "String",
    price: "Integer",
    images: "String",
    status: "Enum",
    inventoryCount: "Integer",
    sku: "String",
    tags: "String",
    weight: "Float",
    dimensions: "Object",
    attributes: "Object",
  },
  params: {},
});
```

**REST Response**

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
  "dataName": "product",
  "method": "POST",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "product": {
    "id": "ID",
    "_owner": "ID",
    "name": "String",
    "description": "Text",
    "category": "String",
    "price": "Integer",
    "images": "String",
    "availability": "Boolean",
    "status": "Enum",
    "status_": "String",
    "inventoryCount": "Integer",
    "sku": "String",
    "tags": "String",
    "weight": "Float",
    "dimensions": "Object",
    "attributes": "Object",
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date",
    "isActive": true
  }
}
```

#### `Update Product` API

Admin API: Update a product (all editable fields, including inventory, price, status, etc.).

The `updateProduct` API REST controller can be triggered via the following route:

`/v1/products/:productId`

**Rest Request Parameters**

The `updateProduct` api has got 13 request parameters

| Parameter      | Type    | Required | Population                   |
| -------------- | ------- | -------- | ---------------------------- |
| productId      | ID      | true     | request.params?.productId    |
| name           | String  | false    | request.body?.name           |
| description    | Text    | false    | request.body?.description    |
| category       | String  | false    | request.body?.category       |
| price          | Integer | false    | request.body?.price          |
| images         | String  | false    | request.body?.images         |
| status         | Enum    | false    | request.body?.status         |
| inventoryCount | Integer | false    | request.body?.inventoryCount |
| sku            | String  | false    | request.body?.sku            |
| tags           | String  | false    | request.body?.tags           |
| weight         | Float   | false    | request.body?.weight         |
| dimensions     | Object  | false    | request.body?.dimensions     |
| attributes     | Object  | false    | request.body?.attributes     |

**productId** : This id paremeter is used to select the required data object that will be updated
**name** : Product's name, displayed in catalog, used for search and filtering.
**description** : Long form product description.
**category** : Product category for filtering and organization.
**price** : Product price in minor currency unit (cents).
**images** : Array of product image URLs.
**status** : Product status; 'active' for available products, 'discontinued' for non-sale.
**inventoryCount** : Number of items in stock; 0 means out of stock.
**sku** : Stock keeping unit—must be unique across products.
**tags** : Optional array of tags for product search or grouping.
**weight** : Product weight, in grams.
**dimensions** : Object containing length, width, height (in cm or mm as schema decided by client/frontend).
**attributes** : Flexible object for variant/specification key-value pairs (e.g., color, material, custom properties).

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/products/:productId**

```js
axios({
  method: "PATCH",
  url: `/v1/products/${productId}`,
  data: {
    name: "String",
    description: "Text",
    category: "String",
    price: "Integer",
    images: "String",
    status: "Enum",
    inventoryCount: "Integer",
    sku: "String",
    tags: "String",
    weight: "Float",
    dimensions: "Object",
    attributes: "Object",
  },
  params: {},
});
```

**REST Response**

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
  "dataName": "product",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "product": {
    "id": "ID",
    "_owner": "ID",
    "name": "String",
    "description": "Text",
    "category": "String",
    "price": "Integer",
    "images": "String",
    "availability": "Boolean",
    "status": "Enum",
    "status_": "String",
    "inventoryCount": "Integer",
    "sku": "String",
    "tags": "String",
    "weight": "Float",
    "dimensions": "Object",
    "attributes": "Object",
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date",
    "isActive": true
  }
}
```

#### `Delete Product` API

Admin API: Delete a product from catalog (hard delete, intended for admins).

The `deleteProduct` API REST controller can be triggered via the following route:

`/v1/products/:productId`

**Rest Request Parameters**

The `deleteProduct` api has got 1 request parameter

| Parameter | Type | Required | Population                |
| --------- | ---- | -------- | ------------------------- |
| productId | ID   | true     | request.params?.productId |

**productId** : This id paremeter is used to select the required data object that will be deleted

**REST Request**
To access the api you can use the **REST** controller with the path **DELETE /v1/products/:productId**

```js
axios({
  method: "DELETE",
  url: `/v1/products/${productId}`,
  data: {},
  params: {},
});
```

**REST Response**

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
  "dataName": "product",
  "method": "DELETE",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "product": {
    "id": "ID",
    "_owner": "ID",
    "name": "String",
    "description": "Text",
    "category": "String",
    "price": "Integer",
    "images": "String",
    "availability": "Boolean",
    "status": "Enum",
    "status_": "String",
    "inventoryCount": "Integer",
    "sku": "String",
    "tags": "String",
    "weight": "Float",
    "dimensions": "Object",
    "attributes": "Object",
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date",
    "isActive": false
  }
}
```

#### `Get Product` API

Get details of a product (by ID or unique SKU). Available to all users.

The `getProduct` API REST controller can be triggered via the following route:

`/v1/products/:productId`

**Rest Request Parameters**

The `getProduct` api has got 1 request parameter

| Parameter | Type | Required | Population                |
| --------- | ---- | -------- | ------------------------- |
| productId | ID   | true     | request.params?.productId |

**productId** : This id paremeter is used to query the required data object.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/products/:productId**

```js
axios({
  method: "GET",
  url: `/v1/products/${productId}`,
  data: {},
  params: {},
});
```

**REST Response**

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
  "dataName": "product",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "product": {
    "id": "ID",
    "_owner": "ID",
    "name": "String",
    "description": "Text",
    "category": "String",
    "price": "Integer",
    "images": "String",
    "availability": "Boolean",
    "status": "Enum",
    "status_": "String",
    "inventoryCount": "Integer",
    "sku": "String",
    "tags": "String",
    "weight": "Float",
    "dimensions": "Object",
    "attributes": "Object",
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date",
    "isActive": true
  }
}
```

#### `List Products` API

List/search products, supports filters (name, category, price, status, tags, availability). Available to all users.

The `listProducts` API REST controller can be triggered via the following route:

`/v1/products`

**Rest Request Parameters**
The `listProducts` api has got no request parameters.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/products**

```js
axios({
  method: "GET",
  url: "/v1/products",
  data: {},
  params: {},
});
```

**REST Response**

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
  "dataName": "products",
  "method": "GET",
  "action": "list",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "products": [
    {
      "id": "ID",
      "_owner": "ID",
      "name": "String",
      "description": "Text",
      "category": "String",
      "price": "Integer",
      "images": "String",
      "availability": "Boolean",
      "status": "Enum",
      "status_": "String",
      "inventoryCount": "Integer",
      "sku": "String",
      "tags": "String",
      "weight": "Float",
      "dimensions": "Object",
      "attributes": "Object",
      "recordVersion": "Integer",
      "createdAt": "Date",
      "updatedAt": "Date",
      "isActive": true
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

## Cart Service

Manages each user's active shopping cart in the e-commerce platform, allowing product selection, cart review, and update operations prior to checkout.

### Cart Service Data Objects

**Cart**
Represents a single user's shopping cart containing selected product items, their quantities, and state as of last update.

**CartItem**
Describes a product added to a cart with snapshot of its state at time of add—product, quantity, price, and selection attributes.

**Ko**

### Cart Service Access urls

This service is accessible via the following environment-specific URLs:

- **Preview:** `https://ecomm.prw.mindbricks.com/cart-api`
- **Staging:** `https://ecomm-stage.mindbricks.co/cart-api`
- **Production:** `https://ecomm.mindbricks.co/cart-api`

#### `Create Cart` API

Initializes a new empty cart for the user. Typically called on first add-to-cart action or login if cart not exists.

The `createCart` API REST controller can be triggered via the following route:

`/v1/carts`

**Rest Request Parameters**

The `createCart` api has got 2 request parameters

| Parameter | Type   | Required | Population          |
| --------- | ------ | -------- | ------------------- |
| items     | Object | true     | request.body?.items |
| yuy       | Object | true     | request.body?.yuy   |

**items** : List of items (cartItem) in the cart. Each represents a product selection at time of add.
**yuy** :

**REST Request**
To access the api you can use the **REST** controller with the path **POST /v1/carts**

```js
axios({
  method: "POST",
  url: "/v1/carts",
  data: {
    items: "Object",
    yuy: "Object",
  },
  params: {},
});
```

**REST Response**

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
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Get Cart` API

Returns the user's current shopping cart with all items. Only the cart owner or admin can access.

The `getCart` API REST controller can be triggered via the following route:

`/v1/carts/:cartId`

**Rest Request Parameters**

The `getCart` api has got 1 request parameter

| Parameter | Type | Required | Population             |
| --------- | ---- | -------- | ---------------------- |
| cartId    | ID   | true     | request.params?.cartId |

**cartId** : This id paremeter is used to query the required data object.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/carts/:cartId**

```js
axios({
  method: "GET",
  url: `/v1/carts/${cartId}`,
  data: {},
  params: {},
});
```

**REST Response**

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
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Update Cart` API

Updates the user's cart contents, replacing items array and updating lastModified. Validates all items.

The `updateCart` API REST controller can be triggered via the following route:

`/v1/carts/:cartId`

**Rest Request Parameters**

The `updateCart` api has got 3 request parameters

| Parameter | Type   | Required | Population             |
| --------- | ------ | -------- | ---------------------- |
| cartId    | ID     | true     | request.params?.cartId |
| items     | Object | false    | request.body?.items    |
| yuy       | Object | false    | request.body?.yuy      |

**cartId** : This id paremeter is used to select the required data object that will be updated
**items** : List of items (cartItem) in the cart. Each represents a product selection at time of add.
**yuy** :

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/carts/:cartId**

```js
axios({
  method: "PATCH",
  url: `/v1/carts/${cartId}`,
  data: {
    items: "Object",
    yuy: "Object",
  },
  params: {},
});
```

**REST Response**

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
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Delete Cart` API

Deletes the user's cart (resets to empty, for example at checkout complete). Restricted to owner or admin.

The `deleteCart` API REST controller can be triggered via the following route:

`/v1/carts/:cartId`

**Rest Request Parameters**

The `deleteCart` api has got 1 request parameter

| Parameter | Type | Required | Population             |
| --------- | ---- | -------- | ---------------------- |
| cartId    | ID   | true     | request.params?.cartId |

**cartId** : This id paremeter is used to select the required data object that will be deleted

**REST Request**
To access the api you can use the **REST** controller with the path **DELETE /v1/carts/:cartId**

```js
axios({
  method: "DELETE",
  url: `/v1/carts/${cartId}`,
  data: {},
  params: {},
});
```

**REST Response**

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
    "isActive": false,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `List Carts` API

Admin: List all user carts (for analytics or support). Restricted to admin.

The `listCarts` API REST controller can be triggered via the following route:

`/v1/carts`

**Rest Request Parameters**
The `listCarts` api has got no request parameters.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/carts**

```js
axios({
  method: "GET",
  url: "/v1/carts",
  data: {},
  params: {},
});
```

**REST Response**

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

## OrderManagement Service

Handles creation, status/lifecycle updates, and storage of e-commerce orders. Integrates with Stripe for payments/refunds. Allows customers to view order history and admins to manage all orders. Captures shipping details, order items, and maintains an event log per order...

### OrderManagement Service Data Objects

**Order**
A purchase order placed by a user, containing selected products, shipping info, total, and payment/lifecycle status. Integrated with Stripe for payment and refunds. Immutable after placed except for admin status/notes/stripe events.

**OrderItem**
Snapshot of a product at time of order: productId, name, sku, price per unit, quantity, image url, custom selection/attributes. Not updated after order placed.

**Sys_orderPayment**
A payment storage object to store the payment life cyle of orders based on order object. It is autocreated based on the source object's checkout config

**Sys_paymentCustomer**
A payment storage object to store the customer values of the payment platform

**Sys_paymentMethod**
A payment storage object to store the payment methods of the platform customers

### OrderManagement Service Access urls

This service is accessible via the following environment-specific URLs:

- **Preview:** `https://ecomm.prw.mindbricks.com/ordermanagement-api`
- **Staging:** `https://ecomm-stage.mindbricks.co/ordermanagement-api`
- **Production:** `https://ecomm.mindbricks.co/ordermanagement-api`

#### `Create Order` API

Place a new order for the current user. Copies validated cart items into order, stores shipping address, sets total/currency, triggers Stripe checkout, logs placement event.

The `createOrder` API REST controller can be triggered via the following route:

`/v1/orders`

**Rest Request Parameters**

The `createOrder` api has got 10 request parameters

| Parameter             | Type    | Required | Population                          |
| --------------------- | ------- | -------- | ----------------------------------- |
| items                 | Object  | true     | request.body?.items                 |
| shippingAddress       | Object  | true     | request.body?.shippingAddress       |
| totalAmount           | Integer | true     | request.body?.totalAmount           |
| currency              | String  | true     | request.body?.currency              |
| placedAt              | Date    | true     | request.body?.placedAt              |
| stripePaymentIntentId | String  | false    | request.body?.stripePaymentIntentId |
| refundRequested       | Boolean | false    | request.body?.refundRequested       |
| refundAmount          | Integer | false    | request.body?.refundAmount          |
| adminNotes            | String  | false    | request.body?.adminNotes            |
| orderHistory          | Object  | false    | request.body?.orderHistory          |

**items** : Array of order items purchased (snapshot at time of order).
**shippingAddress** : Shipping address for the order (recipientName, addressLine1, addressLine2, city, region, postalCode, country, phone).
**totalAmount** : Total price (in cents) for all items + shipping, used for payment charging (stripeAmount).
**currency** : Currency code (ISO 4217, e.g., USD, EUR) for payment/stripe.
**placedAt** : Timestamp when order was placed/created (for sorting/history).
**stripePaymentIntentId** : Reference to Stripe payment intent for this order. Used to track payment lifecycle and reconciliation.
**refundRequested** : Indicates customer/admin has requested a refund for this order.
**refundAmount** : Amount to refund (in cents). Present if refund is requested/processed. Optional - null if not used/full refund.
**adminNotes** : Notes about the order (visible/editable by admins only).
**orderHistory** : Event log of status/payment/history changes: array of {event:String, date:Date, note:String} for order audit trail.

**REST Request**
To access the api you can use the **REST** controller with the path **POST /v1/orders**

```js
axios({
  method: "POST",
  url: "/v1/orders",
  data: {
    items: "Object",
    shippingAddress: "Object",
    totalAmount: "Integer",
    currency: "String",
    placedAt: "Date",
    stripePaymentIntentId: "String",
    refundRequested: "Boolean",
    refundAmount: "Integer",
    adminNotes: "String",
    orderHistory: "Object",
  },
  params: {},
});
```

**REST Response**

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
  "dataName": "order",
  "method": "POST",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "order": {
    "id": "ID",
    "_owner": "ID",
    "userId": "ID",
    "items": "Object",
    "shippingAddress": "Object",
    "totalAmount": "Integer",
    "currency": "String",
    "status": "Enum",
    "status_": "String",
    "paymentStatus": "Enum",
    "paymentStatus_": "String",
    "placedAt": "Date",
    "stripePaymentIntentId": "String",
    "refundRequested": "Boolean",
    "refundAmount": "Integer",
    "adminNotes": "String",
    "orderHistory": "Object",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Get Order` API

Get order details (own order for customer, any order for admin).

The `getOrder` API REST controller can be triggered via the following route:

`/v1/orders/:orderId`

**Rest Request Parameters**

The `getOrder` api has got 1 request parameter

| Parameter | Type | Required | Population              |
| --------- | ---- | -------- | ----------------------- |
| orderId   | ID   | true     | request.params?.orderId |

**orderId** : This id paremeter is used to query the required data object.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/orders/:orderId**

```js
axios({
  method: "GET",
  url: `/v1/orders/${orderId}`,
  data: {},
  params: {},
});
```

**REST Response**

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
  "dataName": "order",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "order": {
    "id": "ID",
    "_owner": "ID",
    "userId": "ID",
    "items": "Object",
    "shippingAddress": "Object",
    "totalAmount": "Integer",
    "currency": "String",
    "status": "Enum",
    "status_": "String",
    "paymentStatus": "Enum",
    "paymentStatus_": "String",
    "placedAt": "Date",
    "stripePaymentIntentId": "String",
    "refundRequested": "Boolean",
    "refundAmount": "Integer",
    "adminNotes": "String",
    "orderHistory": "Object",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Update Order` API

Update status/adminNotes/refund fields or process Stripe events. Used by admin or payment webhooks, not for user item/content change.

The `updateOrder` API REST controller can be triggered via the following route:

`/v1/orders/:orderId`

**Rest Request Parameters**

The `updateOrder` api has got 8 request parameters

| Parameter             | Type    | Required | Population                          |
| --------------------- | ------- | -------- | ----------------------------------- |
| orderId               | ID      | true     | request.params?.orderId             |
| status                | Enum    | true     | request.body?.status                |
| paymentStatus         | Enum    | true     | request.body?.paymentStatus         |
| stripePaymentIntentId | String  | false    | request.body?.stripePaymentIntentId |
| refundRequested       | Boolean | false    | request.body?.refundRequested       |
| refundAmount          | Integer | false    | request.body?.refundAmount          |
| adminNotes            | String  | false    | request.body?.adminNotes            |
| orderHistory          | Object  | false    | request.body?.orderHistory          |

**orderId** : This id paremeter is used to select the required data object that will be updated
**status** : Order lifecycle status. 0: pending, 1: paid, 2: processing, 3: shipped, 4: delivered, 5: cancelled, 6: refunded.
**paymentStatus** : Payment status for Stripe: 0: unpaid, 1: paid, 2: refunded, 3: failed.
**stripePaymentIntentId** : Reference to Stripe payment intent for this order. Used to track payment lifecycle and reconciliation.
**refundRequested** : Indicates customer/admin has requested a refund for this order.
**refundAmount** : Amount to refund (in cents). Present if refund is requested/processed. Optional - null if not used/full refund.
**adminNotes** : Notes about the order (visible/editable by admins only).
**orderHistory** : Event log of status/payment/history changes: array of {event:String, date:Date, note:String} for order audit trail.

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/orders/:orderId**

```js
axios({
  method: "PATCH",
  url: `/v1/orders/${orderId}`,
  data: {
    status: "Enum",
    paymentStatus: "Enum",
    stripePaymentIntentId: "String",
    refundRequested: "Boolean",
    refundAmount: "Integer",
    adminNotes: "String",
    orderHistory: "Object",
  },
  params: {},
});
```

**REST Response**

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
  "dataName": "order",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "order": {
    "id": "ID",
    "_owner": "ID",
    "userId": "ID",
    "items": "Object",
    "shippingAddress": "Object",
    "totalAmount": "Integer",
    "currency": "String",
    "status": "Enum",
    "status_": "String",
    "paymentStatus": "Enum",
    "paymentStatus_": "String",
    "placedAt": "Date",
    "stripePaymentIntentId": "String",
    "refundRequested": "Boolean",
    "refundAmount": "Integer",
    "adminNotes": "String",
    "orderHistory": "Object",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Delete Order` API

Soft delete order (admin only), for removing test/broken/cancelled orders from history. Object remains for reporting and compliance.

The `deleteOrder` API REST controller can be triggered via the following route:

`/v1/orders/:orderId`

**Rest Request Parameters**

The `deleteOrder` api has got 1 request parameter

| Parameter | Type | Required | Population              |
| --------- | ---- | -------- | ----------------------- |
| orderId   | ID   | true     | request.params?.orderId |

**orderId** : This id paremeter is used to select the required data object that will be deleted

**REST Request**
To access the api you can use the **REST** controller with the path **DELETE /v1/orders/:orderId**

```js
axios({
  method: "DELETE",
  url: `/v1/orders/${orderId}`,
  data: {},
  params: {},
});
```

**REST Response**

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
  "dataName": "order",
  "method": "DELETE",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "order": {
    "id": "ID",
    "_owner": "ID",
    "userId": "ID",
    "items": "Object",
    "shippingAddress": "Object",
    "totalAmount": "Integer",
    "currency": "String",
    "status": "Enum",
    "status_": "String",
    "paymentStatus": "Enum",
    "paymentStatus_": "String",
    "placedAt": "Date",
    "stripePaymentIntentId": "String",
    "refundRequested": "Boolean",
    "refundAmount": "Integer",
    "adminNotes": "String",
    "orderHistory": "Object",
    "isActive": false,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `List Orders` API

List/search orders (customer: own orders; admin: all). Filter by status, placedAt, userId.

The `listOrders` API REST controller can be triggered via the following route:

`/v1/orders`

**Rest Request Parameters**
The `listOrders` api has got no request parameters.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/orders**

```js
axios({
  method: "GET",
  url: "/v1/orders",
  data: {},
  params: {},
});
```

**REST Response**

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
  "dataName": "orders",
  "method": "GET",
  "action": "list",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "orders": [
    {
      "id": "ID",
      "_owner": "ID",
      "userId": "ID",
      "items": "Object",
      "shippingAddress": "Object",
      "totalAmount": "Integer",
      "currency": "String",
      "status": "Enum",
      "status_": "String",
      "paymentStatus": "Enum",
      "paymentStatus_": "String",
      "placedAt": "Date",
      "stripePaymentIntentId": "String",
      "refundRequested": "Boolean",
      "refundAmount": "Integer",
      "adminNotes": "String",
      "orderHistory": "Object",
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

#### `Get Orderpayment2` API

This route is used to get the payment information by ID.

The `getOrderPayment2` API REST controller can be triggered via the following route:

`/v1/orderpayment2/:sys_orderPaymentId`

**Rest Request Parameters**

The `getOrderPayment2` api has got 1 request parameter

| Parameter          | Type | Required | Population                         |
| ------------------ | ---- | -------- | ---------------------------------- |
| sys_orderPaymentId | ID   | true     | request.params?.sys_orderPaymentId |

**sys_orderPaymentId** : This id paremeter is used to query the required data object.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/orderpayment2/:sys_orderPaymentId**

```js
axios({
  method: "GET",
  url: `/v1/orderpayment2/${sys_orderPaymentId}`,
  data: {},
  params: {},
});
```

**REST Response**

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
  "dataName": "sys_orderPayment",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "sys_orderPayment": {
    "id": "ID",
    "_owner": "ID",
    "ownerId": "ID",
    "orderId": "ID",
    "paymentId": "String",
    "paymentStatus": "String",
    "statusLiteral": "String",
    "redirectUrl": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `List Orderpayments2` API

This route is used to list all payments.

The `listOrderPayments2` API REST controller can be triggered via the following route:

`/v1/orderpayments2`

**Rest Request Parameters**
The `listOrderPayments2` api has got no request parameters.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/orderpayments2**

```js
axios({
  method: "GET",
  url: "/v1/orderpayments2",
  data: {},
  params: {},
});
```

**REST Response**

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
  "dataName": "sys_orderPayments",
  "method": "GET",
  "action": "list",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "sys_orderPayments": [
    {
      "id": "ID",
      "_owner": "ID",
      "ownerId": "ID",
      "orderId": "ID",
      "paymentId": "String",
      "paymentStatus": "String",
      "statusLiteral": "String",
      "redirectUrl": "String",
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

#### `Create Orderpayment` API

This route is used to create a new payment.

The `createOrderPayment` API REST controller can be triggered via the following route:

`/v1/orderpayment`

**Rest Request Parameters**

The `createOrderPayment` api has got 5 request parameters

| Parameter     | Type   | Required | Population                  |
| ------------- | ------ | -------- | --------------------------- |
| orderId       | ID     | true     | request.body?.orderId       |
| paymentId     | String | true     | request.body?.paymentId     |
| paymentStatus | String | true     | request.body?.paymentStatus |
| statusLiteral | String | true     | request.body?.statusLiteral |
| redirectUrl   | String | false    | request.body?.redirectUrl   |

**orderId** : an ID value to represent the orderId which is the ID parameter of the source order object
**paymentId** : A String value to represent the paymentId which is generated on the Stripe gateway. This id may represent different objects due to the payment gateway and the chosen flow type
**paymentStatus** : A string value to represent the payment status which belongs to the lifecyle of a Stripe payment.
**statusLiteral** : A string value to represent the logical payment status which belongs to the application lifecycle itself.
**redirectUrl** : A string value to represent return page of the frontend to show the result of the payment, this is used when the callback is made to server not the client.

**REST Request**
To access the api you can use the **REST** controller with the path **POST /v1/orderpayment**

```js
axios({
  method: "POST",
  url: "/v1/orderpayment",
  data: {
    orderId: "ID",
    paymentId: "String",
    paymentStatus: "String",
    statusLiteral: "String",
    redirectUrl: "String",
  },
  params: {},
});
```

**REST Response**

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
  "dataName": "sys_orderPayment",
  "method": "POST",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "sys_orderPayment": {
    "id": "ID",
    "_owner": "ID",
    "ownerId": "ID",
    "orderId": "ID",
    "paymentId": "String",
    "paymentStatus": "String",
    "statusLiteral": "String",
    "redirectUrl": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Update Orderpayment` API

This route is used to update an existing payment.

The `updateOrderPayment` API REST controller can be triggered via the following route:

`/v1/orderpayment/:sys_orderPaymentId`

**Rest Request Parameters**

The `updateOrderPayment` api has got 5 request parameters

| Parameter          | Type   | Required | Population                         |
| ------------------ | ------ | -------- | ---------------------------------- |
| sys_orderPaymentId | ID     | true     | request.params?.sys_orderPaymentId |
| paymentId          | String | false    | request.body?.paymentId            |
| paymentStatus      | String | false    | request.body?.paymentStatus        |
| statusLiteral      | String | false    | request.body?.statusLiteral        |
| redirectUrl        | String | false    | request.body?.redirectUrl          |

**sys_orderPaymentId** : This id paremeter is used to select the required data object that will be updated
**paymentId** : A String value to represent the paymentId which is generated on the Stripe gateway. This id may represent different objects due to the payment gateway and the chosen flow type
**paymentStatus** : A string value to represent the payment status which belongs to the lifecyle of a Stripe payment.
**statusLiteral** : A string value to represent the logical payment status which belongs to the application lifecycle itself.
**redirectUrl** : A string value to represent return page of the frontend to show the result of the payment, this is used when the callback is made to server not the client.

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/orderpayment/:sys_orderPaymentId**

```js
axios({
  method: "PATCH",
  url: `/v1/orderpayment/${sys_orderPaymentId}`,
  data: {
    paymentId: "String",
    paymentStatus: "String",
    statusLiteral: "String",
    redirectUrl: "String",
  },
  params: {},
});
```

**REST Response**

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
  "dataName": "sys_orderPayment",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "sys_orderPayment": {
    "id": "ID",
    "_owner": "ID",
    "ownerId": "ID",
    "orderId": "ID",
    "paymentId": "String",
    "paymentStatus": "String",
    "statusLiteral": "String",
    "redirectUrl": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Delete Orderpayment` API

This route is used to delete a payment.

The `deleteOrderPayment` API REST controller can be triggered via the following route:

`/v1/orderpayment/:sys_orderPaymentId`

**Rest Request Parameters**

The `deleteOrderPayment` api has got 1 request parameter

| Parameter          | Type | Required | Population                         |
| ------------------ | ---- | -------- | ---------------------------------- |
| sys_orderPaymentId | ID   | true     | request.params?.sys_orderPaymentId |

**sys_orderPaymentId** : This id paremeter is used to select the required data object that will be deleted

**REST Request**
To access the api you can use the **REST** controller with the path **DELETE /v1/orderpayment/:sys_orderPaymentId**

```js
axios({
  method: "DELETE",
  url: `/v1/orderpayment/${sys_orderPaymentId}`,
  data: {},
  params: {},
});
```

**REST Response**

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
  "dataName": "sys_orderPayment",
  "method": "DELETE",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "sys_orderPayment": {
    "id": "ID",
    "_owner": "ID",
    "ownerId": "ID",
    "orderId": "ID",
    "paymentId": "String",
    "paymentStatus": "String",
    "statusLiteral": "String",
    "redirectUrl": "String",
    "isActive": false,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `List Orderpayments2` API

This route is used to list all payments.

The `listOrderPayments2` API REST controller can be triggered via the following route:

`/v1/orderpayments2`

**Rest Request Parameters**
The `listOrderPayments2` api has got no request parameters.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/orderpayments2**

```js
axios({
  method: "GET",
  url: "/v1/orderpayments2",
  data: {},
  params: {},
});
```

**REST Response**

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
  "dataName": "sys_orderPayments",
  "method": "GET",
  "action": "list",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "sys_orderPayments": [
    {
      "id": "ID",
      "_owner": "ID",
      "ownerId": "ID",
      "orderId": "ID",
      "paymentId": "String",
      "paymentStatus": "String",
      "statusLiteral": "String",
      "redirectUrl": "String",
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

#### `Get Orderpaymentbyorderid` API

This route is used to get the payment information by order id.

The `getOrderPaymentByOrderId` API REST controller can be triggered via the following route:

`/v1/orderpaymentbyorderid/:sys_orderPaymentId`

**Rest Request Parameters**

The `getOrderPaymentByOrderId` api has got 1 request parameter

| Parameter          | Type | Required | Population                         |
| ------------------ | ---- | -------- | ---------------------------------- |
| sys_orderPaymentId | ID   | true     | request.params?.sys_orderPaymentId |

**sys_orderPaymentId** : This parameter will be used to select the data object that is queried

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/orderpaymentbyorderid/:sys_orderPaymentId**

```js
axios({
  method: "GET",
  url: `/v1/orderpaymentbyorderid/${sys_orderPaymentId}`,
  data: {},
  params: {},
});
```

**REST Response**

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
  "dataName": "sys_orderPayment",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "sys_orderPayment": {
    "id": "ID",
    "_owner": "ID",
    "ownerId": "ID",
    "orderId": "ID",
    "paymentId": "String",
    "paymentStatus": "String",
    "statusLiteral": "String",
    "redirectUrl": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Get Orderpaymentbypaymentid` API

This route is used to get the payment information by payment id.

The `getOrderPaymentByPaymentId` API REST controller can be triggered via the following route:

`/v1/orderpaymentbypaymentid/:sys_orderPaymentId`

**Rest Request Parameters**

The `getOrderPaymentByPaymentId` api has got 1 request parameter

| Parameter          | Type | Required | Population                         |
| ------------------ | ---- | -------- | ---------------------------------- |
| sys_orderPaymentId | ID   | true     | request.params?.sys_orderPaymentId |

**sys_orderPaymentId** : This parameter will be used to select the data object that is queried

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/orderpaymentbypaymentid/:sys_orderPaymentId**

```js
axios({
  method: "GET",
  url: `/v1/orderpaymentbypaymentid/${sys_orderPaymentId}`,
  data: {},
  params: {},
});
```

**REST Response**

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
  "dataName": "sys_orderPayment",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "sys_orderPayment": {
    "id": "ID",
    "_owner": "ID",
    "ownerId": "ID",
    "orderId": "ID",
    "paymentId": "String",
    "paymentStatus": "String",
    "statusLiteral": "String",
    "redirectUrl": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Get Orderpayment2` API

This route is used to get the payment information by ID.

The `getOrderPayment2` API REST controller can be triggered via the following route:

`/v1/orderpayment2/:sys_orderPaymentId`

**Rest Request Parameters**

The `getOrderPayment2` api has got 1 request parameter

| Parameter          | Type | Required | Population                         |
| ------------------ | ---- | -------- | ---------------------------------- |
| sys_orderPaymentId | ID   | true     | request.params?.sys_orderPaymentId |

**sys_orderPaymentId** : This id paremeter is used to query the required data object.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/orderpayment2/:sys_orderPaymentId**

```js
axios({
  method: "GET",
  url: `/v1/orderpayment2/${sys_orderPaymentId}`,
  data: {},
  params: {},
});
```

**REST Response**

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
  "dataName": "sys_orderPayment",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "sys_orderPayment": {
    "id": "ID",
    "_owner": "ID",
    "ownerId": "ID",
    "orderId": "ID",
    "paymentId": "String",
    "paymentStatus": "String",
    "statusLiteral": "String",
    "redirectUrl": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Checkout Startorder` API

Start checkout for order

The `checkoutStartOrder` API REST controller can be triggered via the following route:

`/v1/checkoutstartorder/:orderId`

**Rest Request Parameters**

The `checkoutStartOrder` api has got 2 request parameters

| Parameter         | Type   | Required | Population                      |
| ----------------- | ------ | -------- | ------------------------------- |
| orderId           | ID     | true     | request.params?.orderId         |
| paymentUserParams | Object | false    | request.body?.paymentUserParams |

**orderId** : This id paremeter is used to select the required data object that will be updated
**paymentUserParams** : The user parameters that should be defined to start a stripe payment process

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/checkoutstartorder/:orderId**

```js
axios({
  method: "PATCH",
  url: `/v1/checkoutstartorder/${orderId}`,
  data: {
    paymentUserParams: "Object",
  },
  params: {},
});
```

**REST Response**

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
  "dataName": "order",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "order": {
    "id": "ID",
    "_owner": "ID",
    "userId": "ID",
    "items": "Object",
    "shippingAddress": "Object",
    "totalAmount": "Integer",
    "currency": "String",
    "status": "Enum",
    "status_": "String",
    "paymentStatus": "Enum",
    "paymentStatus_": "String",
    "placedAt": "Date",
    "stripePaymentIntentId": "String",
    "refundRequested": "Boolean",
    "refundAmount": "Integer",
    "adminNotes": "String",
    "orderHistory": "Object",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Checkout Completeorder` API

Complete checkout for order

The `checkoutCompleteOrder` API REST controller can be triggered via the following route:

`/v1/checkoutcompleteorder/:orderId`

**Rest Request Parameters**

The `checkoutCompleteOrder` api has got 2 request parameters

| Parameter         | Type   | Required | Population                      |
| ----------------- | ------ | -------- | ------------------------------- |
| orderId           | ID     | true     | request.params?.orderId         |
| paymentUserParams | Object | false    | request.body?.paymentUserParams |

**orderId** : This id paremeter is used to select the required data object that will be updated
**paymentUserParams** : The user parameters that should be defined to complete a stripe payment process

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/checkoutcompleteorder/:orderId**

```js
axios({
  method: "PATCH",
  url: `/v1/checkoutcompleteorder/${orderId}`,
  data: {
    paymentUserParams: "Object",
  },
  params: {},
});
```

**REST Response**

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
  "dataName": "order",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "order": {
    "id": "ID",
    "_owner": "ID",
    "userId": "ID",
    "items": "Object",
    "shippingAddress": "Object",
    "totalAmount": "Integer",
    "currency": "String",
    "status": "Enum",
    "status_": "String",
    "paymentStatus": "Enum",
    "paymentStatus_": "String",
    "placedAt": "Date",
    "stripePaymentIntentId": "String",
    "refundRequested": "Boolean",
    "refundAmount": "Integer",
    "adminNotes": "String",
    "orderHistory": "Object",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Checkout Refreshorder` API

Refresh checkout for order

The `checkoutRefreshOrder` API REST controller can be triggered via the following route:

`/v1/checkoutrefreshorder/:orderId`

**Rest Request Parameters**

The `checkoutRefreshOrder` api has got 2 request parameters

| Parameter         | Type   | Required | Population                      |
| ----------------- | ------ | -------- | ------------------------------- |
| orderId           | ID     | true     | request.params?.orderId         |
| paymentUserParams | Object | false    | request.body?.paymentUserParams |

**orderId** : This id paremeter is used to select the required data object that will be updated
**paymentUserParams** : The user parameters that should be defined to refresh a stripe payment process

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/checkoutrefreshorder/:orderId**

```js
axios({
  method: "PATCH",
  url: `/v1/checkoutrefreshorder/${orderId}`,
  data: {
    paymentUserParams: "Object",
  },
  params: {},
});
```

**REST Response**

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
  "dataName": "order",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "order": {
    "id": "ID",
    "_owner": "ID",
    "userId": "ID",
    "items": "Object",
    "shippingAddress": "Object",
    "totalAmount": "Integer",
    "currency": "String",
    "status": "Enum",
    "status_": "String",
    "paymentStatus": "Enum",
    "paymentStatus_": "String",
    "placedAt": "Date",
    "stripePaymentIntentId": "String",
    "refundRequested": "Boolean",
    "refundAmount": "Integer",
    "adminNotes": "String",
    "orderHistory": "Object",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Get Paymentcustomerbyuserid` API

This route is used to get the payment customer information by user id.

The `getPaymentCustomerByUserId` API REST controller can be triggered via the following route:

`/v1/paymentcustomerbyuserid/:sys_paymentCustomerId`

**Rest Request Parameters**

The `getPaymentCustomerByUserId` api has got 1 request parameter

| Parameter             | Type | Required | Population                            |
| --------------------- | ---- | -------- | ------------------------------------- |
| sys_paymentCustomerId | ID   | true     | request.params?.sys_paymentCustomerId |

**sys_paymentCustomerId** : This parameter will be used to select the data object that is queried

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/paymentcustomerbyuserid/:sys_paymentCustomerId**

```js
axios({
  method: "GET",
  url: `/v1/paymentcustomerbyuserid/${sys_paymentCustomerId}`,
  data: {},
  params: {},
});
```

**REST Response**

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
  "dataName": "sys_paymentCustomer",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "sys_paymentCustomer": {
    "id": "ID",
    "_owner": "ID",
    "userId": "ID",
    "customerId": "String",
    "platform": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `List Paymentcustomers` API

This route is used to list all payment customers.

The `listPaymentCustomers` API REST controller can be triggered via the following route:

`/v1/paymentcustomers`

**Rest Request Parameters**
The `listPaymentCustomers` api has got no request parameters.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/paymentcustomers**

```js
axios({
  method: "GET",
  url: "/v1/paymentcustomers",
  data: {},
  params: {},
});
```

**REST Response**

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
  "dataName": "sys_paymentCustomers",
  "method": "GET",
  "action": "list",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "sys_paymentCustomers": [
    {
      "id": "ID",
      "_owner": "ID",
      "userId": "ID",
      "customerId": "String",
      "platform": "String",
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

#### `List Paymentcustomermethods` API

This route is used to list all payment customer methods.

The `listPaymentCustomerMethods` API REST controller can be triggered via the following route:

`/v1/paymentcustomermethods`

**Rest Request Parameters**
The `listPaymentCustomerMethods` api has got no request parameters.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/paymentcustomermethods**

```js
axios({
  method: "GET",
  url: "/v1/paymentcustomermethods",
  data: {},
  params: {},
});
```

**REST Response**

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
  "dataName": "sys_paymentMethods",
  "method": "GET",
  "action": "list",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "sys_paymentMethods": [
    {
      "id": "ID",
      "_owner": "ID",
      "paymentMethodId": "String",
      "userId": "ID",
      "customerId": "String",
      "cardHolderName": "String",
      "cardHolderZip": "String",
      "platform": "String",
      "cardInfo": "Object",
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

## NotificationPreferences Service

Manages user and admin notification preferences, controlling which types of notification events are delivered and how, with strong ownership enforcement and session-driven integrity.

### NotificationPreferences Service Data Objects

**UserNotificationPreferences**
Stores notification preferences for a user, indicating which event types (order, shipping, promo, payment, system) they wish to receive notifications for.

**AdminNotificationConfig**
Stores notification configuration for administrators, specifying which system events should trigger notifications, preferred delivery channels, and enablement status.

### NotificationPreferences Service Access urls

This service is accessible via the following environment-specific URLs:

- **Preview:** `https://ecomm.prw.mindbricks.com/notificationpreferences-api`
- **Staging:** `https://ecomm-stage.mindbricks.co/notificationpreferences-api`
- **Production:** `https://ecomm.mindbricks.co/notificationpreferences-api`

#### `Create Usernotificationpreferences` API

Create notification preferences for current user (only one per user).

The `createUserNotificationPreferences` API REST controller can be triggered via the following route:

`/v1/usernotificationpreferencess`

**Rest Request Parameters**

The `createUserNotificationPreferences` api has got 5 request parameters

| Parameter       | Type    | Required | Population                    |
| --------------- | ------- | -------- | ----------------------------- |
| orderUpdates    | Boolean | true     | request.body?.orderUpdates    |
| shippingUpdates | Boolean | true     | request.body?.shippingUpdates |
| promoOptIn      | Boolean | true     | request.body?.promoOptIn      |
| paymentEvents   | Boolean | true     | request.body?.paymentEvents   |
| systemEvents    | Boolean | false    | request.body?.systemEvents    |

**orderUpdates** : Receive notifications for order status changes.
**shippingUpdates** : Receive notifications for shipping/tracking events.
**promoOptIn** : Opt-in for receiving promotional or marketing notifications/emails.
**paymentEvents** : Receive notifications for payment events (e.g. payment received, failed).
**systemEvents** : (Admin Only) Receive system/platform-level notifications. Ignored for regular users.

**REST Request**
To access the api you can use the **REST** controller with the path **POST /v1/usernotificationpreferencess**

```js
axios({
  method: "POST",
  url: "/v1/usernotificationpreferencess",
  data: {
    orderUpdates: "Boolean",
    shippingUpdates: "Boolean",
    promoOptIn: "Boolean",
    paymentEvents: "Boolean",
    systemEvents: "Boolean",
  },
  params: {},
});
```

**REST Response**

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
  "dataName": "userNotificationPreferences",
  "method": "POST",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "userNotificationPreferences": {
    "id": "ID",
    "_owner": "ID",
    "userId": "ID",
    "orderUpdates": "Boolean",
    "shippingUpdates": "Boolean",
    "promoOptIn": "Boolean",
    "paymentEvents": "Boolean",
    "systemEvents": "Boolean",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Get Usernotificationpreferences` API

Get notification preferences for the current user (or absolute admin for any user).

The `getUserNotificationPreferences` API REST controller can be triggered via the following route:

`/v1/usernotificationpreferencess/:userNotificationPreferencesId`

**Rest Request Parameters**

The `getUserNotificationPreferences` api has got 1 request parameter

| Parameter                     | Type | Required | Population                                    |
| ----------------------------- | ---- | -------- | --------------------------------------------- |
| userNotificationPreferencesId | ID   | true     | request.params?.userNotificationPreferencesId |

**userNotificationPreferencesId** : This id paremeter is used to query the required data object.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/usernotificationpreferencess/:userNotificationPreferencesId**

```js
axios({
  method: "GET",
  url: `/v1/usernotificationpreferencess/${userNotificationPreferencesId}`,
  data: {},
  params: {},
});
```

**REST Response**

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
  "dataName": "userNotificationPreferences",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "userNotificationPreferences": {
    "id": "ID",
    "_owner": "ID",
    "userId": "ID",
    "orderUpdates": "Boolean",
    "shippingUpdates": "Boolean",
    "promoOptIn": "Boolean",
    "paymentEvents": "Boolean",
    "systemEvents": "Boolean",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Update Usernotificationpreferences` API

Update notification preferences for the current user (or absolute admin for any user).

The `updateUserNotificationPreferences` API REST controller can be triggered via the following route:

`/v1/usernotificationpreferencess/:userNotificationPreferencesId`

**Rest Request Parameters**

The `updateUserNotificationPreferences` api has got 6 request parameters

| Parameter                     | Type    | Required | Population                                    |
| ----------------------------- | ------- | -------- | --------------------------------------------- |
| userNotificationPreferencesId | ID      | true     | request.params?.userNotificationPreferencesId |
| orderUpdates                  | Boolean | false    | request.body?.orderUpdates                    |
| shippingUpdates               | Boolean | false    | request.body?.shippingUpdates                 |
| promoOptIn                    | Boolean | false    | request.body?.promoOptIn                      |
| paymentEvents                 | Boolean | false    | request.body?.paymentEvents                   |
| systemEvents                  | Boolean | false    | request.body?.systemEvents                    |

**userNotificationPreferencesId** : This id paremeter is used to select the required data object that will be updated
**orderUpdates** : Receive notifications for order status changes.
**shippingUpdates** : Receive notifications for shipping/tracking events.
**promoOptIn** : Opt-in for receiving promotional or marketing notifications/emails.
**paymentEvents** : Receive notifications for payment events (e.g. payment received, failed).
**systemEvents** : (Admin Only) Receive system/platform-level notifications. Ignored for regular users.

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/usernotificationpreferencess/:userNotificationPreferencesId**

```js
axios({
  method: "PATCH",
  url: `/v1/usernotificationpreferencess/${userNotificationPreferencesId}`,
  data: {
    orderUpdates: "Boolean",
    shippingUpdates: "Boolean",
    promoOptIn: "Boolean",
    paymentEvents: "Boolean",
    systemEvents: "Boolean",
  },
  params: {},
});
```

**REST Response**

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
  "dataName": "userNotificationPreferences",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "userNotificationPreferences": {
    "id": "ID",
    "_owner": "ID",
    "userId": "ID",
    "orderUpdates": "Boolean",
    "shippingUpdates": "Boolean",
    "promoOptIn": "Boolean",
    "paymentEvents": "Boolean",
    "systemEvents": "Boolean",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Delete Usernotificationpreferences` API

Delete notification preferences for the current user (or absolute admin for any user).

The `deleteUserNotificationPreferences` API REST controller can be triggered via the following route:

`/v1/usernotificationpreferencess/:userNotificationPreferencesId`

**Rest Request Parameters**

The `deleteUserNotificationPreferences` api has got 1 request parameter

| Parameter                     | Type | Required | Population                                    |
| ----------------------------- | ---- | -------- | --------------------------------------------- |
| userNotificationPreferencesId | ID   | true     | request.params?.userNotificationPreferencesId |

**userNotificationPreferencesId** : This id paremeter is used to select the required data object that will be deleted

**REST Request**
To access the api you can use the **REST** controller with the path **DELETE /v1/usernotificationpreferencess/:userNotificationPreferencesId**

```js
axios({
  method: "DELETE",
  url: `/v1/usernotificationpreferencess/${userNotificationPreferencesId}`,
  data: {},
  params: {},
});
```

**REST Response**

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
  "dataName": "userNotificationPreferences",
  "method": "DELETE",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "userNotificationPreferences": {
    "id": "ID",
    "_owner": "ID",
    "userId": "ID",
    "orderUpdates": "Boolean",
    "shippingUpdates": "Boolean",
    "promoOptIn": "Boolean",
    "paymentEvents": "Boolean",
    "systemEvents": "Boolean",
    "isActive": false,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `List Usernotificationpreferences` API

Admin: List all user notification preference objects.

The `listUserNotificationPreferences` API REST controller can be triggered via the following route:

`/v1/usernotificationpreferencess`

**Rest Request Parameters**
The `listUserNotificationPreferences` api has got no request parameters.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/usernotificationpreferencess**

```js
axios({
  method: "GET",
  url: "/v1/usernotificationpreferencess",
  data: {},
  params: {},
});
```

**REST Response**

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
  "dataName": "userNotificationPreferencess",
  "method": "GET",
  "action": "list",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "userNotificationPreferencess": [
    {
      "id": "ID",
      "_owner": "ID",
      "userId": "ID",
      "orderUpdates": "Boolean",
      "shippingUpdates": "Boolean",
      "promoOptIn": "Boolean",
      "paymentEvents": "Boolean",
      "systemEvents": "Boolean",
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

#### `Create Adminnotificationconfig` API

Create notification config settings for current admin. Only one config per adminId.

The `createAdminNotificationConfig` API REST controller can be triggered via the following route:

`/v1/adminnotificationconfigs`

**Rest Request Parameters**

The `createAdminNotificationConfig` api has got 3 request parameters

| Parameter     | Type    | Required | Population                  |
| ------------- | ------- | -------- | --------------------------- |
| triggerEvents | String  | true     | request.body?.triggerEvents |
| notifyBy      | String  | true     | request.body?.notifyBy      |
| enabled       | Boolean | true     | request.body?.enabled       |

**triggerEvents** : Array of event code strings (e.g. orderPlaced, paymentFailed) that trigger admin notification.
**notifyBy** : Array of preferred notification channels (e.g., email, inApp).
**enabled** : If false, no notifications will be sent; acts as a master enable/disable flag.

**REST Request**
To access the api you can use the **REST** controller with the path **POST /v1/adminnotificationconfigs**

```js
axios({
  method: "POST",
  url: "/v1/adminnotificationconfigs",
  data: {
    triggerEvents: "String",
    notifyBy: "String",
    enabled: "Boolean",
  },
  params: {},
});
```

**REST Response**

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
  "dataName": "adminNotificationConfig",
  "method": "POST",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "adminNotificationConfig": {
    "id": "ID",
    "_owner": "ID",
    "adminId": "ID",
    "triggerEvents": "String",
    "notifyBy": "String",
    "enabled": "Boolean",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Get Adminnotificationconfig` API

Get notification config for current admin or (absolute admin can access any admin's config).

The `getAdminNotificationConfig` API REST controller can be triggered via the following route:

`/v1/adminnotificationconfigs/:adminNotificationConfigId`

**Rest Request Parameters**

The `getAdminNotificationConfig` api has got 1 request parameter

| Parameter                 | Type | Required | Population                                |
| ------------------------- | ---- | -------- | ----------------------------------------- |
| adminNotificationConfigId | ID   | true     | request.params?.adminNotificationConfigId |

**adminNotificationConfigId** : This id paremeter is used to query the required data object.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/adminnotificationconfigs/:adminNotificationConfigId**

```js
axios({
  method: "GET",
  url: `/v1/adminnotificationconfigs/${adminNotificationConfigId}`,
  data: {},
  params: {},
});
```

**REST Response**

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
  "dataName": "adminNotificationConfig",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "adminNotificationConfig": {
    "id": "ID",
    "_owner": "ID",
    "adminId": "ID",
    "triggerEvents": "String",
    "notifyBy": "String",
    "enabled": "Boolean",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Update Adminnotificationconfig` API

Update admin notification config (admins only, strict owner enforced, absolute admin can override).

The `updateAdminNotificationConfig` API REST controller can be triggered via the following route:

`/v1/adminnotificationconfigs/:adminNotificationConfigId`

**Rest Request Parameters**

The `updateAdminNotificationConfig` api has got 4 request parameters

| Parameter                 | Type    | Required | Population                                |
| ------------------------- | ------- | -------- | ----------------------------------------- |
| adminNotificationConfigId | ID      | true     | request.params?.adminNotificationConfigId |
| triggerEvents             | String  | false    | request.body?.triggerEvents               |
| notifyBy                  | String  | false    | request.body?.notifyBy                    |
| enabled                   | Boolean | false    | request.body?.enabled                     |

**adminNotificationConfigId** : This id paremeter is used to select the required data object that will be updated
**triggerEvents** : Array of event code strings (e.g. orderPlaced, paymentFailed) that trigger admin notification.
**notifyBy** : Array of preferred notification channels (e.g., email, inApp).
**enabled** : If false, no notifications will be sent; acts as a master enable/disable flag.

**REST Request**
To access the api you can use the **REST** controller with the path **PATCH /v1/adminnotificationconfigs/:adminNotificationConfigId**

```js
axios({
  method: "PATCH",
  url: `/v1/adminnotificationconfigs/${adminNotificationConfigId}`,
  data: {
    triggerEvents: "String",
    notifyBy: "String",
    enabled: "Boolean",
  },
  params: {},
});
```

**REST Response**

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
  "dataName": "adminNotificationConfig",
  "method": "PATCH",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "adminNotificationConfig": {
    "id": "ID",
    "_owner": "ID",
    "adminId": "ID",
    "triggerEvents": "String",
    "notifyBy": "String",
    "enabled": "Boolean",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Delete Adminnotificationconfig` API

Delete admin notification config (admins only, owner or absolute admin).

The `deleteAdminNotificationConfig` API REST controller can be triggered via the following route:

`/v1/adminnotificationconfigs/:adminNotificationConfigId`

**Rest Request Parameters**

The `deleteAdminNotificationConfig` api has got 1 request parameter

| Parameter                 | Type | Required | Population                                |
| ------------------------- | ---- | -------- | ----------------------------------------- |
| adminNotificationConfigId | ID   | true     | request.params?.adminNotificationConfigId |

**adminNotificationConfigId** : This id paremeter is used to select the required data object that will be deleted

**REST Request**
To access the api you can use the **REST** controller with the path **DELETE /v1/adminnotificationconfigs/:adminNotificationConfigId**

```js
axios({
  method: "DELETE",
  url: `/v1/adminnotificationconfigs/${adminNotificationConfigId}`,
  data: {},
  params: {},
});
```

**REST Response**

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
  "dataName": "adminNotificationConfig",
  "method": "DELETE",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "adminNotificationConfig": {
    "id": "ID",
    "_owner": "ID",
    "adminId": "ID",
    "triggerEvents": "String",
    "notifyBy": "String",
    "enabled": "Boolean",
    "isActive": false,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `List Adminnotificationconfigs` API

List all admin notification configs (admins/absolute admins only).

The `listAdminNotificationConfigs` API REST controller can be triggered via the following route:

`/v1/adminnotificationconfigs`

**Rest Request Parameters**
The `listAdminNotificationConfigs` api has got no request parameters.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/adminnotificationconfigs**

```js
axios({
  method: "GET",
  url: "/v1/adminnotificationconfigs",
  data: {},
  params: {},
});
```

**REST Response**

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
  "dataName": "adminNotificationConfigs",
  "method": "GET",
  "action": "list",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "adminNotificationConfigs": [
    {
      "id": "ID",
      "_owner": "ID",
      "adminId": "ID",
      "triggerEvents": "String",
      "notifyBy": "String",
      "enabled": "Boolean",
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

## Reporting Service

Aggregates business and sales analytics from orders and products. Provides report datasets for revenue, orders, and product performance and supports data exports (CSV/JSON).

### Reporting Service Data Objects

**SalesReport**
Aggregated business/sales analytics snapshot for defined date range (on-demand for reporting/dashboard).

**ExportJob**
Tracks an export operation for orders or product catalog (for CSV/JSON download by admin).

**ReportingJobAudit**
(Optional: for extension) Audit log for reporting/export operations (who, when, what). Not exposed in CRUD for MVP.

### Reporting Service Access urls

This service is accessible via the following environment-specific URLs:

- **Preview:** `https://ecomm.prw.mindbricks.com/reporting-api`
- **Staging:** `https://ecomm-stage.mindbricks.co/reporting-api`
- **Production:** `https://ecomm.mindbricks.co/reporting-api`

#### `Create Salesreport` API

On-demand aggregate sales/business analytics for given date range. Not persistent: this is a report query, not true create.

The `createSalesReport` API REST controller can be triggered via the following route:

`/v1/salesreports`

**Rest Request Parameters**

The `createSalesReport` api has got 7 request parameters

| Parameter    | Type    | Required | Population                 |
| ------------ | ------- | -------- | -------------------------- |
| dateRange    | Object  | true     | request.body?.dateRange    |
| totalRevenue | Double  | true     | request.body?.totalRevenue |
| orderCount   | Integer | true     | request.body?.orderCount   |
| productCount | Integer | true     | request.body?.productCount |
| bestsellers  | Object  | true     | request.body?.bestsellers  |
| refundsTotal | Double  | true     | request.body?.refundsTotal |
| exportJobId  | ID      | false    | request.body?.exportJobId  |

**dateRange** : Reporting interval: {start, end} Date fields.
**totalRevenue** : Sum of totalAmount for paid/completed orders in range.
**orderCount** : Number of completed orders in the date range.
**productCount** : Unique products ordered in period (based on sold counts in orders).
**bestsellers** : Array of bestseller products in range: {productId, productName, soldCount}.
**refundsTotal** : Sum of all refunded order amounts (in minor unit) in date range.
**exportJobId** : Optional link: the export job this report is attached to (if exported/snapshotted).

**REST Request**
To access the api you can use the **REST** controller with the path **POST /v1/salesreports**

```js
axios({
  method: "POST",
  url: "/v1/salesreports",
  data: {
    dateRange: "Object",
    totalRevenue: "Double",
    orderCount: "Integer",
    productCount: "Integer",
    bestsellers: "Object",
    refundsTotal: "Double",
    exportJobId: "ID",
  },
  params: {},
});
```

**REST Response**

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
  "dataName": "salesReport",
  "method": "POST",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "salesReport": {
    "id": "ID",
    "_owner": "ID",
    "dateRange": "Object",
    "totalRevenue": "Double",
    "orderCount": "Integer",
    "productCount": "Integer",
    "bestsellers": "Object",
    "refundsTotal": "Double",
    "exportJobId": "ID",
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date",
    "isActive": true
  }
}
```

#### `Create Exportjob` API

Admin requests a new export (orders or products). Triggers export process, persists job status, owner, downloadUrl on completion.

The `createExportJob` API REST controller can be triggered via the following route:

`/v1/exportjobs`

**Rest Request Parameters**

The `createExportJob` api has got 4 request parameters

| Parameter   | Type   | Required | Population                |
| ----------- | ------ | -------- | ------------------------- |
| exportType  | Enum   | true     | request.body?.exportType  |
| status      | Enum   | true     | request.body?.status      |
| completedAt | Date   | false    | request.body?.completedAt |
| downloadUrl | String | false    | request.body?.downloadUrl |

**exportType** : Export source: orders or products.
**status** : Export job status: pending, completed, failed.
**completedAt** : When export job completed (null if not yet).
**downloadUrl** : URL to download exported file; set on completion.

**REST Request**
To access the api you can use the **REST** controller with the path **POST /v1/exportjobs**

```js
axios({
  method: "POST",
  url: "/v1/exportjobs",
  data: {
    exportType: "Enum",
    status: "Enum",
    completedAt: "Date",
    downloadUrl: "String",
  },
  params: {},
});
```

**REST Response**

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
  "dataName": "exportJob",
  "method": "POST",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "exportJob": {
    "id": "ID",
    "_owner": "ID",
    "exportType": "Enum",
    "exportType_": "String",
    "status": "Enum",
    "status_": "String",
    "requestedBy": "ID",
    "startedAt": "Date",
    "completedAt": "Date",
    "downloadUrl": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `Get Exportjob` API

Get exportJob details (admin or owner only).

The `getExportJob` API REST controller can be triggered via the following route:

`/v1/exportjobs/:exportJobId`

**Rest Request Parameters**

The `getExportJob` api has got 1 request parameter

| Parameter   | Type | Required | Population                  |
| ----------- | ---- | -------- | --------------------------- |
| exportJobId | ID   | true     | request.params?.exportJobId |

**exportJobId** : This id paremeter is used to query the required data object.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/exportjobs/:exportJobId**

```js
axios({
  method: "GET",
  url: `/v1/exportjobs/${exportJobId}`,
  data: {},
  params: {},
});
```

**REST Response**

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
  "dataName": "exportJob",
  "method": "GET",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "exportJob": {
    "id": "ID",
    "_owner": "ID",
    "exportType": "Enum",
    "exportType_": "String",
    "status": "Enum",
    "status_": "String",
    "requestedBy": "ID",
    "startedAt": "Date",
    "completedAt": "Date",
    "downloadUrl": "String",
    "isActive": true,
    "recordVersion": "Integer",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

#### `List Exportjobs` API

List all export jobs for admin (or for current user if not absolute admin).

The `listExportJobs` API REST controller can be triggered via the following route:

`/v1/exportjobs`

**Rest Request Parameters**
The `listExportJobs` api has got no request parameters.

**REST Request**
To access the api you can use the **REST** controller with the path **GET /v1/exportjobs**

```js
axios({
  method: "GET",
  url: "/v1/exportjobs",
  data: {},
  params: {},
});
```

**REST Response**

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
  "dataName": "exportJobs",
  "method": "GET",
  "action": "list",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "exportJobs": [
    {
      "id": "ID",
      "_owner": "ID",
      "exportType": "Enum",
      "exportType_": "String",
      "status": "Enum",
      "status_": "String",
      "requestedBy": "ID",
      "startedAt": "Date",
      "completedAt": "Date",
      "downloadUrl": "String",
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
