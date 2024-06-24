// "axios" is a library like "fetch" for http requests
import axios from 'axios'

// See https://deckofcardsapi.com/ for details of what the api returns for each of these calls
// Axios wraps that in some more json, like the http response code, data from the api, etc

export const shuffleDeck = async (baseURL: string) => {
  const response = await axios.get(`${baseURL  }deck/new/shuffle/?deck_count=1`)
  return response['data']['deck_id']
}

export const drawCards = async (baseURL: string, deckID: string, number: number) => {
  const response = await axios.get(
    `${baseURL  }deck/${  deckID  }/draw/?count=${  number}`
  )
  return response['data']['cards']
}

export const drawCard = async (baseURL: string, deckID: string) => {
  const response = await drawCards(baseURL, deckID, 1)
  return response[0]
}

export const remainingCards = async (baseURL: string, deckID: string) => {
  const response = await axios.get(
    `${baseURL  }deck/${  deckID  }/shuffle/?remaining=true`
  )
  return response['data']['remaining']
}
