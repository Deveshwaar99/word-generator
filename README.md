# Daily 5-Letter Word API

This repository contains the source code for an API that generates a new 5-letter word each day. The API is built using Cloudflare Workers, HONO, and Bun. Cloudflare KV is used to store data that is shared among all workers.

Endpoint
🚀 https://your-worker-url.workers.dev/api/word

Response
200 OK: Returns a JSON object with the word.

{
  "word": "apple"
}
