## Cointracker 

A simple side project to teach myself TypeScript alongside React. I specifically wanted something with a simple to use public API that would allow me to build something complex enough to make API calls, handle errors, etc. and allow users to do some manipulation of the page, but not the full overhead necessary to create a CRUD app and run a data store behind the scenes.

Specifically I am looking to learn in this project:
  - More advanced hook usage, specifically around `useEffect` after the excellent talk at React Summit around some tricky things that can happen in `useEffect`. We don't use hooks very much in my day to day, so it's a good chance to learn :).
  - TypeScript -- I last used it around 5-6 years ago and am very rusty

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The cryptocurrency data is provided by coinranking's public API.

## Coming soon
* Tests (lol it's almost 11:30 on Sunday and football is about to start so I haven't written them. I probably will after the Lions blow another lead.)
* Allow users to select any of the coins available through the API.
* Allow users to select any of the base currencies available through the API (USD, EUR, JPY, etc.)
* Explore using the [spot endpoint coinbase](https://developers.coinbase.com/api/v2#get-spot-price). This updates much more frequently, so we can do better realtime updates. Available currencies are [here](https://help.coinbase.com/en/coinbase/getting-started/general-crypto-education/supported-cryptocurrencies)
* Better styling of page elements, add icons, hook up SASS and clean up the CSS, etc.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run lint`

Runs the linter. The linting rules are based on the [airbnb eslint config](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.