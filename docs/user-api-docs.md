
### User Registration

This endpoint allows users to register by providing their email and password.

- **URL:** `/user/register`
- **HTTP Method:** POST

#### Request Body

- `email` (required): The email address of the user.
- `password` (required): The password for the user account.

#### Successful Response (Status Code: 201 Created)

```json
{
  "user": {
    "id": 1,
    "email": "user@example.com"
  },
  "token": "your-auth-token"
}
```

#### Example API Call with Axios

```javascript
const axios = require('axios');

axios.post('http://localhost:3000/user/register', {
  email: 'user@example.com',
  password: 'securepassword'
})
  .then((response) => {
    console.log('Registration successful:', response.data);
  })
  .catch((error) => {
    console.error('Registration Error:', error.response.data);
  });
```

#### Example API Call with Curl

```bash
curl -X POST http://localhost:3000/user/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "securepassword"}'
```

#### Error Responses

- Status Code: 400 Bad Request
  - If the request body is missing `email` or `password`:
    ```json
    { "message": "Email and password are required" }
    ```
  - If the email format is invalid:
    ```json
    { "message": "Invalid email format" }
    ```
  - If the password is too short:
    ```json
    { "message": "Password is too short" }
    ```

- Status Code: 400 Bad Request
  - If the user with the provided email already exists:
    ```json
    { "message": "User already exists" }
    ```

- Status Code: 500 Internal Server Error
  - If there is an internal server error during registration:
    ```json
    { "message": "Internal Server Error" }
    ```

### User Login

This endpoint allows users to log in by providing their email and password.

- **URL:** `/user/login`
- **HTTP Method:** POST

#### Request Body

- `email` (required): The email address of the user.
- `password` (required): The password for the user account.

#### Successful Response (Status Code: 200 OK)

```json
{
  "user": {
    "id": 1,
    "email": "user@example.com"
  },
  "token": "your-auth-token"
}
```

#### Example API Call with Axios

```javascript
const axios = require('axios');

axios.post('http://localhost:3000/user/login', {
  email: 'user@example.com',
  password: 'securepassword'
})
  .then((response) => {
    console.log('Login successful:', response.data);
  })
  .catch((error) => {
    console.error('Login Error:', error.response.data);
  });
```

#### Example API Call with Curl

```bash
curl -X POST http://localhost:3000/user/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "securepassword"}'
```

#### Error Responses

- Status Code: 401 Unauthorized
  - If the email or password is incorrect:
    ```json
    { "message": "Authentication failed" }
    ```

- Status Code: 500 Internal Server Error
  - If there is an internal server error during login:
    ```json
    { "message": "Internal Server Error" }
    ```

### Get User Profile

This endpoint allows authenticated users to retrieve their own user profile.

- **URL:** `/user/profile`
- **HTTP Method:** GET
- **Authentication:** This endpoint requires authentication. Users must include a valid JWT token in the request headers.

#### Successful Response (Status Code: 200 OK)

```json
{
  "id": 1,
  "email": "user@example.com",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

#### Example API Call with Axios

```javascript
const axios = require('axios');
const token = 'your-auth-token'; // Include your JWT token here

axios.get('http://localhost:3000/user/profile', {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
  .then((response) => {
    console.log('Profile retrieval successful:', response.data);
  })
  .catch((error) => {
    console.error('Profile Retrieval Error:', error.response.data);
  });
```

#### Example API Call with Curl

```bash
curl -X GET http://localhost:3000/user/profile \
  -H "Authorization: Bearer your-auth-token"
```

#### Error Responses

- Status Code: 401 Unauthorized
  - If the provided JWT token is invalid or expired:
    ```json
    { "message": "Authentication failed" }
    ```

- Status Code: 404 Not Found
  - If the user profile is not found (should be handled by the `authMiddleware`):
    ```json
    { "message": "User not found" }
    ```

- Status Code: 500 Internal Server Error
  - If there is an internal server error during profile retrieval:
    ```json
    { "message": "Internal Server Error" }
    ```
