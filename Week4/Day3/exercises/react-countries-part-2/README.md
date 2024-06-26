# React Country Population App (Part 2)

## Objectives (across both parts)

- Make use of `useState` to set and get state
- Make use of `useEffect` to trigger side-effects
- Build upon previous learning: mapping state to props
- Build upon previous learning: updating state via functions passed as props
- Add testing, inc. simulating user events

## The Task

Build an app to show the population data of a chosen country.

We'll be getting our data from the "World Population" API `https://world-population-api.infinityworks.academy`.

The API has the following endpoints:

- `/countries` - Get a list of countries
- `/countries/{countryCode}/population` - Get all population values for a country
- `/countries/{countryCode}/population/latest` - Get the latest population of a country
- `/countries/{countryCode}/population/{year}` - Get the population of a country in a specific year

### Part 2

Continue with your application from `Part 1` or use `./solutions/react-countries-part-1` as a starter app template.

- On user select, fetch the latest population data for the chosen country from `https://world-population-api.infinityworks.academy/countries/{countryCode}/population/latest` and render the data
- You will need another `useState()` and `useEffect()` and promise with a parameterised `fetch()`
- Add tests, inc. user event simulating tests for the country select component
- _Bonus_: Show loading feedback to the user
- _Bonus_: Cache API results

## Running the solution

- CD into `./solutions/react-countries-part-2` and look at the README
