# Angular Auth

This app is a simple example of how to use the Angular framework to create a simple authentication system. It uses the Angular Router to navigate between the login and home pages, and the Angular HttpClient to make requests to an API builded with NestJS that uses JWT.

## Prepare environment

Use of [Node Version Manager](https://github.com/nvm-sh/nvm) is recommended and run `nvm use` in the root of the project to set the Node/NPM version. Some cases may require to run `nvm install` to install the required version.

Now, run `npm install` to install the required dependencies.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Git hooks

This project uses [Husky](https://typicode.github.io/husky) to run some checks before committing changes. The checks are:

- Linting and formatting code on commit.

## Deployment

App deployed on: <https://angular-auth-jpin730.vercel.app>

API deployment: <https://nest-auth-9jfg.onrender.com>

API repository: <https://github.com/jpin730/nest-auth>
