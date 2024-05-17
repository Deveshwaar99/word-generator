import { type KVNamespace } from '@cloudflare/workers-types'

import { words } from './words'
import type { Context } from 'hono'

class WordGenerator {
  private static instance: WordGenerator
  private wordHash = ''
  private todaysWord = ''

  private constructor() {}

  public static getInstance(): WordGenerator {
    if (!WordGenerator.instance) {
      WordGenerator.instance = new WordGenerator()
    }
    return WordGenerator.instance
  }

  async getTodaysWord(c: Context) {
    this.wordHash = await c.env.WORDS.get('HASH')

    const [date, word] = this.wordHash.split('_')

    this.todaysWord = word

    if (date !== new Date().toLocaleDateString('en-GB')) {
      this.generateWordHash()
      await c.env.WORDS.put('HASH', this.wordHash)
    }
    return this.todaysWord
  }
  private generateWordHash() {
    const date = new Date().toLocaleDateString('en-GB')
    const word = this.getRandomWordFromFile()
    if (!word) {
      throw new Error('Failed to read random word from file')
    }

    this.wordHash = `${date}_${word}`
    this.todaysWord = word
  }

  private getRandomWordFromFile() {
    try {
      if (words.length === 0) {
        throw new Error('Word file is empty')
      }

      const randomIndex = Math.floor(Math.random() * words.length)
      const randomWord = words[randomIndex].trim()
      return randomWord
    } catch (err) {
      console.error('Error reading words')
      return null
    }
  }
}

export const wordInstance = WordGenerator.getInstance()
