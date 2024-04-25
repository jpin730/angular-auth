# Angular Auth

This app is a user authentication system manager developed with Angular 17 using standalone components, signals, new control flow syntax, content projection and dynamic component loader. It connects to an API builded with NestJS that uses JWT.

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

## Backend Repository

<https://github.com/jpin730/nest-auth>
