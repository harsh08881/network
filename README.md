# Theta Network API

Welcome to the **Theta Network API**, a robust and scalable backend application built with Express.js. This API provides functionalities for user management, wallet operations, referral systems, and token generation.

---

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API Endpoints](#api-endpoints)
5. [Middleware](#middleware)
6. [Error Handling](#error-handling)
7. [License](#license)

---

## Features

- User authentication and profile management.
- Wallet balance retrieval.
- Comprehensive referral system.
- Referral token generation and retrieval.
- Middleware for input validation and authentication.

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <project_directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and configure your environment variables.

4. Start the server:
   ```bash
   npm start
   ```

---

## Usage

The API is designed to handle HTTP requests. You can test it using tools like **Postman**, **cURL**, or integrate it with a frontend application.

---

## API Endpoints

### General

| Method | Endpoint       | Description                     |
|--------|----------------|---------------------------------|
| GET    | `/`            | Welcome message                |
| GET    | `*`            | Handle unknown GET routes      |
| POST   | `*`            | Handle unknown POST routes     |

### User Management

| Method | Endpoint       | Description                        |
|--------|----------------|------------------------------------|
| POST   | `/generate`    | Generate a username               |
| POST   | `/register`    | Register a new user               |
| POST   | `/login`       | Login an existing user            |
| GET    | `/profile`     | Get user profile details          |

### Wallet

| Method | Endpoint       | Description                        |
|--------|----------------|------------------------------------|
| GET    | `/getbalance`  | Retrieve wallet balance           |

### Referrals

| Method | Endpoint         | Description                        |
|--------|------------------|------------------------------------|
| GET    | `/referrallist`  | Retrieve list of referrals         |
| GET    | `/referralToken` | Retrieve existing referral token   |
| GET    | `/generateToken` | Generate a new referral token      |

---

## Middleware

### `authMiddleware.js`
- Verifies the user's authentication token before granting access to protected routes.

### `validateFields.js`
- Validates incoming request payloads to ensure all required fields are present.

---

## Error Handling

The API handles undefined routes gracefully, responding with a default message:

- **GET Routes**: `Route Not Found`
- **POST Routes**: `Route Not Found`

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contributing

We welcome contributions! Please follow the standard pull request process and ensure all new features include appropriate tests.

