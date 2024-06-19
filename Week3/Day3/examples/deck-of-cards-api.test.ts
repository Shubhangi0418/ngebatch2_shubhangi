import axios from 'axios'

jest.mock('axios')

import {
  shuffleDeck,
  drawCards,
  remainingCards,
} from './deck-of-cards-api'

// We need to tell our unit tests that 'axios.get' has been mocked
// This tells typescript that we have extra mocking functions available on the mock
const mockedGet = axios.get as jest.Mock

describe('when using the deck of cards API', () => {
  describe('when using shuffleDeck', () => {
    test('it will return a new deck ID', async () => {
      // Arrange
      const myServer = 'www.myserver.com/'
      // See https://deckofcardsapi.com/#shuffle "Shuffle the Cards" section
      const dummyApiResponse = {
        success: true,
        deck_id: '3p40paa87x90',
        shuffled: true,
        remaining: 52,
      }
      const dummyAxiosResponse = {
        data: dummyApiResponse,
      }
      mockedGet.mockResolvedValue(dummyAxiosResponse)

      // Act + Assert
      expect(await shuffleDeck(myServer)).toEqual('3p40paa87x90')

      // This could be in a separate test
      expect(mockedGet.mock.calls[0][0]).toEqual(
        `${myServer}deck/new/shuffle/?deck_count=1`
      )
    })
  })

  describe('when using drawCards', () => {
    test('todo', async () => {
      // todo write a test for "drawCards"
      // See https://deckofcardsapi.com/#draw-card "Draw a Card" section
    })
  })

  describe('when using remainingCards', () => {
    test('todo', async () => {
      // todo write a test for "remainingCards"
      // See https://deckofcardsapi.com/#reshuffle "Reshuffle the Cards" section
    })
  })
})
