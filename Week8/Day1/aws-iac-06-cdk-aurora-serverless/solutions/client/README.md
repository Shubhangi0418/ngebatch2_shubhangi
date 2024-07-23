# Infini Gigs Client React App (TypeScript)

See <https://github.com/IW-Academy/infini-gigs-demo-project-ts>

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Testing

React project created with vite will not have testing included.\
You can add ts-jest by adding the following packages:

```bash
npm install -D ts-jest @testing-library/jest-dom" "@testing-library/react" "@testing-library/user-event" "@types/jest"
```

you then need to create a file called jest.config.ts with the following contents:

```typescript
export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest' 
  // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',
  },
}
```

## Learn More

You can learn more in the [Vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project).

To learn React, check out the [React documentation](https://reactjs.org/).
