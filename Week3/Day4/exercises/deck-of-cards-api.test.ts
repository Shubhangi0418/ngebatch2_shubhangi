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

  describe("when using drawCards", () => {
    test("it will return the drawn cards", async () => {
      // todo write a test for "drawCards"
      const myServer = "www.myserver.com/";
      const deckID = "kxozasf3edqu";
      const numberofCards = 2;
      const dummyApiResponse = {
        success: true,
        deck_id: "kxozasf3edqu",
        cards: [
          {
            code: "3H",
            image: "https://deckofcardsapi.com/static/img/3H.png",
            images: {
              svg: "https://deckofcardsapi.com/static/img/3H.svg",
              png: "https://deckofcardsapi.com/static/img/3H.png",
            },
            value: "3",
            suit: "HEARTS",
          },
          {
            code: "9H",
            image: "https://deckofcardsapi.com/static/img/9H.png",
            images: {
              svg: "https://deckofcardsapi.com/static/img/9H.svg",
              png: "https://deckofcardsapi.com/static/img/9H.png",
            },
            value: "9",
            suit: "HEARTS",
          },
        ],
        remaining: 50,
      };
      //Arr
      // See https://deckofcardsapi.com/#draw-card "Draw a Card" section

      const dummyAxiosResponse = {
        data: dummyApiResponse,
      };
      mockedGet.mockResolvedValue(dummyAxiosResponse);

      //Act
      const result = await drawCards(myServer, deckID, numberofCards);
      //Assert
      expect(result).toEqual(dummyApiResponse.cards);
      expect(mockedGet.mock.calls[0][0]).toEqual(
        `${myServer}deck/${deckID}/draw/?count=${numberofCards}`
      );
    });
  });
 
describe("when using remainingCards", () => {
  test("it will return the number of remaining cards", async () => {
    // todo write a test for "remainingCards"
    //Arrange
    const myServer = "www.myserver.com/";
    const deckID = "kxozasf3edqu";
    // See https://deckofcardsapi.com/#reshuffle "Reshuffle the Cards" section
    const dummyAPiResponses = {
      success: true,
      deck_id: "3p40paa87x90",
      shuffled: true,
      remaining: 52,
    };
    const dummyAxiosResponse = {
      data: dummyAPiResponses,
    };
    mockedGet.mockResolvedValue(dummyAxiosResponse);

    //Act
    const result = await remainingCards(myServer, deckID);

    //Assert
    expect(result).toEqual(dummyAPiResponses.remaining);
    expect(mockedGet.mock.calls[0][0]).toEqual(
      `${myServer}deck/${deckID}/shuffle/?remaining=true`
    );
  });
});
})
