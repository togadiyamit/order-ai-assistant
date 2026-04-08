# Order AI Assistant

A lightweight AI-powered Q&A service for distributor order data. It connects to PostgreSQL, lets the model call database tools, and returns clean answers for order status, buyer history, pending payments, and summaries.

## Features
- Query orders by order number
- Get recent orders by buyer name
- List pending payments
- Business summary (orders, revenue, collected, pending)

## Tech
- Node.js + Express
- PostgreSQL (pg)
- Groq SDK for AI

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file (example):
   ```bash
   GROQ_API_KEY=your_groq_api_key
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=order_ai
   DB_USER=postgres
   DB_PASSWORD=postgres
   PORT=7000
   ```

3. Create the database table from scratch:
   ```bash
   psql -d order_ai -f schema.sql
   ```

4. Start the server:
   ```bash
   node index.js
   ```

## API
- `GET /` health check
- `POST /chat` streaming response
- `POST /chat/simple` non-streaming response

Request body:
```json
{
  "message": "What is the status of order ORD-1001?",
  "chatHistory": []
}
```

## Notes
- The system treats `payment_status` as `1 = unpaid` and `2 = paid`.
- Amounts are formatted in INR by the assistant.

## Project UI
Open `chat.html` to test a simple chat UI in the browser.