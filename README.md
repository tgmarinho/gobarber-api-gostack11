# GoBarber API

A backend API for a barbershop scheduling app. It was built as the capstone of Rocketseat's GoStack 11 bootcamp, with a focus on SOLID principles, DDD-style layering, and tests.

<p>
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" />
  <img alt="Express" src="https://img.shields.io/badge/Express-000000?logo=express&logoColor=white" />
  <img alt="TypeORM" src="https://img.shields.io/badge/TypeORM-FE0803?logo=typeorm&logoColor=white" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white" />
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white" />
  <img alt="Redis" src="https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white" />
  <img alt="Jest" src="https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=white" />
</p>

## What it does

- Books appointments between clients and service providers.
- Lists registered providers.
- Handles user sign up and authentication with JWT.
- Recovers passwords by sending an email with a reset link.
- Lets users update their profile.
- Accepts avatar uploads.
- Applies rate limiting to protect the API.

## Architecture

The codebase follows SOLID principles and a DDD-style layout. The goal is clear separation of concerns and easy testing.

- **Domain modules.** Code is split by business domain under `src/modules` (users, appointments, notifications). Shared infrastructure lives under `src/shared`.
- **Repositories.** Each module exposes repository interfaces. Data access details stay behind those interfaces, so the business logic does not depend on the database.
- **Services.** Each use case is a small service with a single responsibility.
- **Dependency injection.** Dependencies are wired with [tsyringe](https://github.com/microsoft/tsyringe). Services receive their collaborators through their constructors, which keeps them decoupled and testable.

## Stack

- **Node.js** as the runtime.
- **TypeScript** as the language.
- **Express** as the web framework.
- **TypeORM** as the ORM.
- **PostgreSQL** as the main database.
- **MongoDB** for notifications.
- **Redis** for caching and rate limiting.
- **Jest** for tests.
- Other libraries: `jsonwebtoken` for auth, `bcryptjs` for password hashing, `multer` for uploads, `nodemailer` for email, `celebrate` for request validation, and `date-fns` for dates.

## Run locally

This project uses **Yarn**. The lockfile is `yarn.lock`.

You will need PostgreSQL, MongoDB, and Redis running.

```bash
# install dependencies
yarn

# build the TypeScript code
yarn build

# start the dev server with hot reload
yarn dev:server

# start the server with ts-node
yarn start
```

### Database migrations

TypeORM migrations run through the `typeorm` script:

```bash
# create a migration
yarn typeorm migration:create -n CreateAppointments

# run pending migrations
yarn typeorm migration:run

# revert the last migration
yarn typeorm migration:revert

# show migration status
yarn typeorm migration:show
```

## Tests

Tests run with Jest:

```bash
yarn test
```

## Author

Thiago Marinho

## License

MIT
