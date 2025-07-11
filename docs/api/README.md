# API Documentation

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## Response Format

All API responses follow this format:

```json
{
  "success": boolean,
  "message": string,
  "data": object | array,
  "error": string (only if success is false)
}
```

## Pagination

List endpoints support pagination:

```
GET /api/members?page=1&limit=20
```

Response includes pagination metadata:

```json
{
  "success": true,
  "data": {
    "members": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalCount": 100,
      "limit": 20
    }
  }
}
```

## Error Handling

HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 500: Internal Server Error
