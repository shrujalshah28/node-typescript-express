# Express TypeScript Boilerplate

[![Build Status](https://github.com/peerbits-shrujal/node-typescript-express/workflows/Node%20CI/badge.svg)](https://github.com/peerbits-shrujal/node-typescript-express/actions?workflow=Node%20CI)

This repo can be used as a starting point for backend development with Nodejs. It comes bundled with Docker and is CI/CD optimized.

A few things to note in the project:

- **[Dockerfile](./Dockerfile)** - Dockerfile to generate docker builds.
- **[Middleware for easier async/await](./src/middleware/handle-error.ts)** - Catches errors from routes and throws them to express error handler to prevent app crash due to uncaught errors.
- **[.env file for configuration](#environment)** - Change server config like app port, whitelist origins etc
- **[Winston Logger](#logging)** - Uses winston as the logger for the application.
- **[ESLINT + Prettier](./.eslintrc.js)** - ESLINT is configured with Prettier for easy linting.
- **[Jest](./jest.config.js)** - Using Jest for running test cases
- **[Github CI](./.github/workflows/nodejs.yml)** - Pre-configured to a sample Github CI pipepline for linting, building and running the test suite.

## Installation

### 1. Install dependencies

```sh
npm i
```

## Development

### Start dev server

```sh
npm run dev
```

Running the above commands results in

- 🌏**API Server** running at `http://localhost:3000`

## Packaging and Deployment

### 1. Run with docker

```sh
docker build -t api-server .
docker run -t -i -p 3000:3000 api-server
```

### 2. Build and run

```sh
npm run build && npm run start
```

---

## Environment

To edit environment variables, create a file with name `.env` and copy the contents from `.env.example` to start with.

| Var Name          | Type     | Default                     | Description                            |
| ----------------- | -------- | --------------------------- | -------------------------------------- |
| NODE_ENV          | string   | `development`               | API runtime environment. eg: `staging` |
| PORT              | number   | `3000`                      | Port to run the API server on          |
| SECRET_HEX        | string   | `827d263847500d926a520b...` | HEX string to secure JWT               |
| WHITELIST_ORIGINS | string[] | `["http://localhost"]`      | White list origins                     |

## Logging

The application uses [winston](https://github.com/winstonjs/winston) as the default logger. The configuration file is at `src/services/logger.ts`.

- All logs are saved in `./logs` directory and at `/logs` in the docker container.
- Console messages are prettified
- Each line in error log file is a stringified JSON.

### Directory Structure

```sh

├── .github
│   └── workflows
│       └── nodejs.yml
├── .vscode
│   ├── extensions.json
│   └── settings.json
├── logs
│   └── error.log
├── src
│   ├── __tests__
│   │   ├── app.test.ts
│   │   └── utils.test.ts
│   ├── errors
│   │   ├── __tests__
│   │   │   └── errors.test.ts
│   │   └── index.ts
│   ├── interfaces
│   │   └── request.ts
│   ├── middleware
│   │   ├── __tests__
│   │   │   └── handle-error.test.ts
│   │   ├── handle-error.ts
│   │   └── validator.ts
│   ├── public
│   │   └── index.html
│   ├── services
│   │   ├── __tests__
│   │   │   └── config.test.ts
│   │   ├── config.ts
│   │   └── logger.ts
│   ├── v1
│   │   └── index.ts
│   ├── app.ts
│   ├── routes.ts
│   ├── server.ts
│   └── utils.ts
├── .env
├── .env.example
├── .eslintrc.js
├── .gitignore
├── .huskyrc.json
├── .lintstagedrc.json
├── .prettierrc.js
├── Dockerfile
├── LICENSE
├── README.md
├── jest.config.js
├── nodemon.json
├── package-lock.json
├── package.json
└── tsconfig.json
```
