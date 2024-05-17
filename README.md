# Daily 5-Letter Word API

This repository contains the source code for an API that generates a new 5-letter word each day. The API is built using Cloudflare Workers, HONO, and Bun. Cloudflare KV is used to store data that is shared among all workers.

## Endpoint
🚀 https://wordle-api.deveshwaar99.workers.dev/

## Response

**200 OK**: Returns a JSON object with the word.

```json
{
 "word": "apple"
}
```


## Features

Generates a unique 5-letter word each day.
Stores the daily word in Cloudflare KV for consistent access.
Built with a lightweight and fast stack using HONO and Bun.

## Technologies Used

Cloudflare Workers: Serverless execution environment for running JavaScript.
HONO: Fast and simple web framework for Cloudflare Workers.
Bun: JavaScript runtime that serves as an alternative to Node.js.
Cloudflare KV: Key-value storage system provided by Cloudflare for globally distributed data storage.
