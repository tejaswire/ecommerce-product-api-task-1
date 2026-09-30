# Product API

REST API for managing products, containerized with Docker.

## Endpoints
- GET /health
- POST /products
- GET /products
- GET /products/:id
- PUT /products/:id
- DELETE /products/:id

## Environment Variables
- APP_ENV — application environment (e.g. development, production)
- DB_HOST — database host (placeholder for future DB integration)
- APP_PORT — port the app listens on inside the container