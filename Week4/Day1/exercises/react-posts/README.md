# React "Social Media Posts" App

## Objectives

- Get familiar with the structure of a React app
- Use TSX
- Create and use components
- Pass props to a component

## Running the code

- Check you are in the correct directory: `./exercises/react-posts`
- Install the necessary dependencies by running `npm install`
- Run the app by running `npm run dev`

## The Task

Use the starter app `react-posts` - you will be working with the code located in `src/App.tsx`

Read all the steps out before starting :-)

- Extract the code responsible for displaying the comments into a new component called e.g. `Comment`
    - At first, have it return fixed html
    - Import your component into the App component
    - Use your new component in the App
    - Then make your new component use data from the `props` instead
    - Then send it data via props from the App
    - Have it `console.log()` the props it receives so you can check what you are passing it
    - Make sure you use it twice in the App to get the same display as the original page
        - Send it different data each time, once for each Comment
- Extract the code responsible for displaying user info data (i.e. the user name and image) into a separate component called e.g. `UserInfo`
    - Repeat the steps above for this component too
- Your web page should now look the same as before, but with reusable components instead!

### Hints and Tips

- Create a `components` directory in `src` for your new components to live in
- Import them into the APP from there
- You should not need to touch any files other than `src/App.tsx` and your new component files

## The solution

A possible solution is located in `./solutions/react-posts`
