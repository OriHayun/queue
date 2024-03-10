# Tabnine home assignment

step 2 in interview

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)

## Installation

To install necessary dependencies, run the following command:

```
npm install
```

## Usage

After installing dependencies, you can start the server by running the following command:

```
npm run build
npm start
```

### Setting Up Redis

Ensure you have Redis installed and running. This project assumes Redis is accessible on `localhost` on the default port (`6379`). For custom setups, adjust the Redis connection parameters in your project accordingly.

#### Running Redis with Docker

```bash
docker run --name redis -p 6379:6379 -d redis
```

## Environment Variables

The following environment variables are required to run this project:

- `NODE_ENV`: The environment that the application is running in. Valid values are `local`, `staging`, or `production`.
- `PORT`: The port that the application is listening on.

To set the environment variables, create a `.env` file in the root directory of the project and add the following lines:

```
NODE_ENV=development
PORT=3000
```
