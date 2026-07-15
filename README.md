# WebdriverIO Automation Framework

This project is a WebdriverIO-based automation framework written in TypeScript for testing the DemoQA Book Store application. It covers both UI and API scenarios and follows a modular structure with Page Object Model (POM), service layers, builders, assertions, and schema validation.

## Overview

The framework is designed to provide:

- UI automation for login, registration, book browsing, and book management flows
- API automation for Book Store endpoints
- Reusable page objects and component abstractions
- Environment-based configuration
- Test reporting with Allure
- Screenshot capture on failures
- Logging and validation utilities

## Tech Stack

- WebdriverIO v9
- Mocha test framework
- TypeScript
- Axios for API requests
- Ajv for response schema validation
- Allure Reporter
- ESLint and Prettier
- Winston for logging

## Project Structure

```text
webdriverio-project/
├── config/                          # WebdriverIO and environment configuration
│   └── env/                         # Environment files: dev, test, prod
├── src/                             # Main source code
│   ├── api/                         # API client and request handling
│   ├── assertions/                  # Reusable assertion helpers
│   ├── constants/                   # Shared constants, messages, and timeouts
│   ├── data/                        # Test data and fixtures
│   │   ├── builders/                # Data builders for test inputs
│   │   └── fixtures/                # JSON fixture files
│   ├── models/                      # TypeScript models/interfaces
│   ├── pages/                       # Page Object Model classes
│   │   └── components/              # Reusable page components
│   ├── schemas/                     # AJV schemas for API validation
│   ├── services/                    # API service layer
│   ├── utils/                       # Helper utilities (logger, browser, etc.)
│   └── validators/                  # Validation wrappers and helpers
├── tests/                           # Test specifications
│   └── specs/                       # UI and API test suites
│       ├── api/                     # API test cases
│       └── ui/                      # UI test cases
├── reports/                         # Test reports and Allure outputs
├── screenshots/                     # Failure screenshots
└── logs/                            # Runtime and error logs
```

## Main Functional Areas

### UI Tests

UI scenarios are organized under:

- Login flows
- Registration flows
- Book store browsing
- Adding books to collection
- Deleting books from collection

### API Tests

API coverage includes:

- Getting a list of books
- Getting book details
- Adding books to a user collection
- Replacing books
- Deleting books
- Deleting all books
- Error handling for invalid input

## Configuration

The framework uses environment-based configuration from the folder:

- [config/env/dev.ts](config/env/dev.ts)
- [config/env/test.ts](config/env/test.ts)
- [config/env/prod.ts](config/env/prod.ts)

The main WebdriverIO setup is defined in:

- [wdio.conf.ts](wdio.conf.ts)
- [config/wdio.base.conf.ts](config/wdio.base.conf.ts)

### Environment Variables

The following environment variables are supported:

- `ENV`: selects the environment (`dev`, `test`, `prod`)
- `HEADLESS`: runs the browser in headless mode when set to `true`
- `LOG_LEVEL`: overrides logging level

## Prerequisites

Before running the tests, make sure you have:

- Node.js installed
- npm installed
- Chrome browser available

## Installation

```bash
npm install
```

## Running Tests

### Base WebdriverIO command

```bash
npm run wdio
```

### Environment-specific runs

```bash
npm run env:dev
npm run env:prod
```

### Targeted suites

```bash
npm run test:login
npm run test:api
npm run test:addBook
npm run test:delBook
npm run test:register
```

### Tag-based execution

```bash
npm run tag:smoke
npm run tag:flaky
npm run regression
```

## Reporting

Allure reports are generated in the `reports/allure-results` folder.

Screenshots captured during failures are stored in the `screenshots` folder.

## Code Quality

Useful commands:

```bash
npm run lint
npm run lint:fix
npm run format:check
npm run format:fix
```

## Architecture Notes

### Page Object Model

UI interactions are abstracted through page objects in the `src/pages` directory. Each page exposes methods that represent user actions and verifications.

### Service Layer

API logic is separated into service classes under `src/services`, which wrap HTTP requests and keep test specs cleaner.

### Builders and Fixtures

Test data is built using builder classes and fixture JSON files, making the framework easy to maintain and extend.

### Validation Layer

API responses are verified with Ajv-based schemas under `src/schemas`, helping ensure strict response structure and data correctness.

## Notes for Maintenance

- Keep page object methods focused on UI actions and state access
- Place reusable API logic in services instead of in test specs
- Prefer builders and fixtures over hardcoded test data
- Use assertions and validators to keep tests expressive and robust

## Summary

This repository is a practical example of a modern WebdriverIO test automation framework with separated concerns for UI, API, data, validation, and reporting. It is suitable for learning, extending, and scaling automated browser and API testing.
