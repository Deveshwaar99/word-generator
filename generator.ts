import { words } from './words'

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

  getTodaysWord() {
    if (!this.wordHash) {
      const wordHash = this.generateWordHash()
      return this.todaysWord
    }

    const [date] = this.wordHash.split('_')

    if (date === new Date().toLocaleDateString('en-GB')) {
      return this.todaysWord
    }

    this.generateWordHash()
    return this.todaysWord
  }
  private generateWordHash() {
    const date = new Date().toLocaleDateString('en-GB')
    const word = this.getRandomWordFromFile()
    if (!word) {
      throw new Error('Failed to read random word from file')
    }

    const wordHash = `${date}_${word}`
    this.wordHash = wordHash
    this.todaysWord = word
    return wordHash
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

export const wordIntance = WordGenerator.getInstance()
