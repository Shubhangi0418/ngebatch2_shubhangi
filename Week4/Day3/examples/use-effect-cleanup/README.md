# Use effect Cleanup

## Run the example

- run `npm install` inside the `use-effect-change` directory.
- run `npm run dev` to start the example
- view the running application in the browser
- open the console in the browser

## Observing the output

To start with you will notice each time you click the button the console logs will increase in frequency.

Each time you click the button and update the state of the component a new instance of setInterval will be created.

## Fixing the code

- in `App.tsx` uncomment line `16`.
- refresh the browser.
- open the console in the browser.

Now when you click the button to update the state the below will happen:

- The component will unmount causing the returned function from the useEffect to be called:

```typescript
return () => {
    clearInterval(timer)
}
```

- The component will then be re-mounted causing the useEffect to run instantiating a new setInterval instance:

```typescript
const timer = setInterval(() => {
    console.log('time is up')
}, 1000)
```
