## Installation

To install, copy the source code with the command `git clone https://github.com/dmitrij-v/test-work-frontend.git`<br>
Then go to the created folder and install the dependencies with the command `yarn`<br>

## Settings

The application uses environment variables to work. To configure them, you need to create a file in the root directory of the project with the name `.env`. It must be set to a variable with a name `REACT_APP_HOST_URL` indicating the server address.

Example:
REACT_APP_HOST_URL = 'http://localhost:3001'

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
