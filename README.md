# URL Shortener API

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [How to Run](#how-to-run)
- [Setting Up Environment Variables](#setting-up-environment-variables)
- [Endpoints](#endpoints)
  - [User](#user)
  - [URL](#url)
  - [Admin](#admin)
- [Authentication and Authorization](#authentication-and-authorization)
- [How to Use](#how-to-use)

## Introduction

This API provides functionality for a URL shortening service. Users can register, login, generate short URLs, and access administrative features, 

## Postman Collection

You can find the Postman collection for this API [here](https://api.postman.com/collections/32815450-0fe62112-2c8e-4d3f-8b31-bfa15149803b?access_key=PMAT-01HXVJY6MC8G8EH8MGDDY0TXYS).

## Technologies Used

- Node.js
- Express.js
- MongoDB (or your preferred database)
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing
- Redis for caching

## How to Run

1. Clone this repository.
2. Install dependencies with `npm install`.
3. Set up your environment variables (e.g., database connection, JWT secret).
4. Run the server with `npm start`.

## Redis

Redis is used in this API for caching purposes. It helps improve the performance by storing frequently accessed data in memory, reducing the need to repeatedly query the database. 

### Setting Up Redis

1. Install Redis on your machine. You can follow the instructions from the [official Redis website](https://redis.io/download).
2. Ensure Redis is running on its default port (6379). 
3. In the `.env` file, add the following variable:

## Setting Up Environment Variables

Create a `.env` file in the root directory of the project and add the following variables:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your_database_name
JWT_SECRET=your_secret_key
```

## Endpoints

### User

- `POST /api/v1/register`: Register a new user.
- `POST /api/v1/login`: Log in as an existing user.
- `POST /api/v1/logout`: Log out the logged-in user.
- `GET /api/v1/profile`: Get the profile of the logged-in user.
- `PATCH /api/v1/profile/u`: Update the profile of the logged-in user.
- `DELETE /api/v1/profile/d/`: Delete the profile of the logged-in user.
- `POST /api/v1/forgetpassword`: Initiate password reset process.
- `POST /api/v1/resetpassword`: Reset the password using the token.
- `GET /api/v1/resetpassword`: Render password reset page.

### URL

- `POST /api/v1/createshorturl`: Generate a short URL for a given long URL.
- `GET /api/v1/user/url`: Get all URLs created by the logged-in user.
- `GET /api/v1/user/url/:id`: Get a specific URL created by the logged-in user.
- `DELETE /api/v1/user/url/d`: Delete a specific URL created by the logged-in user.

### Admin

- `GET /api/v1/admin`: Get the profile of the admin user.
- `GET /api/v1/admin/getalluser`: Get all users (admin access required).
- `GET /api/v1/admin/getallurldetails`: Get all URLs with metrics (admin access required).
- `DELETE /api/v1/admin/user/d/`: Delete a user (admin access required).
- `DELETE /api/v1/admin/url/d`: Delete a URL (admin access required).

## Authentication and Authorization

- Authentication is required for most endpoints using JWT tokens.
- Some endpoints require admin privileges for access.

## How to Use

1. Register a new user using `POST /api/v1/register`.
2. Log in using `POST /api/v1/login` to obtain a JWT token.
3. Use the token to access protected endpoints.
4. Generate short URLs using `POST /api/v1/createshorturl`.
5. Admins can access additional endpoints for user management.
