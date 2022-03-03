## Available Scripts

In the project directory, you can run:

### `npm dev` or `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)


TODOs:
- preload page transition images (if cache is disabled, the page transition doesn't work the first time). Use fade in/fade out transition until all images load
- debug dev not working on other browsers (can still build/deploy?)
- integrate fullstory
- fix page transition on mobile (current page scrolls up on navigation to the next page)
- fix animation restart on page transition end (link hover effect / contact page art)
- update/fix page transition on mobile?

