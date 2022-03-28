# Playing superpeer.com content

## Requirements

- Node.js
- NPM

## Install

```shell
npm install
```

## Run Commands

### Run tests in headed version

```shell
npm run cypress:run
```

### Run tests headless and record

```shell
npm run cypress:run:record
```

### Run tests in chrome browser

```shell
npm run cypress:run:chrome
```

## Test Files

### `app.spec.jsx` Integration Test

This works in English language. It wants English webpage from Youtube and it checks the tests with English words & terms.

### `app-tr.spec.jsx` Integration Test

This works in Turkish language. Youtube detects language from the client IP address. So, if you are an internet user in Turkey, Youtube shows the Turkish version automatically. This test check the tests with Turkish words & terms.