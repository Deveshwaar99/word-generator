import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { wordIntance } from './generator'

const app = new Hono()

app.use(cors())

app.get('/', c => {
  try {
    const word = wordIntance.getTodaysWord()
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
