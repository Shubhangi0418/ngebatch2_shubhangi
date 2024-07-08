# React Country Population App (Router)

## Objectives

- Update the Country Population app code to use routing
- Use the `useParams` hook to get data from the `url`,
- Use the `useNavigate` hook to programmatically change the `url`

## The Task

Update your current country population app (alternatively use `react-03-side-effects/solutions/react-countries` as a clean starting point).

Update the app to use routing and support a `/` path and a code-based path i.e. `./GBR`

## Instructions

- Extract (move) all top level code in `App.tsx` to a new component called `CountryPopulation`
- Create a `CountryRoutes` component that supports the two routes and setup the routing in `App.tsx`
- Update `CountryPopulation`:
    - if the `code` is supplied in the URL, display that country's data
    - when a country is selected from the dropdown, change the path to the relevant country code

### Detailed Instructions

Stuck? Use these step-by-step instructions:

- Extract (move) all top level code in `App.tsx` to a new component called `CountryPopulation`
- Add a `BrowserRouter` at the top level of your app in `App.tsx`
- Create a `CountryRoutes` component and set up two routes: a main route `/` and a `/:code` route
    - Both routes route to the `CountryPopulation` component (it does not need any props)
- In the `CountryPopulation` component:
    - Import the `useParams()` hook to retrieve the `code` from the URL
    - Update the code so when the user navigates directly to a URL with a `code` set (e.g. `/FRA`) it loads and displays the correct country result
    - Import the `useNavigate()` hook
    - Update the code so when the user selects a country in the dropdown, it rewrites the URL path to include its `code` (e.g. `/GBR`)

## Stretch Task

Add another route to lookup a country's population for a specific `year`, i.e `/GBR/2019`

- Update the code to display the country population for the provided year
    - Fetch the result from `https://world-population-api.infinityworks.academy/countries/{countryCode}/population/{year}`
- Update the result component to display the year, if provided, otherwise display the word "latest"

## Running the solution

- `cd` into `../solutions/react-countries-router` and follow the instructions in the README file.
