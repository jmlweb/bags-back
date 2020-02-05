# Bags API

The "User" model contains 3 fields:

- email (added to maintain atomicity)
- name
- bagsCount

## Requisites

- Node
- Mongo

## Config

Copy and paste `.env.example` into `.env` and adapt it for your environment.

*note:* depending on the size of the config items, it may be a good idea to store them in a json file, instead of env vars.

## Building and executing

### Normal mode

`npm run build` && `npm run start`

### Development mode

`npm run dev`
