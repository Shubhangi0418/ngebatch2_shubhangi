// Runs some of the deck-of-cards-api.js code

// Run this with
// npm install && npx ts-node use-deck-of-cards-api

import { shuffleDeck } from './deck-of-cards-api'

const getDeckId = async () => {
  await shuffleDeck('https://deckofcardsapi.com/')
    .then(result => {
      console.log(result.data)
    })
}

getDeckId()
