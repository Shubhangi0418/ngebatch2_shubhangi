// Runs some of the deck-of-cards-api.ts code

// Run this with
// npm install && npm install && npx ts-node use-deck-of-cards

import { shuffleDeck, drawCard, drawCards, remainingCards } from './deck-of-cards-api'

const realUrl = 'https://deckofcardsapi.com/api/'

const runExampleGame = async () => {
  const deckId = await shuffleDeck(realUrl)
  console.log(`deckId = ${deckId}`)

  const drawResult1 = await drawCard(realUrl, deckId)
  console.log('drawResult1 =', drawResult1)

  const remainingCardsResult1 = await remainingCards(realUrl, deckId)
  console.log('remainingCardsResult1 =', remainingCardsResult1)

  const drawResult2 = await drawCards(realUrl, deckId, 3)
  console.log('drawResult2 =', drawResult2)

  const remainingCardsResult2 = await remainingCards(realUrl, deckId)
  console.log('remainingCardsResult2 =', remainingCardsResult2)
}

runExampleGame()
