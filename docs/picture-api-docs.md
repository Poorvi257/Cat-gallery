

### Upload a Picture

This endpoint allows users to upload a new picture with a title and optional access level.

- **URL:** `/picture/upload`
- **HTTP Method:** POST
- **Authentication:** Required
- **File Upload:** Use `multipart/form-data` with a `file` field for the image upload.

#### Request Body Parameters

- `title` (required): The title of the picture.
- `access` (optional): Access level for the picture, defaults to 'private'.

#### Successful Response (Status Code: 201 Created)

```json
{
  "id": 1,
  "title": "Beautiful Landscape",
  "imageUrl": "http://example.com/uploads/landscape.jpg",
  "access": "private",
  "userId": 123
}
```

#### Example API Call with Axios

```javascript
const axios = require('axios');
const FormData = require('form-data');

const formData = new FormData();
formData.append('title', 'Beautiful Landscape');
formData.append('file', fs.createReadStream('landscape.jpg'));

axios.post('http://localhost:3000/picture/upload', formData, {
  headers: {
    ...formData.getHeaders(),
    'Authorization': 'Bearer your-auth-token',
  },
})
  .then((response) => {
    console.log('Picture uploaded successfully:', response.data);
  })
  .catch((error) => {
    console.error('Error uploading picture:', error.response.data);
  });
```

#### Example API Call with Curl

```bash
curl -X POST http://localhost:3000/picture/upload \
  -H "Authorization: Bearer your-auth-token" \
  -F "title=Beautiful Landscape" \
  -F "file=@landscape.jpg"
```

#### Error Responses

- Status Code: 400 Bad Request
  - If no file is uploaded:
    ```json
    { "message": "No file uploaded" }
    ```

  - If the `title` is missing:
    ```json
    { "message": "Title is required" }
    ```

- Status Code: 500 Internal Server Error
  - If there is an error while saving the picture:
    ```json
    { "message": "Error saving picture", "error": "Details of the error" }
    ```

### Fetch a Picture by ID

This endpoint allows users to retrieve a picture by its ID.

- **URL:** `/picture/:id`
- **HTTP Method:** GET
- **Authentication:** Required

#### URL Parameters

- `id` (required): The ID of the picture to fetch.

#### Successful Response (Status Code: 200 OK)

```json
{
  "id": 1,
  "title": "Beautiful Landscape",
  "imageUrl": "/file/stored_on_server.jpg",
  "access": "private",
  "userId": 123
}
```

#### Example API Call with Axios

```javascript
const axios = require('axios');

axios.get('http://localhost:3000/picture/1', {
  headers: {
    'Authorization': 'Bearer your-auth-token',
  },
})
  .then((response) => {
    console.log('Picture fetched successfully:', response.data);
  })
  .catch((error) => {
    console.error('Error fetching picture:', error.response.data);
  });
```

#### Example API Call with Curl

```bash
curl http://localhost:3000/picture/1 \
  -H "Authorization: Bearer your-auth-token"
```

#### Error Responses

- Status Code: 400 Bad Request
  - If the `id` parameter is missing or not a valid number:
    ```json
    { "message": "Invalid picture ID" }
    ```

- Status Code: 404 Not Found
  - If the picture with the provided ID is not found:
    ```json
    { "message": "Picture not found" }
    ```

- Status Code: 500 Internal Server Error
  - If there is an error while retrieving the picture:
    ```json
    { "message": "Error retrieving picture", "error": "Details of the error" }
    ```

### List All Pictures for a User

This endpoint allows users to retrieve a list of all pictures uploaded by the authenticated user.

- **URL:** `/picture`
- **HTTP Method:** GET
- **Authentication:** Required

#### Successful Response (Status Code: 200 OK)

```json
[
  {
    "id": 1,
    "title": "Beautiful Landscape",
    "imageUrl": "/file/stored_on_server.jpg",
    "access": "private",
    "userId": 123
  },
  {
    "id": 2,
    "title": "Nature",
    "imageUrl": "/file/stored_on_server_2.jpg",
    "access": "public",
    "userId": 123
  }
]
```

#### Example API Call with Axios

```javascript
const axios = require('axios');

axios.get('http://localhost:3000/picture', {
  headers: {
    'Authorization': 'Bearer your-auth-token',
  },
})
  .then((response) => {
    console.log('Pictures fetched successfully:', response.data);
  })
  .catch((error) => {
    console.error('Error fetching pictures:', error.response.data);
  });
```

#### Example API Call with Curl

```bash
curl http://localhost:3000/picture \
  -H "Authorization: Bearer your-auth-token"
```

#### Error Responses

- Status Code: 500 Internal Server Error
  - If there is an error while listing pictures:
    ```json
    { "message": "Error listing pictures", "error": "Details of the error" }
    ```

### Update a Picture

This endpoint allows users to update the details of a picture by its ID.

- **URL:** `/picture/:id`
- **HTTP Method:** PUT
- **Authentication:** Required

#### URL Parameters

- `id` (required): The ID of the picture to update.

#### Request Body Parameters

- `title` (optional): The updated title of the picture.
- `access` (optional): The updated access level for the picture.

#### Successful Response (Status Code: 200 OK)

```json
{
  "id": 1,
  "title": "Updated Title",
  "imageUrl": "/file/stored_on_server_2.jpg",
  "access": "public",
  "userId": 123
}
```

#### Example API Call with Axios

```javascript
const axios = require('axios');

axios.put('http://localhost:3000/picture/1', {
  title: 'Updated Title',
  access: 'public',
}, {
  headers: {
    'Authorization': 'Bearer your-auth-token',
  },
})
  .then((response) => {
    console.log('Picture updated successfully:', response.data);
  })
  .catch((error) => {
    console.error('Error updating picture:', error.response.data);
  });
```

#### Example API Call with Curl

```bash
curl -X PUT http://localhost:3000/picture/1 \
  -H "Authorization: Bearer your-auth-token" \
  -d "title=Updated Title" \
  -d "access=public"
```

#### Error Responses

- Status Code: 400 Bad Request
  - If the `id` parameter is missing or not a valid number:
    ```json
    { "message": "Invalid picture ID" }
    ```

- Status Code: 404 Not Found
  - If the picture with the provided ID is not found:
    ```json
    { "message": "Picture not found" }
    ```

- Status Code: 500 Internal Server Error
  - If there is an error while updating the picture:
    ```json
    { "message": "Error updating picture", "error": "Details of the error" }
    ```

### Delete a Picture

This endpoint allows users to delete a picture by its ID.

- **URL:** `/picture/:id`
- **HTTP Method:** DELETE
- **Authentication:** Required

#### URL Parameters

- `id` (required): The ID of the picture to delete.

#### Successful Response (Status Code: 200 OK)

```json
{
  "message": "Picture deleted successfully"
}
```

#### Example API Call with Axios

```javascript
const axios = require('axios');

axios.delete('http://localhost:3000/picture/1', {
  headers: {
    'Authorization': 'Bearer your-auth-token',
  },
})
  .then(() => {
    console.log('Picture deleted successfully');
  })
  .catch((error) => {
    console.error('Error deleting picture:', error.response.data);
  });
```

#### Example API Call with Curl

```bash
curl -X DELETE http://localhost:3000/picture/1 \
  -H "Authorization: Bearer your-auth-token"
```

#### Error Responses

- Status Code: 400 Bad Request
  - If the `id` parameter is missing or not a valid number:
    ```json
    { "message": "Invalid picture ID" }
    ```

- Status Code: 404 Not Found
  - If the picture with the provided ID is not found:
    ```json
    { "message": "Picture not found" }
    ```

- Status Code: 500 Internal Server Error
  - If there is an error while deleting the picture:
    ```json
    { "message": "Error deleting picture", "error": "Details of the error" }
    ```
