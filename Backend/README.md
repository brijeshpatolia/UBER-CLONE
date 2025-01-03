# User Endpoints Documentation

## User Registration Endpoint

### Endpoint

`POST /user/register`

### Description

This endpoint allows users to register by providing their personal details such as full name, email, and password. Upon successful registration, a JSON Web Token (JWT) is returned for authentication purposes.

### Request Body

The request body must be a JSON object containing the following fields:

| Field                | Type     | Required | Description                                                |
| -------------------- | -------- | -------- | ---------------------------------------------------------- |
| `fullname.firstname` | `String` | Yes      | The user's first name. Must be at least 3 characters long. |
| `fullname.lastname`  | `String` | No       | The user's last name.                                      |
| `email`              | `String` | Yes      | A valid email address. Must be unique.                     |
| `password`           | `String` | Yes      | The user's password. Must be at least 3 characters long.   |

#### Example Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

### Response

#### Success (201 Created)

```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "_id": "64bfc1a2f9f4a0a5c7f6a9d7"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Error Responses

**400 Bad Request**  
Occurs when the request body fails validation.  
Example:

```json
{
  "errors": [
    {
      "msg": "First name is required",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password should be at least 3 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

---

## User Login Endpoint

### Endpoint

`POST /user/login`

### Description

This endpoint allows users to log in by providing their email and password. Upon successful authentication, a JSON Web Token (JWT) is returned for authentication purposes.

### Request Body

The request body must be a JSON object containing the following fields:

| Field      | Type     | Required | Description            |
| ---------- | -------- | -------- | ---------------------- |
| `email`    | `String` | Yes      | A valid email address. |
| `password` | `String` | Yes      | The user's password.   |

#### Example Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

### Response

#### Success (200 OK)

```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "_id": "64bfc1a2f9f4a0a5c7f6a9d7"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Error Responses

**400 Bad Request**  
Occurs when the request body fails validation.  
Example:

```json
{
  "errors": [
    { "msg": "Email is required", "param": "email", "location": "body" }
  ]
}
```

**401 Unauthorized**  
Occurs when the email or password is invalid.  
Example (invalid email):

```json
{
  "message": "Invalid email"
}
```

Example (invalid password):

```json
{
  "message": "Invalid password"
}
```

---

## User Logout Endpoint

### Endpoint

`GET /user/logout`

### Description

This endpoint logs out the authenticated user by clearing the authentication token from cookies and blacklisting the token to prevent future use.

### Request Headers

The request must include the authentication token either in the cookies or in the `Authorization` header as a Bearer token.

| Header          | Type     | Required | Description                          |
| --------------- | -------- | -------- | ------------------------------------ |
| `Authorization` | `String` | No       | The Bearer token for authentication. |

#### Example Request

```http
GET /user/logout HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Response

#### Success (200 OK)

```json
{
  "message": "Logged out successfully!"
}
```

#### Error Responses

**400 Bad Request**  
Occurs when no token is provided.  
Example:

```json
{
  "error": "No token provided for logout!"
}
```

**500 Internal Server Error**  
Occurs when there is an unexpected error on the server.  
Example:

```json
{
  "message": "Internal server error"
}
```

---

## User Profile Endpoint

### Endpoint

`GET /user/profile`

### Description

This endpoint retrieves the profile information of the authenticated user.

### Request Headers

The request must include the authentication token either in the cookies or in the `Authorization` header as a Bearer token.

| Header          | Type     | Required | Description                          |
| --------------- | -------- | -------- | ------------------------------------ |
| `Authorization` | `String` | No       | The Bearer token for authentication. |

#### Example Request

```http
GET /user/profile HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Response

#### Success (200 OK)

```json
{
  "_id": "64bfc1a2f9f4a0a5c7f6a9d7",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

#### Error Responses

**401 Unauthorized**  
Occurs when the authentication token is missing or invalid.  
Example:

```json
{
  "error": "You are not authenticated!"
}
```

---
