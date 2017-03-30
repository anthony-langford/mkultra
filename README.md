# Bucket

Bucket is a web application that allows users to search for a movie, restaurant, or book and have it automatically categorized and added to a personalized to-do list for future reference.

Bucket was built in a Node.js environment on Javascript, PostgreSQL database, Knex, and several APIs including iMDB API, Spotify API, Google API, and Wolfram API.

## Project Setup

1. Clone this repository
2. Run `npm start`
3. Visit `http://localhost:8080/`

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
6. Run the seed: `npm run knex seed:run`
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
