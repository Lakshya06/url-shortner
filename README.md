# URL Shortener API

## Setup
1. Clone repository
2. Install dependencies: `npm install`
3. Start MongoDB: `mongod`
4. Create `.env` file with environment variables
5. Start server: `npm start`

## API Endpoints
- **POST /api/shorten**
  - Request: `{ "url": "https://example.com" }`
  - Response: `{ "shortUrl": "http://localhost:3000/api/abc123" }`

- **GET /api/:code**
  - Redirects to original URL

## Testing with cURL
# Shorten URL
curl -X POST http://localhost:3000/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'

# Redirect
curl -L http://localhost:3000/api/abc123

## Testing with Postman
Open Postman and import the provided collection file:
  - url-shortener.postman_collection.json

Run the following requests from the collection:
    - POST /api/shorten — to shorten a long URL
    - GET /api/:code — to test redirection
