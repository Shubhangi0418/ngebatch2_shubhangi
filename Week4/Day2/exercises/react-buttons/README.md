# React Buttons

## Objectives

- Working with `useState` to get and set state
- Learn how to map state to props
- Learn how to update state via functions passed as props to child components

## The Task

Read all the steps out before starting :-)

- Declare a new state variable to hold the colour i.e. "red"
- Update the button component to take a colour prop
- Use the colour prop in the button, instead of fixed values, for the background colour and text
- Pass the state to the colour button from the parent component
- Create a click handler function (in the parent) that updates the state with a new colour (i.e switch between red and blue)
- Pass the handler function to the button component via a new prop
- In the button component, use the click handler function
- Test it - the click event should bubble back up to the parent and so change the state

## Running the solution

The solution is located in `./solutions/react-buttons`
