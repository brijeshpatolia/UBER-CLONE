# User Registration Endpoint

## Endpoint
`POST /user/register`

## Description
This endpoint allows users to register by providing their personal details such as full name, email, and password. Upon successful registration, a JSON Web Token (JWT) is returned for authentication purposes.

## Request Body
The request body must be a JSON object containing the following fields:

| Field               | Type     | Required | Description                                              |
|---------------------|----------|----------|----------------------------------------------------------|
| `fullname.firstname`| `String` | Yes      | The user's first name. Must be at least 3 characters long. |
| `fullname.lastname` | `String` | No       | The user's last name.                                     |
| `email`             | `String` | Yes      | A valid email address. Must be unique.                   |
| `password`          | `String` | Yes      | The user's password. Must be at least 3 characters long. |

### Example Request Body
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