import type { KVNamespace } from '@cloudflare/workers-types'
import { wordInstance } from './generator'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  WORDS: KVNamespace
}
const app = new Hono<{ Bindings: Bindings }>()

app.use(cors())

app.get('/', async c => {
  try {
    const word = await wordInstance.getTodaysWord(c)
    if (!word) {
      throw new Error('Word is invalid')
    }
    return c.json({ word })
  } catch (error) {
    console.error('[--GET WORD ERROR--]', error)
    return c.json({ error: 'Internal Server Error' }, 500)
  }
})

export default {
  port: 3000,
  fetch: app.fetch,
}
