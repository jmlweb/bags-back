# Bags API

🚧 This API is supposed to be used in a secure environment. It doesn't have any authorization mechanism and it exposes \_id fields.

---

The "User" model contains 3 fields:

- email (added to maintain atomicity)
- name
- bagsCount

## Requisites

- Node
- Mongo

## Config

Copy and paste `.env.example` into `.env` and adapt it for your environment.

_note:_ depending on the size of the config items, it may be a good idea to store them in a json file, instead of env vars.

## Building and executing

### Normal mode

`npm run build` && `npm run start`

### Development mode

`npm run dev`

## Todo

- Implement security with Helmet, csurf, etc.
- Better code organization.
- More testing
- Logging, etc
- Use a subdoc for orders?
