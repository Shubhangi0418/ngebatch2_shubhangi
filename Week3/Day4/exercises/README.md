# Testing with Mocks Exercises

## Objectives

- Practice writing unit tests using mocks

## The Task

Add more unit tests to the file `deck-of-cards-api.test.ts`.

The API documentation for the deck of cards API can be found at https://deckofcardsapi.com/

## Instructions

- Run `npm install` in this folder
- You can run the example game file with `npx ts-node use-deck-of-cards`

Then

- Using the existing unit test for `shuffleDeck` as a guide, write more unit tests for the `drawCards` and `remainingCards` functions
- Run your unit tests with `npm run test deck-of-cards-api.test`

### Detailed Instructions

Stuck? Use these step-by-step instructions:

Testing `drawCards`:

- Arrange your tests first
    - _You will need to check the API documentation for an example response!!_
    - _And/or try the API for yourself!_
- Decide what number of cards you want to draw for your test and adjust the API response accordingly
- Set up the mock response from axios using `mockResolvedValue`
- Now call the `drawCards` function with your arranged arguments
- Then assert that the response is what you expected
- Run your unit tests with `npm run test deck-of-cards-api.test`

## Stretch Tasks

Here are some optional extra exercises you could try;

- Write more unit tests for deck-of-cards-api
- Look at the red-black game file and test file - recreate it using TDD

## Running the solution

- `cd` into `../solutions/`
- run `npm install`
- Run your unit tests with `npm run test deck-of-cards-api.test`
