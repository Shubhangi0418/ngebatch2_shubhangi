# React Country Population App (Part 1)

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

### Part 1

Use the starter app template in this directory

- Think about how many components you will design for this exercise and where state will live
- On app mount, fetch a list of countries from `https://world-population-api.infinityworks.academy/countries` and render them in a select box
- You will need a Promise (Explicit or Implicit) that returns the data from the `fetch()`
- You will need a `useState()` to hold your country list
- You will also need `useEffect()` to set your country list. Make sure it runs only once!
- In App.js log the selected country to the console to verify user select works and the event is bubbling up to the parent.

## Running the solution

- CD into `./solutions/react-countries-part-1` and look at the README
